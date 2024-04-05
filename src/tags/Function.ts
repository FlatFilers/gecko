import { GeckoTextElement } from './Text'

export interface FunctionProps {
  arguments?: string[]
  children?: (GeckoTextElement | string)[]
  export?: boolean | 'default'
  name: string
}

export interface GeckoFunctionElement {
  type: 'function'
  props: FunctionProps
}

export function Function(
  props: FunctionProps
): GeckoFunctionElement {
  return { type: 'function', props }
}
