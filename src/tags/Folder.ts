import { GeckoElement } from '..'

export interface FolderProps {
  children?: GeckoElement[]
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
