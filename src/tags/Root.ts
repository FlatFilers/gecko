import { GeckoElement } from '..'

export interface RootProps {
  children?:
    | GeckoElement
    | (GeckoElement | GeckoElement[])[]
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
