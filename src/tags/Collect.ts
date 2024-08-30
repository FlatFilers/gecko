import { GeckoChildren } from '..'

export interface CollectProps {
  children?: GeckoChildren
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
