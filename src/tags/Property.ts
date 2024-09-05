import { GeckoChildren } from '..'

export interface PropertyProps {
  children?: GeckoChildren
  name: string
  private?: true
  protected?: true
  public?: true
  readonly?: true
  required?: true
  static?: true
  type?: string
  value?: string
}

export interface GeckoPropertyElement {
  type: 'property'
  props: PropertyProps
}

export function Property(
  props: PropertyProps
): GeckoPropertyElement {
  return { type: 'property', props }
}
