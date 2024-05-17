import { GeckoMethodElement } from './Method'
import { GeckoPropertyElement } from './Property'
import { GeckoTextElement } from './Text'

export interface ClassProps {
  abstract?: true
  children?: (
    | GeckoTextElement
    | GeckoMethodElement
    | GeckoPropertyElement
    | string
  )[]
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
