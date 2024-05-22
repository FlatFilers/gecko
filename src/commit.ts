import { mkdir, rmdir, writeFile } from 'fs/promises'
import { isMatch } from 'micromatch'
import { join } from 'path'
import prettier from 'prettier'
import { GeckoClassElement } from './tags/Class'
import { GeckoFileElement } from './tags/File'
import { GeckoFileFormatterElement } from './tags/FileFormatter'
import {
  GeckoFileTemplateElement,
  TemplateMatch,
} from './tags/FileTemplate'
import { GeckoFolderElement } from './tags/Folder'
import { GeckoFunctionElement } from './tags/Function'
import { GeckoMethodElement } from './tags/Method'
import { GeckoPropertyElement } from './tags/Property'
import { GeckoRootElement } from './tags/Root'
import { GeckoTextElement } from './tags/Text'
import { GeckoImportElement } from './tags/Import'
import { GeckoChild, GeckoChildren, GeckoElement } from '.'
import { GeckoInterfaceElement } from './tags/Interface'

interface CommitContext {
  fileFormatterStack: GeckoFileFormatterElement[]
  fileTemplateStack: GeckoFileTemplateElement[]
}

async function applyFormatter(
  formatter: GeckoFileFormatterElement,
  content: string,
  filePath: string
): Promise<string> {
  switch (formatter.props.formatter) {
    case 'prettier':
      const prettierConfig =
        await prettier.resolveConfig(filePath)
      return prettier.format(content, {
        ...prettierConfig,
        filepath: filePath,
      })
    default:
      throw new Error(
        `${JSON.stringify(formatter.props.formatter)} is not a recognized gecko formatter`
      )
  }
}

function applyTemplates(
  templates: string[],
  rawContent: string,
  replacements: Record<string, string>
): string {
  let body = rawContent
  let intermediate: string = ''
  const replacementsArray = Object.entries(replacements)
  for (const template of templates) {
    intermediate = template
    for (const [key, value] of replacementsArray) {
      do {
        intermediate = intermediate.replace(key, value)
      } while (intermediate.indexOf(key) > -1)
    }
    body = intermediate.replace('{{body}}', body)
  }
  return body
}

export async function commit(root: GeckoRootElement) {
  const baseDir = root.props.path
    ? join(process.cwd(), root.props.path)
    : process.cwd()
  if (root.props.erase) {
    try {
      await rmdir(baseDir)
    } catch (e) {}
  }
  await mkdir(baseDir, { recursive: true })
  const context: CommitContext = {
    fileFormatterStack: [],
    fileTemplateStack: [],
  }
  await commitFolderChildren(context, baseDir, root)
}

export async function commitFolder(
  context: CommitContext,
  baseDir: string,
  folder: GeckoFolderElement
) {
  const newBaseDir = join(baseDir, folder.props.name)
  await mkdir(newBaseDir, { recursive: true })
  await commitFolderChildren(context, newBaseDir, folder)
}

export async function commitFileFormatter(
  context: CommitContext,
  baseDir: string,
  formatter: GeckoFileFormatterElement
) {
  context.fileFormatterStack.push(formatter)
  if (formatter.props.children) {
    await commitFolderChildren(context, baseDir, formatter)
  }
  context.fileFormatterStack.pop()
}

export async function commitFileTemplate(
  context: CommitContext,
  baseDir: string,
  template: GeckoFileTemplateElement
) {
  context.fileTemplateStack.push(template)
  if (template.props.children) {
    await commitFolderChildren(context, baseDir, template)
  }
  context.fileTemplateStack.pop()
}

function formatChildren(x: GeckoChildren): GeckoChild[] {
  return ((Array.isArray(x) ? x : [x]) as GeckoChild[])
    .flat(Infinity)
    .filter((x) => typeof x !== 'undefined' && x !== null)
}

export async function commitFolderChildren(
  context: CommitContext,
  baseDir: string,
  folder:
    | GeckoFileFormatterElement
    | GeckoFileTemplateElement
    | GeckoFolderElement
    | GeckoRootElement
) {
  if (folder.props.children) {
    for (const child of formatChildren(
      folder.props.children
    )) {
      if (typeof child === 'string') {
        return child
      }
      switch (child.type) {
        case 'file':
          await commitFile(context, baseDir, child)
          break
        case 'file-formatter':
          await commitFileFormatter(context, baseDir, child)
          break
        case 'file-template':
          await commitFileTemplate(context, baseDir, child)
          break
        case 'folder':
          await commitFolder(context, baseDir, child)
          break
      }
    }
  }
}

function closestMatchingFormatter(
  context: CommitContext,
  fileName: string
): undefined | GeckoFileFormatterElement {
  for (
    let i = context.fileFormatterStack.length - 1;
    i >= 0;
    i--
  ) {
    const formatter = context.fileFormatterStack[i]
    if (isMatch(fileName, formatter.props.match)) {
      return formatter
    }
  }
}

function matchingTemplates(
  context: CommitContext,
  fileName: string
): string[] {
  const templateMatches: string[] = []
  for (
    let i = context.fileTemplateStack.length - 1;
    i >= 0;
    i--
  ) {
    const fileTemplateElement = context.fileTemplateStack[i]
    for (const fileTemplate of fileTemplateElement.props
      .templates) {
      if (isMatch(fileName, fileTemplate.match)) {
        templateMatches.push(fileTemplate.template)
      }
    }
  }
  return templateMatches
}

