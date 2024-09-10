import { GeckoChildren } from '..'

export interface MethodProps {
  accessor?: 'get' | 'set'
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
}

export interface GeckoMethodElement {
  type: 'method'
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
  return { type: 'method', props }
}
