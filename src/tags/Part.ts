import { GeckoChildren } from '..'

export interface PartProps {
  /** The child elements of the part declaration */
  children?: GeckoChildren

  /** The tag of the part */
  tag: string

  /** The order of the part */
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
