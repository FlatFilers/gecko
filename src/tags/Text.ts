import { GeckoChildren } from '..'

export interface TextProps {
  children?: GeckoChildren
}

export interface GeckoTextElement {
  type: 'text'
  props: TextProps
}

export function Text(props: TextProps): GeckoTextElement {
  return { type: 'text', props }
}
