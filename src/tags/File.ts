import { GeckoChildren } from '..'

export interface FileProps {
  children?: GeckoChildren
  name: string
  once?: true
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
