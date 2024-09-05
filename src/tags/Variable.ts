import { GeckoChildren } from '..'

export interface VariableProps {
  children?: GeckoChildren
  export?: boolean | 'default'
  mutable?: true
  name: string
  type?: string | GeckoChildren
}

type type = 'variable'
const type: type = 'variable'

export interface GeckoVariableElement {
  type: type
  props: VariableProps
}

export function Variable(
  props: VariableProps
): GeckoVariableElement {
  return { type, props }
}
