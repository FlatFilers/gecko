import { GeckoElement } from '..'

export interface FunctionProps {
  arguments?: string[]
  async?: true
  children?: (GeckoElement | GeckoElement[] | string)[]
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
