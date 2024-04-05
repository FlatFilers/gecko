import { GeckoFileElement } from './File'
import { GeckoFolderElement } from './Folder'

export interface RootProps {
  children?: (GeckoFolderElement | GeckoFileElement)[]
  erase?: true
  path?: string
}

export interface GeckoRootElement {
  type: 'root'
  props: RootProps
}

export function Root(props: RootProps): GeckoRootElement {
  return { type: 'root', props }
}
