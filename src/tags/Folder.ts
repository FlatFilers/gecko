import { GeckoFileElement } from './File'
import { GeckoFileFormatterElement } from './FileFormatter'
import { GeckoFileTemplateElement } from './FileTemplate'

export interface FolderProps {
  children?: (
    | GeckoFileElement
    | GeckoFileFormatterElement
    | GeckoFileTemplateElement
    | GeckoFolderElement
  )[]
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
