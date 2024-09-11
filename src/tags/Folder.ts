import { GeckoChildren } from '..'

export interface FolderProps {
  /** The child elements of the folder */
  children?: GeckoChildren

  /** The name of the folder */
  name: string
}

export type type = 'folder'
export const type: type = 'folder'

export interface GeckoFolderElement {
  type: type
  props: FolderProps
}

export function Folder(
  props: FolderProps
): GeckoFolderElement {
  return { type, props }
}
