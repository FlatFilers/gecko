import { GeckoClassElement } from './Class'
import { GeckoFunctionElement } from './Function'
import { GeckoImportElement } from './Import'
import { GeckoTextElement } from './Text'

export interface FileProps {
  children?: (
    | GeckoClassElement
    | GeckoFunctionElement
    | GeckoImportElement
    | GeckoTextElement
    | string
  )[]
  name: string
}

export interface GeckoFileElement {
  type: 'file'
  props: FileProps
}

export function File(props: FileProps): GeckoFileElement {
  return {
    type: 'file',
    props,
  }
}
