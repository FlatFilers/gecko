import { GeckoChildren } from '..'

export interface InterfaceProps {
  /** The child elements of the interface declaration */
  children?: GeckoChildren

  /** Specifies if the interface should be exported. Can be a boolean or 'default' for default export */
  export?: boolean | 'default'

  /** The interfaces that the interface extends */
  extends?: string

  /** The name of the interface */
  name: string
}

export type type = 'interface'
export const type: type = 'interface'

export interface GeckoInterfaceElement {
  type: type
  props: InterfaceProps
}

export function Interface(
  props: InterfaceProps
): GeckoInterfaceElement {
  return { type, props }
}
