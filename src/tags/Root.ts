import { GeckoFileElement } from './File'
import { GeckoFileFormatterElement } from './FileFormatter'
import { GeckoFolderElement } from './Folder'

export interface RootProps {
  children?: (
    | GeckoFileElement
    | GeckoFileFormatterElement
    | GeckoFolderElement
  )[]
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
