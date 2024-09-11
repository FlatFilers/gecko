import { GeckoChildren } from '..'

export interface VariableProps {
  /** The child elements of the variable declaration */
  children?: GeckoChildren

  /** Specifies if the variable should be exported. Can be a boolean or 'default' for default export */
  export?: boolean | 'default'

  /** Indicates if the variable is mutable (can be reassigned, setting this to true will make gecko print `let` instead of `const`) */
  mutable?: true

  /** The name of the variable */
  name: string

  /** The type of the variable. Can be a string or GeckoChildren */
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
