import { GeckoChildren } from '..'

export interface CollectProps {
  /** The child elements of the collect tag */
  children?: GeckoChildren

  /** The tag name of the collect tag */
  tag: string
}

export type type = 'collect'
export const type: type = 'collect'

export interface GeckoCollectElement {
  type: type
  props: CollectProps
}

export function Collect(
  props: CollectProps
): GeckoCollectElement {
  return { type, props }
}
