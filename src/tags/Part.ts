import { GeckoChildren } from '..'

export interface PartProps {
  children?: GeckoChildren
  tag: string
  order?: number
}

export type type = 'part'
export const type: type = 'part'

export interface GeckoPartElement {
  type: type
  props: PartProps
}

export function Part(props: PartProps): GeckoPartElement {
  return { type, props }
}
