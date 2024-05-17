import { GeckoElement } from '..'

export interface FileFormatterProps {
  children?:
    | GeckoElement
    | (GeckoElement | GeckoElement[])[]
  formatter: 'prettier'
  match: string
}

export interface GeckoFileFormatterElement {
  type: 'file-formatter'
  props: FileFormatterProps
}

export function FileFormatter(
  props: FileFormatterProps
): GeckoFileFormatterElement {
  return {
    type: 'file-formatter',
    props,
  }
}
