import { GeckoChildren } from '..'

export interface DataPromptProps {
  /** The child elements of the data prompt. This is a function that takes in the props and returns new children */
  children?: ((...props: any[]) => GeckoChildren)[]

  /** The input of the prompt */
  input: string

  /** The TypeScript type of the expected output data */
  type: string
}

export type type = 'prompt:data'
export const type: type = 'prompt:data'

export interface GeckoDataPromptElement {
  type: type
  props: DataPromptProps
}

export function DataPrompt(
  props: DataPromptProps
): GeckoDataPromptElement {
  return { type, props }
}
