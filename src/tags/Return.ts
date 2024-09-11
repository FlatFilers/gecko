import { GeckoChildren } from '..'

export interface ReturnProps {
  /** The child elements of the return type declaration */
  children?: GeckoChildren
}

export type type = 'return'
export const type: type = 'return'

export interface GeckoReturnElement {
  type: type
  props: ReturnProps
}

export function Return(
  props: ReturnProps
): GeckoReturnElement {
  return { type, props }
}
