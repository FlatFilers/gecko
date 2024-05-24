import { mkdir, rmdir, writeFile } from 'fs/promises'
import { isMatch } from 'micromatch'
import { join } from 'path'
import prettier from 'prettier'
import { renderContent } from './render/renderContent'
import { GeckoDocumentedElement } from './tags/Documented'
import { GeckoFileElement } from './tags/File'
import { GeckoFileFormatterElement } from './tags/FileFormatter'
import { GeckoFileTemplateElement } from './tags/FileTemplate'
import { GeckoFolderElement } from './tags/Folder'
import { GeckoRootElement } from './tags/Root'
import { CommitContext } from './types/CommitContext'
import { formatChildren } from './util/formatChildren'

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
    documentedStack: [],
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

export async function commitDocumented(
  context: CommitContext,
  baseDir: string,
  documented: GeckoDocumentedElement
) {
  context.documentedStack.push(documented)
  if (documented.props.children) {
    await commitFolderChildren(context, baseDir, documented)
  }
  context.documentedStack.pop()
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

export async function commitFolderChildren(
  context: CommitContext,
  baseDir: string,
  folder:
    | GeckoDocumentedElement
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
        case 'documented':
          await commitDocumented(context, baseDir, child)
          break
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
        default:
          throw new Error(
            `unexpected '${child.type}' in JSX tree at this position`
          )
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
  const rawContent = collectFileContents(context, file)
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
  context: CommitContext,
  file: GeckoFileElement
) {
  return file.props.children
    ? formatChildren(file.props.children)
        .map((x) => renderContent(context, x))
        .join('\n')
    : ''
}
