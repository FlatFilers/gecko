import { GeckoElement } from '..'
import { GeckoFileElement } from './File'
import { GeckoFolderElement } from './Folder'

export interface FileFormatterProps {
  children?: GeckoElement | GeckoElement[]
  formatter: 'prettier'
  match: string
}

export interface GeckoFileFormatterElement {
  type: 'file-formatter'
  props: FileFormatterProps
}

export function FileFormatter(
  props: FileFormatterProps
): GeckoFileFormatterElement {
  return {
    type: 'file-formatter',
    props,
  }
}
