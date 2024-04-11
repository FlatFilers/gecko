import { GeckoTextElement } from './Text'

export interface ClassProps {
  children?: (GeckoTextElement | string)[]
  export?: boolean | 'default'
  extends?: string
  name: string
}

export interface GeckoClassElement {
  type: 'class'
  props: ClassProps
}

export function Class(
  props: ClassProps
): GeckoClassElement {
  return { type: 'class', props }
}
