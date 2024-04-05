export interface TextProps {
  children?: string[]
}

export interface GeckoTextElement {
  type: 'text'
  props: TextProps
}

export function Text(props: TextProps): GeckoTextElement {
  return { type: 'text', props }
}
