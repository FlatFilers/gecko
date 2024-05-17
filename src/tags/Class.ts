import { GeckoElement } from '..'

export interface ClassProps {
  abstract?: true
  children?: (GeckoElement | GeckoElement[] | string)[]
  export?: boolean | 'default'
  extends?: string
  implements?: string
  name: string
}

export interface GeckoClassElement {
  type: 'class'
  props: ClassProps
}

export function Class(
  props: ClassProps
): GeckoClassElement {
  return { type: 'class', props }
}
