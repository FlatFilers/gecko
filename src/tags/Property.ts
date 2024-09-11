import { GeckoChildren } from '..'

export interface PropertyProps {
  /** The child elements of the property declaration, provide either `value` or `children`, but not both */
  children?: GeckoChildren

  /** The name of the property */
  name: string

  /** If true, the property will be private */
  private?: true

  /** If true, the property will be protected */
  protected?: true

  /** If true, the property will be public */
  public?: true

  /** If true, the property will be readonly */
  readonly?: true

  /** If true, the property will be required */
  required?: true

  /** If true, the property will be static */
  static?: true

  /** The type of the property */
  type?: string

  /** The value of the property, provide either `value` or `children`, but not both */
  value?: string
}

export type type = 'property'
export const type: type = 'property'

export interface GeckoPropertyElement {
  type: type
  props: PropertyProps
}

export function Property(
  props: PropertyProps
): GeckoPropertyElement {
  return { type, props }
}
