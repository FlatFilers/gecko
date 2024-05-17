import { GeckoElement } from '..'

export interface TextProps {
  children?:
    | string
    | GeckoElement
    | (string | string[] | GeckoElement | GeckoElement[])[]
}

export interface GeckoTextElement {
  type: 'text'
  props: TextProps
}

export function Text(props: TextProps): GeckoTextElement {
  return { type: 'text', props }
}
