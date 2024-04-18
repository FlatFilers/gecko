import { GeckoElement } from '..'

export interface PromptProps {
  children?: ((...props: any[]) => GeckoElement[])[]
  input: string
  type: string
}

export interface GeckoPromptElement {
  type: 'prompt'
  props: PromptProps
}

export function Prompt(
  props: PromptProps
): GeckoPromptElement {
  return {
    type: 'prompt',
    props,
  }
}
