import { GeckoTextElement } from './Text'

export interface PropertyProps {
  name: string
  private?: true
  protected?: true
  public?: true
  readonly?: true
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
