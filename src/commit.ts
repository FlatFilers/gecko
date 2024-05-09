import { mkdir, rmdir, writeFile } from 'fs/promises'
import { isMatch } from 'micromatch'
import { join } from 'path'
import prettier from 'prettier'
import { GeckoClassElement } from './tags/Class'
import { GeckoFileElement } from './tags/File'
import { GeckoFileFormatterElement } from './tags/FileFormatter'
import { GeckoFolderElement } from './tags/Folder'
import { GeckoFunctionElement } from './tags/Function'
import { GeckoMethodElement } from './tags/Method'
import { GeckoRootElement } from './tags/Root'
import { GeckoTextElement } from './tags/Text'
import { GeckoPropertyElement } from './tags/Property'

interface CommitContext {
  fileFormatterStack: GeckoFileFormatterElement[]
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

export async function commitFolderChildren(
  context: CommitContext,
  baseDir: string,
  folder:
    | GeckoFileFormatterElement
    | GeckoFolderElement
    | GeckoRootElement
) {
  if (folder.props.children) {
    for (const child of folder.props.children) {
      switch (child.type) {
        case 'file':
          await commitFile(context, baseDir, child)
          break
        case 'file-formatter':
          await commitFileFormatter(context, baseDir, child)
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

export async function commitFile(
  context: CommitContext,
  baseDir: string,
  file: GeckoFileElement
) {
  const filePath = join(baseDir, file.props.name)
  const content = collectFileContents(file)
  const formatter = closestMatchingFormatter(
    context,
    file.props.name
  )
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
    ? file.props.children
        .map((x) => renderContent(x))
        .join('\n')
    : ''
}

export function renderContent(
  content:
    | GeckoClassElement
    | GeckoFunctionElement
    | GeckoMethodElement
    | GeckoPropertyElement
    | GeckoTextElement
    | string
) {
  if (typeof content === 'string') {
    return content
  }
  switch (content.type) {
    case 'class':
      return renderClass(content)
    case 'function':
      return renderFunction(content)
    case 'method':
      return renderMethod(content)
    case 'property':
      return renderProperty(content)
    case 'text':
      return (
        content.props.children
          ?.map(renderContent)
          ?.join?.('\n') ?? ''
      )
  }
}

export function renderClass(_class: GeckoClassElement) {
  const abstract = _class.props.abstract ? 'abstract ' : ''
  const body = _class.props.children
    ? _class.props.children
        .flat(Infinity)
        .map((x) => renderContent(x))
        .join('\n')
    : ''
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
  const body = func.props.children
    ? func.props.children
        .map((x) => '  ' + renderContent(x))
        .join('\n')
    : ''
  const fn = `${func.props.async ? 'async ' : ''}function ${
    func.props.name
  }(${args}) {\n${body}\n}`
  if (func.props.export === 'default') {
    return `export default ${fn}`
  }
  return `${func.props.export ? 'export ' : ''}${fn}`
}

export function renderMethod(method: GeckoMethodElement) {
  const args = method.props.arguments
    ? method.props.arguments.join(', ')
    : ''
  const body = method.props.children
    ? method.props.children
        .map((x) => '  ' + renderContent(x))
        .join('\n')
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
  const _async = method.props.async ? 'async ' : ''
  const _static = method.props.static ? 'static ' : ''
  return `${flag}${_static}${_async}${method.props.name}(${args})${returnType} {\n${body}\n}\n`
}

export function renderProperty(
  property: GeckoPropertyElement
) {
  const flag = property.props.private
    ? 'private '
    : property.props.protected
      ? 'protected '
      : property.props.public
        ? 'public '
        : ''
  const type = property.props.type
    ? `: ${property.props.type}`
    : ''
  const _static = property.props.static ? 'static ' : ''
  const _readonly = property.props.readonly
    ? 'readonly '
    : ''
  const value = property.props.value
    ? ' = ' + property.props.value
    : ''
  return `${flag}${_static}${_readonly}${property.props.name}${type}${value}\n`
}
