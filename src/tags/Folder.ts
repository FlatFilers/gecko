import { GeckoFileElement } from './File'

export interface FolderProps {
  children?: (GeckoFileElement | GeckoFolderElement)[]
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
