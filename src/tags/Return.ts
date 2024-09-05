import { GeckoChildren } from '..'

export interface ReturnProps {
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
  return {
    type,
    props,
  }
}
