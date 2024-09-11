import { GeckoChildren } from '..'

export interface TextProps {
  /** The text to be rendered */
  children?: GeckoChildren
}

export type type = 'text'
export const type: type = 'text'

export interface GeckoTextElement {
  type: type
  props: TextProps
}

export function Text(props: TextProps): GeckoTextElement {
  return { type, props }
}
