import { GeckoElement } from '..'

export interface MethodProps {
  arguments?: string[]
  async?: true
  children?: (GeckoElement | GeckoElement[] | string)[]
  name: string
  private?: true
  protected?: true
  public?: true
  returnType?: string
  static?: true
  typeArguments?: string[]
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
