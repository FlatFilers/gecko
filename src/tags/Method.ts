import { GeckoChildren } from '..'

export interface MethodProps {
  arguments?: string[]
  async?: true
  children?: GeckoChildren
  name: string
  private?: true
  protected?: true
  public?: true
  returnType?: string
  static?: true
  typeArguments?: string[]
  undocumented?: true
  accessor?: 'get' | 'set'
}

export interface GeckoMethodElement {
  type: 'method'
  props: MethodProps
}

export function Method(
  props: MethodProps
): GeckoMethodElement {
  return { type: 'method', props }
}
