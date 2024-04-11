import { GeckoTextElement } from './Text'

export interface MethodProps {
  arguments?: string[]
  async?: true
  children?: (GeckoTextElement | string)[]
  name: string
}

export interface GeckoMethodElement {
  type: 'method'
  props: MethodProps
}

export function Method(
  props: MethodProps
): GeckoMethodElement {
  return { type: 'method', props }
}
