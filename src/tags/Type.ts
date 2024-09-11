import { GeckoChildren } from '..'

export interface TypeProps {
  /** The child elements of the type declaration */
  children?: GeckoChildren

  /** Specifies if the type should be exported. Can be a boolean or 'default' for default export */
  export?: boolean | 'default'

  /** The name of the type */
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