export async function commitFile(
  context: CommitContext,
  baseDir: string,
  file: GeckoFileElement
) {
  const filePath = join(baseDir, file.props.name)
  const rawContent = collectFileContents(file)
  const formatter = closestMatchingFormatter(
    context,
    file.props.name
  )
  const templates = matchingTemplates(
    context,
    file.props.name
  )
  const content = applyTemplates(templates, rawContent, {
    '{{filename}}': file.props.name,
    '{{timestamp}}': new Date().toISOString(),
  })
  if (formatter) {
    const formattedContent = await applyFormatter(
      formatter,
      content,
      filePath
    )
    await writeFile(filePath, formattedContent, {
      encoding: 'utf8',
    })
    console.log(
      `wrote ${filePath} (${formattedContent.length}) and formatted with ${formatter.props.formatter}`
    )
  } else {
    await writeFile(filePath, content, {
      encoding: 'utf8',
    })
    console.log(`wrote ${filePath} (${content.length})`)
  }
}

export function collectFileContents(
  file: GeckoFileElement
) {
  return file.props.children
    ? formatChildren(file.props.children)
        .map((x) => renderContent(x))
        .join('\n')
    : ''
}

export function renderContent(
  content: GeckoChild,
  inInterface: boolean = false
) {
  if (typeof content === 'string') {
    return content
  }
  switch (content.type) {
    case 'class':
      return renderClass(content)
    case 'function':
      return renderFunction(content)
    case 'import':
      return renderImport(content)
    case 'interface':
      return renderInterface(content)
    case 'method':
      return renderMethod(content, inInterface)
    case 'property':
      return renderProperty(content, inInterface)
    case 'text':
      if (typeof content.props.children === 'string') {
        return content.props.children
      }
      return (
        formatChildren(content.props.children)
          ?.map((x) => renderContent(x))
          ?.join?.('\n') ?? ''
      )
  }
}

export function renderClass(_class: GeckoClassElement) {
  const abstract = _class.props.abstract ? 'abstract ' : ''
  const body = formatChildren(_class.props.children)
    .map((x) => renderContent(x))
    .join('\n')
  const _extends = _class.props.extends
    ? ' extends ' + _class.props.extends
    : ''
  const _implements = _class.props.implements
    ? ' implements ' + _class.props.implements
    : ''
  const cls = `class ${_class.props.name}${_extends}${_implements} {\n${body}\n}`
  const _export =
    _class.props.export === 'default'
      ? 'export default '
      : _class.props.export
        ? 'export '
        : ''
  return `${_export}${abstract}${cls}`
}

export function renderFunction(func: GeckoFunctionElement) {
  const args = func.props.arguments
    ? func.props.arguments.join(', ')
    : ''
  const body = formatChildren(func.props.children)
    .map((x) => '  ' + renderContent(x))
    .join('\n')
  const fn = `${func.props.async ? 'async ' : ''}function ${
    func.props.name
  }(${args}) {\n${body}\n}`
  if (func.props.export === 'default') {
    return `export default ${fn}`
  }
  return `${func.props.export ? 'export ' : ''}${fn}`
}

export function renderImport(_import: GeckoImportElement) {
  const { default: _default, from, named } = _import.props

  const importParts = [
    ...(_default ? [_default] : []),
    ...(named?.length ? [`{ ${named.join(', ')} }`] : []),
  ]

  const imports = importParts.length
    ? `${importParts.join(', ')} `
    : ''

  return `import ${imports}from'${from}'`
}

export function renderMethod(
  method: GeckoMethodElement,
  inInterface: boolean = false
) {
  const args = method.props.arguments
    ? method.props.arguments.join(', ')
    : ''

  const returnType = method.props.returnType
    ? ': ' + method.props.returnType
    : ''
  const flag = method.props.private
    ? 'private '
    : method.props.protected
      ? 'protected '
      : method.props.public
        ? 'public '
        : ''
  const typeArguments = method.props.typeArguments?.length
    ? `<${method.props.typeArguments.join(', ')}>`
    : ''
  const _async = method.props.async ? 'async ' : ''
  const _static = method.props.static ? 'static ' : ''
  if (inInterface) {
    return `${flag}${_static}${_async}${method.props.name}${typeArguments}(${args})${returnType}`
  }
  const body = formatChildren(method.props.children)
    .map((x) => '  ' + renderContent(x))
    .join('\n')
  return `${flag}${_static}${_async}${method.props.name}${typeArguments}(${args})${returnType} {\n${body}\n}\n`
}

export function renderProperty(
  property: GeckoPropertyElement,
  inInterface: boolean = false
) {
  const flag = property.props.private
    ? 'private '
    : property.props.protected
      ? 'protected '
      : property.props.public
        ? 'public '
        : ''
  const type = property.props.type
    ? `${property.props.required ? '' : '?'}: ${property.props.type}`
    : ''
  const _static = property.props.static ? 'static ' : ''
  const _readonly = property.props.readonly
    ? 'readonly '
    : ''
  const value =
    !inInterface && property.props.value
      ? ' = ' + property.props.value
      : ''
  return `${flag}${_static}${_readonly}${property.props.name}${type}${value}\n`
}

export function renderInterface(
  _interface: GeckoInterfaceElement
) {
  const body = formatChildren(_interface.props.children)
    .map((x) => '  ' + renderContent(x, true))
    .join('\n')
  const interfaceDefinition = `interface ${_interface.props.name} {\n${body}\n}`

  if (_interface.props.export === 'default') {
    return `export default ${interfaceDefinition}`
  }
  return `${_interface.props.export ? 'export ' : ''}${interfaceDefinition}`
}
