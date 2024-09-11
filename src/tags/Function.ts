import { GeckoChildren } from '..'

export interface FunctionProps {
  /** The arguments of the function. Arguments may include type annotations, i.e. `name: string`. */
  arguments?: string[]

  /** Whether the function is asynchronous. */
  async?: true

  /** The content of the function. */
  children?: GeckoChildren

  /** Specifies if the function should be exported. Can be a boolean or 'default' for default export */
  export?: boolean | 'default'

  /** The name of the function. */
  name?: string

  /** The return type of the function. */
  returnType?: string

  /** The type arguments of the function. */
  typeArguments?: string[]

  /** Whether the function is undocumented when inside a `Documented` tag. */
  undocumented?: true
}

export type type = 'function'
export const type: type = 'function'

export interface GeckoFunctionElement {
  type: type
  props: FunctionProps
}

export function Function(
  props: FunctionProps
): GeckoFunctionElement {
  return { type, props }
}
