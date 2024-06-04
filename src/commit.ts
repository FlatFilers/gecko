import { mkdir, rmdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { renderContent } from './render/renderContent'
import { GeckoDocumentedElement } from './tags/Documented'
import { GeckoFileElement } from './tags/File'
import { GeckoFileFormatterElement } from './tags/FileFormatter'
import { GeckoFileTemplateElement } from './tags/FileTemplate'
import { GeckoFolderElement } from './tags/Folder'
import { GeckoRootElement } from './tags/Root'
import { CommitContext } from './types/CommitContext'
import { applyFormatter } from './util/applyFormatter'
import { applyTemplates } from './util/applyTemplates'
import { closestMatchingFormatter } from './util/closestMatchingFormatter'
import { contentIsEquivalent } from './util/contentIsEquivalent'
import { formatChildren } from './util/formatChildren'
import { loadFileMaybe } from './util/loadFileMaybe'
import { matchingTemplates } from './util/matchingTemplates'

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
  const replacements = {
    '{{filename}}': file.props.name,
    '{{timestamp}}':
      new Date().toISOString().slice(0, -5) + 'Z',
  }
  const [content, unreplacedContent] = applyTemplates(
    templates,
    rawContent,
    replacements
  )
  const existingFileContent = await loadFileMaybe(filePath)
  if (formatter) {
    try {
      const formattedContent = await applyFormatter(
        formatter,
        content,
        filePath
      )
      const formattedUnreplacedContent =
        await applyFormatter(
          formatter,
          unreplacedContent,
          filePath
        )
      if (
        existingFileContent &&
        existingFileContent?.length > 0 &&
        contentIsEquivalent(
          formattedUnreplacedContent,
          existingFileContent,
          formattedContent,
          replacements
        )
      ) {
        console.log(
          `[gecko] skipped ${filePath} (${formattedContent.length}) because file content did not change`
        )
        return
      }
      await writeFile(filePath, formattedContent, {
        encoding: 'utf8',
      })
      console.log(
        `[gecko] wrote ${filePath} (${formattedContent.length}) and formatted with ${formatter.props.formatter}`
      )
      return
    } catch (e) {
      console.error(
        `[gecko] unable to write ${filePath} due to error when applying '${formatter.props.formatter}' formatter:`
      )
      const message = e.stack.split('\n')
      const traceStartsAt = message.findIndex((x: string) =>
        x.trimStart().startsWith('at ')
      )
      if (traceStartsAt > -1) {
        message.length = traceStartsAt
      }
      console.error(message.join('\n'))
      return
    }
  } else {
    if (
      existingFileContent &&
      existingFileContent?.length > 0 &&
      contentIsEquivalent(
        unreplacedContent,
        existingFileContent,
        content,
        replacements
      )
    ) {
      console.log(
        `[gecko] skipped ${filePath} (${content.length}) because file content did not change`
      )
      return
    }
    await writeFile(filePath, content, {
      encoding: 'utf8',
    })
    console.log(
      `[gecko] wrote ${filePath} (${content.length})`
    )
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
