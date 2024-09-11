import { GeckoContentFunction } from '..'

export interface AfterwardsProps {
  /** The child elements of the afterwards declaration, can be a single function or an array of functions */
  children?: GeckoContentFunction | GeckoContentFunction[]
}

export type type = 'afterwards'
export const type: type = 'afterwards'

export interface GeckoAfterwardsElement {
  type: type
  props: AfterwardsProps
}

export function Afterwards(
  props: AfterwardsProps
): GeckoAfterwardsElement {
  return { type, props }
}
