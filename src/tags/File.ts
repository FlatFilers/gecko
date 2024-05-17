import { GeckoElement } from '..'

export interface FileProps {
  children?:
    | GeckoElement
    | (GeckoElement | GeckoElement[] | string)[]
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
