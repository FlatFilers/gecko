import { GeckoFunctionElement } from './Function'
import { GeckoTextElement } from './Text'

export interface FileProps {
  children?: (
    | GeckoFunctionElement
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
