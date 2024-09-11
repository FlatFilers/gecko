import { GeckoChildren } from '..'

export interface MethodProps {
  /** The accessor of the method, can be 'get' or 'set' */
  accessor?: 'get' | 'set'

  /** The arguments of the method, optionally including type annotations, for example: `['a: number', 'b: string']` */
  arguments?: string[]

  /** If true, the method will be asynchronous */
  async?: true

  /** The child elements of the method declaration */
  children?: GeckoChildren

  /** The name of the method */
  name: string

  /** If true, the method will be private */
  private?: true

  /** If true, the method will be protected */
  protected?: true

  /** If true, the method will be public */
  public?: true

  /** The return type of the method */
  returnType?: string

  /** If true, the method will be static */
  static?: true

  /** The type arguments of the method, i.e. `['T']` for `<T>` */
  typeArguments?: string[]

  /** If true, the method will be undocumented when inside a `<Documented>` block */
  undocumented?: true
}

export type type = 'method'
export const type: type = 'method'

export interface GeckoMethodElement {
  type: type
  props: MethodProps
}

export function Method(
  props: MethodProps
): GeckoMethodElement {
  const flags = [
    props.private ? 'private' : '',
    props.protected ? 'protected' : '',
    props.public ? 'public' : '',
  ].filter((x) => x)
  if (flags.length > 1) {
    throw new Error(
      `must not specify more than one of: ${flags.join(', ')}`
    )
  }
  return { type, props }
}
