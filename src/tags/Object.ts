import { GeckoChildren } from '..'

export interface ObjectProps {
  children?: GeckoChildren
  type?: true
}

export type type = 'object'
export const type: type = 'object'

export interface GeckoObjectElement {
  type: type
  props: ObjectProps
}

export function Object(
  props: ObjectProps
): GeckoObjectElement {
  return {
    type,
    props,
  }
}
