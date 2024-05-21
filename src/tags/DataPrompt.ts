import { GeckoChildren } from '..'

export interface DataPromptProps {
  children?: ((...props: any[]) => GeckoChildren)[]
  input: string
  type: string
}

export interface GeckoDataPromptElement {
  type: 'prompt:data'
  props: DataPromptProps
}

export function DataPrompt(
  props: DataPromptProps
): GeckoDataPromptElement {
  return {
    type: 'prompt:data',
    props,
  }
}
