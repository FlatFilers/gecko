import { GeckoChildren } from '..'

export interface TypeProps {
  children?: GeckoChildren
  export?: boolean | 'default'
  name: string
}

export type type = 'type'
export const type: type = 'type'

export interface GeckoTypeElement {
  type: type
  props: TypeProps
}

export function Type(props: TypeProps): GeckoTypeElement {
  return { type, props }
}
