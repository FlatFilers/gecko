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
  const nodePath = `${pathPrefix}${pathPrefix.length > 0 ? '/' : ''}${node.path}`
  if ('size' in node) {
    return `<div>📄 <a href="${nodePath}">${node.name}</a> <code>${prettySize(node.size)}</code></div>`
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
  <summary>📁 <a href="${nodePath}">${node.name}</a></summary>
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
  return (
    nodes.map((n) => renderNode(pathPrefix, n)).join('\n') +
    '\n'
  )
}

export interface GeckoStatusFileProps {
  /** File name to create, default is `'GeckoStatus.md'` */
  name?: string
}

export function GeckoStatusFile({
  name = 'GeckoStatus.md',
}: GeckoStatusFileProps) {
  return (
    <Afterwards>
      {(s: GeckoSource) => {
        const relativePath =
          s.baseDir === s.context.workingDir
            ? ''
            : s.baseDir.startsWith(s.context.workingDir)
              ? s.baseDir
                  .substring(s.context.workingDir.length)
                  .replace(/^\//, '')
                  .split('/')
                  .fill('..')
                  .join('/')
              : s.context.workingDir.startsWith(s.baseDir)
                ? s.context.workingDir
                    .substring(s.baseDir.length)
                    .replace(/^\//, '')
                : s.baseDir
        return (
          <File name={name}>
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
