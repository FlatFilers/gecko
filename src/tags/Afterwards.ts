import { GeckoContentFunction } from '..'

export interface AfterwardsProps {
  children?: GeckoContentFunction | GeckoContentFunction[]
}

export interface GeckoAfterwardsElement {
  type: 'afterwards'
  props: AfterwardsProps
}

export function Afterwards(
  props: AfterwardsProps
): GeckoAfterwardsElement {
  return {
    type: 'afterwards',
    props,
  }
}
