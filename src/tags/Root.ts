import { GeckoChildren } from '..'

export interface RootProps {
  children?: GeckoChildren
  erase?: true
  path?: string
}

export interface GeckoRootElement {
  type: 'root'
  props: RootProps
}

export function Root(props: RootProps): GeckoRootElement {
  return { type: 'root', props }
}
