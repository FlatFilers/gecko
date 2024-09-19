import { existsSync, readFileSync } from 'fs'
import { mkdir, rmdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { GeckoChildren, GeckoElement } from '.'
import { renderContent } from './render/renderContent'
import { GeckoAfterwardsElement } from './tags/Afterwards'
import { GeckoDocumentedElement } from './tags/Documented'
import { GeckoFileElement } from './tags/File'
import { GeckoFileFormatterElement } from './tags/FileFormatter'
import { GeckoFileTemplateElement } from './tags/FileTemplate'
import { GeckoFolderElement } from './tags/Folder'
import { GeckoRootElement } from './tags/Root'
import { CommitContext } from './types/CommitContext'
import {
  GeckoDestinationFile,
  GeckoSource,
} from './types/GeckoSource'
import { applyFormatter } from './util/applyFormatter'
import { applyTemplates } from './util/applyTemplates'
import { closestMatchingFormatter } from './util/closestMatchingFormatter'
import { contentIsEquivalent } from './util/contentIsEquivalent'
import { formatChildren } from './util/formatChildren'
import { loadFileMaybe } from './util/loadFileMaybe'
import { matchingTemplates } from './util/matchingTemplates'

const DEBUG = 0 // + 1 // + 1

export async function commit(
  root: GeckoRootElement,
  context: CommitContext
) {
  const thisDir = process.cwd()
  const baseDir = root.props.path
    ? join(thisDir, root.props.path)
    : thisDir
  context.rootDir = baseDir
  if (root.props.erase) {
    try {
      await rmdir(baseDir)
    } catch (e) {}
  }
  await mkdir(baseDir, { recursive: true })
  await commitFolderChildren(context!, baseDir, root)
  await commitAllAfterwards()
  if (context.restart) {
    console.log(
      `[gecko] restarting because changes were written to the following <Root requires={[...]}> files:`
    )
    for (const file of context.restartFiles.values()) {
      console.log(`[gecko] • ${file}`)
    }
    await writeFile(
      join(thisDir, 'GECKO_RESTART_SIGNAL'),
      ''
    )
  }
}

export async function commitFolder(
  context: CommitContext,
  baseDir: string,
  folder: GeckoFolderElement
) {
  const newBaseDir = join(baseDir, folder.props.name)
  await mkdir(newBaseDir, { recursive: true })
  console.log(`[gecko] commit 📁${newBaseDir}`)
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

interface AfterwardsTask {
  afterwards: GeckoAfterwardsElement
  baseDir: string
  context: CommitContext
}

let afterwardsTimeout: any
const afterwardsTasks: AfterwardsTask[] = []
let geckoSource: GeckoSource

function setGeckoSource(
  context: CommitContext,
  baseDir: string
) {
  geckoSource = {
    baseDir,
    context,
    match(re) {
      const files: GeckoDestinationFile[] = []
      for (const [
        path,
        file,
      ] of context.committedFiles.entries()) {
        if (!re || path.match(re)) {
          files.push(file)
        }
      }
      return files
    },
    read(path, encoding = 'utf-8' as 'utf-8') {
      const pathSegments = path.split('/')
      const fullPath = path.startsWith('/')
        ? path
        : join(baseDir, path)
      if (existsSync(fullPath)) {
        const content = readFileSync(fullPath, encoding)
        return {
          content,
          encoding,
          name: pathSegments[pathSegments.length - 1],
          path,
          pathSegments,
          source: true,
        }
      }
      return {
        encoding,
        name: pathSegments[pathSegments.length - 1],
        path,
        pathSegments,
        source: true,
      }
    },
  }
}

let afterwardsId = 0

async function commitAllAfterwards() {
  let afterwardsTask: AfterwardsTask | undefined
  while ((afterwardsTask = afterwardsTasks.shift())) {
    const id = ++afterwardsId
    try {
      console.log(
        `[gecko] commit <Afterwards> #${id} in ${afterwardsTask.baseDir}`
      )
      setGeckoSource(
        afterwardsTask.context,
        afterwardsTask.baseDir
      )
      const contentsToWrite = await (async function () {
        if (afterwardsTask.afterwards.props.children) {
          return afterwardsTask.afterwards.props.children?.[0](
            geckoSource,
            afterwardsTask.baseDir
          )
        }
      })()
      if (
        contentsToWrite &&
        typeof contentsToWrite !== 'string'
      ) {
        await commitFolderChildren(
          afterwardsTask.context,
          afterwardsTask.baseDir,
          contentsToWrite
        )
      }
      console.log(`[gecko] <Afterwards> #${id} complete`)
    } catch (e) {
      console.error(
        `<Afterwards> #${id} error: ${e?.message ?? e}`
      )
    }
  }
}

export async function commitAfterwards(
  context: CommitContext,
  baseDir: string,
  afterwards: GeckoAfterwardsElement
) {
  afterwardsTasks.push({
    afterwards,
    baseDir,
    context,
  })
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
  folder: GeckoElement | GeckoChildren[]
) {
  if (Array.isArray(folder)) {
    await Promise.all(
      folder.map((f) =>
        f !== null &&
        typeof f !== 'number' &&
        typeof f !== 'string' &&
        typeof f !== 'undefined'
          ? commitFolderChildren(context, baseDir, f)
          : Promise.resolve()
      )
    )
    return
  }
  if (folder.type === 'file') {
    await commitFile(context, baseDir, folder)
  } else if (
    folder.type === 'class' ||
    folder.type === 'export' ||
    folder.type === 'import' ||
    folder.type === 'property'
  ) {
    throw new Error(
      `Cannot use ${folder.type} at this location`
    )
  } else if (
    folder.type === 'afterwards' &&
    typeof folder.props.children === 'function'
  ) {
    await commitAfterwards(context, baseDir, folder)
  } else if (folder.props.children) {
    if (typeof folder.props.children === 'function') {
      throw new Error(
        `Not expecting ${folder.type} at this location`
      )
    }
    for (const child of formatChildren(
      folder.props.children as GeckoChildren
    )) {
      if (typeof child === 'number') {
        return child.toString(10)
      } else if (typeof child === 'string') {
        return child
      }
      switch (child.type) {
        case 'afterwards':
          await commitAfterwards(context, baseDir, child)
          break
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

async function writeModifiedFile(
  context: CommitContext,
  filePath: string,
  content: string,
  info?: string
) {
  await writeFile(filePath, content, {
    encoding: 'utf-8',
  })
  console.log(
    `[gecko] wrote ${JSON.stringify(filePath)} (${content.length})${typeof info === 'string' && info.length > 0 ? ' ' : ''}${info ?? ''}`
  )
  if (context.requiredFilePaths?.has(filePath)) {
    context.restart = true
    context.restartFiles.add(filePath)
  }
}

export async function commitFile(
  context: CommitContext,
  baseDir: string,
  file: GeckoFileElement
) {
  const relativeDir = (
    baseDir.startsWith(context.rootDir)
      ? baseDir.substring(context.rootDir.length)
      : baseDir
  ).replace(/^\//, '')
  const absoluteFilePath = join(baseDir, file.props.name)
  const filePath = join(relativeDir, file.props.name)
  if (context.committedFilePaths.has(absoluteFilePath)) {
    console.error(
      `[gecko] warning, additional attempts to write to file ${JSON.stringify(absoluteFilePath)} are ignored, since this file has already been generated, avoid writing to the same file more than once`
    )
    return
  }
  const existingFileContent = await loadFileMaybe(
    absoluteFilePath
  )
  if (
    file.props.once &&
    typeof existingFileContent === 'string' &&
    existingFileContent.length > 0
  ) {
    console.warn(
      `[gecko] skipped write-once file ${JSON.stringify(filePath)} because the file already exists and is not empty`
    )
    return
  }
  context.committedFilePaths.add(absoluteFilePath)
  if (DEBUG > 0) {
    console.log(
      `[gecko] <file path=${JSON.stringify(absoluteFilePath)}>`
    )
  }
  const rawContent = collectFileContents(context, file)
  if (DEBUG > 0) {
    console.log(
      `[gecko] </file path=${JSON.stringify(absoluteFilePath)}>`
    )
  }
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
      const pathSegments = filePath.split('/')
      context.committedFiles.set(absoluteFilePath, {
        content: formattedContent,
        encoding: 'utf-8',
        destination: true,
        name: pathSegments[pathSegments.length - 1],
        path: filePath,
        pathSegments,
      })
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
          `[gecko] skipped ${JSON.stringify(filePath)} (${formattedContent.length}) because file content did not change`
        )
        return
      }
      await writeModifiedFile(
        context,
        absoluteFilePath,
        formattedContent,
        `formatted with ${formatter.props.formatter}`
      )
      return
    } catch (e) {
      await writeModifiedFile(
        context,
        absoluteFilePath,
        content,
        `error when formatting with ${formatter.props.formatter}`
      )
      console.error(
        `[gecko] unable to format ${JSON.stringify(filePath)} due to error when applying '${formatter.props.formatter}' formatter:`
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
    const pathSegments = filePath.split('/')
    context.committedFiles.set(absoluteFilePath, {
      content,
      destination: true,
      encoding: 'utf-8',
      name: pathSegments[pathSegments.length - 1],
      path: filePath,
      pathSegments,
    })
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
        `[gecko] skipped ${JSON.stringify(filePath)} (${content.length}) because file content did not change`
      )
      return
    }
    await writeModifiedFile(
      context,
      absoluteFilePath,
      content
    )
  }
}

export function collectFileContents(
  context: CommitContext,
  file: GeckoFileElement
) {
  if (DEBUG > 1) {
    console.log('file children:')
  }
  return file.props.children
    ? formatChildren(file.props.children)
        .map((x) => {
          if (DEBUG > 1) {
            console.dir(x)
          }
          return renderContent(context, x)
        })
        .join('\n')
    : ''
}
