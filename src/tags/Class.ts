import { GeckoChildren } from '..'

export interface ClassProps {
  /** The child elements of the class */
  children?: GeckoChildren

  /** Whether the class is abstract */
  abstract?: true

  /** Specifies if the class should be exported. Can be a boolean or 'default' for default export */
  export?: boolean | 'default'

  /** The class that the current class extends */
  extends?: string

  /** The interfaces that the current class implements */
  implements?: string

  /** The name of the class */
  name?: string
}

export type type = 'class'
export const type: type = 'class'

export interface GeckoClassElement {
  type: type
  props: ClassProps
}

export function Class(
  props: ClassProps
): GeckoClassElement {
  return { type, props }
}
