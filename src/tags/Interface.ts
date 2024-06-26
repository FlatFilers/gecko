import { GeckoChildren } from '..'

export interface InterfaceProps {
  children?: GeckoChildren
  export?: boolean | 'default'
  extends?: string
  name: string
}

export interface GeckoInterfaceElement {
  type: 'interface'
  props: InterfaceProps
}

export function Interface(
  props: InterfaceProps
): GeckoInterfaceElement {
  return {
    type: 'interface',
    props,
  }
}
