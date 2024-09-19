export interface Node {
  path: string
  name: string
}

export interface FolderNode extends Node {
  children: Map<string, AnyNode>
}

export interface FileNode extends Node {
  size: number
}

export type AnyNode = FolderNode | FileNode

export interface FileLike {
  content: string
  name: string
  pathSegments: string[] // final segment is name
}
