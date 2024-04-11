import { mkdir, rmdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { GeckoClassElement } from './tags/Class'
import { GeckoFileElement } from './tags/File'
import { GeckoFolderElement } from './tags/Folder'
import { GeckoFunctionElement } from './tags/Function'
import { GeckoMethodElement } from './tags/Method'
import { GeckoRootElement } from './tags/Root'
import { GeckoTextElement } from './tags/Text'

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
  await commitFolderChildren(baseDir, root)
}

export async function commitFolder(
  baseDir: string,
  folder: GeckoFolderElement
) {
  const newBaseDir = join(baseDir, folder.props.name)
  await mkdir(newBaseDir, { recursive: true })
  await commitFolderChildren(newBaseDir, folder)
}

export async function commitFolderChildren(
  baseDir: string,
  folder: GeckoFolderElement | GeckoRootElement
) {
  if (folder.props.children) {
    for (const child of folder.props.children) {
      switch (child.type) {
        case 'file':
          await commitFile(baseDir, child)
          break
        case 'folder':
          await commitFolder(baseDir, child)
          break
      }
    }
  }
}

export async function commitFile(
  baseDir: string,
  file: GeckoFileElement
) {
  const filePath = join(baseDir, file.props.name)
  const contents = collectFileContents(file)
  await writeFile(filePath, contents, { encoding: 'utf8' })
  console.log(`wrote ${filePath} (${contents.length})`)
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
    | GeckoMethodElement
    | GeckoFunctionElement
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
    case 'text':
      return (
        content.props.children
          ?.map(renderContent)
          ?.join?.('\n') ?? ''
      )
  }
}

export function renderClass(_class: GeckoClassElement) {
  const body = _class.props.children
    ? _class.props.children
        .flat(Infinity)
        .map((x) => renderContent(x))
        .join('\n')
    : ''
  const cls = `class ${_class.props.name} {\n${body}\n}`
  if (_class.props.export === 'default') {
    return `export default ${cls}`
  }
  return `${_class.props.export ? 'export ' : ''}${cls}`
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
  return `${method.props.async ? 'async ' : ''}${
    method.props.name
  }(${args}) {\n${body}\n}\n`
}
