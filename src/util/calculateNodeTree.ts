import {
  AnyNode,
  FileLike,
  FileNode,
  FolderNode,
} from '../types/node'

export function calculateNodeTree(
  files: FileLike[]
): AnyNode[] {
  const rootNodes: Map<string, AnyNode> = new Map()

  for (const file of files) {
    let currentNode: FolderNode | undefined
    let currentPath = ''

    for (let i = 0; i < file.pathSegments.length; i++) {
      const segment = file.pathSegments[i]
      currentPath += (currentPath ? '/' : '') + segment

      if (i === file.pathSegments.length - 1) {
        // This is a file
        const fileNode: FileNode = {
          path: currentPath,
          name: segment,
          size: file.content.length,
        }
        if (currentNode) {
          currentNode.children.set(segment, fileNode)
        } else {
          // This is a root-level file
          rootNodes.set(segment, fileNode)
        }
      } else {
        // This is a folder
        let folderNode: FolderNode
        if (i === 0) {
          if (!rootNodes.has(segment)) {
            folderNode = {
              children: new Map<string, AnyNode>(),
              path: segment,
              name: segment,
            }
            rootNodes.set(segment, folderNode)
          } else {
            folderNode = rootNodes.get(
              segment
            ) as FolderNode
          }
        } else {
          if (!currentNode!.children.has(segment)) {
            folderNode = {
              children: new Map<string, AnyNode>(),
              path: currentPath,
              name: segment,
            }
            currentNode!.children.set(segment, folderNode)
          } else {
            folderNode = currentNode!.children.get(
              segment
            ) as FolderNode
          }
        }
        currentNode = folderNode
      }
    }
  }

  return Array.from(rootNodes.values())
}
