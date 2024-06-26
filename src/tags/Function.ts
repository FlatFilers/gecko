import { GeckoChildren } from '..'

export interface FunctionProps {
  arguments?: string[]
  async?: true
  children?: GeckoChildren
  export?: boolean | 'default'
  name: string
  returnType?: string
  typeArguments?: string[]
  undocumented?: true
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
