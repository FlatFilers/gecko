import { GeckoChildren } from '..'

export interface FolderProps {
  children?: GeckoChildren
  name: string
}

export interface GeckoFolderElement {
  type: 'folder'
  props: FolderProps
}

export function Folder(
  props: FolderProps
): GeckoFolderElement {
  return {
    type: 'folder',
    props,
  }
}
