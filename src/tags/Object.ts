import { GeckoChildren } from '..'

export interface ObjectProps {
  /** The child elements of the object declaration */
  children?: GeckoChildren

  /** If true, the object will be a type object, and properties will not be able to contain values */
  private?: true
}

export type type = 'object'
export const type: type = 'object'

export interface GeckoObjectElement {
  type: type
  props: ObjectProps
}

export function Object(
  props: ObjectProps
): GeckoObjectElement {
  return { type, props }
}
