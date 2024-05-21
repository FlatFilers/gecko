import { GeckoChildren } from '..'

export interface ClassProps {
  abstract?: true
  children?: GeckoChildren
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
