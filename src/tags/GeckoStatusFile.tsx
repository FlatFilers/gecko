import {
  Afterwards,
  File,
  geckoJSX,
  GeckoSource,
  Text,
} from '..'
import { AnyNode } from '../types/node'
import { calculateNodeTree } from '../util/calculateNodeTree'
import { prettySize } from '../util/prettySize'

function renderMarkdownNode(
  pathPrefix: string,
  node: AnyNode
): string {
  if ('size' in node) {
    return `<div>📄 <a href="${pathPrefix}${pathPrefix.length > 0 ? '/' : ''}${node.path}">${node.name}</a> <code>${prettySize(node.size)}</code></div>`
  } else {
    const childrenContent = Array.from(
      node.children.values()
    )
      .map(
        (n) =>
          '  ' +
          renderMarkdownNode(pathPrefix, n).replace(
            /\n/g,
            '\n    '
          )
      )
      .join('\n')
    return `<details open>
  <summary>📁 <a href="${pathPrefix}${pathPrefix.length > 0 ? '/' : ''}${node.path}">${node.name}</a></summary>
  <blockquote>
${childrenContent}
  </blockquote>
</details>`
  }
}

function renderFileTree(
  pathPrefix: string,
  nodes: AnyNode[],
  renderNode: (pathPrefix: string, node: AnyNode) => string
) {
  return nodes
    .map((n) => renderNode(pathPrefix, n))
    .join('\n')
}

export function GeckoStatusFile() {
  return (
    <Afterwards>
      {(s: GeckoSource) => {
        const relativePath =
          s.baseDir === s.context.rootDir
            ? ''
            : s.baseDir.startsWith(s.context.rootDir)
              ? s.baseDir
                  .substring(s.context.rootDir.length)
                  .replace(/^\//, '')
                  .split('/')
                  .fill('..')
                  .join('/')
              : s.context.rootDir.startsWith(s.baseDir)
                ? s.context.rootDir
                    .substring(s.baseDir.length)
                    .replace(/^\//, '')
                : s.baseDir
        return (
          <File name="GeckoStatus.md">
            <Text># Gecko Status</Text>
            <Text />
            <Text>## Files</Text>
            <Text />
            {renderFileTree(
              relativePath,
              calculateNodeTree(s.match()),
              renderMarkdownNode
            )}
          </File>
        )
      }}
    </Afterwards>
  )
}
