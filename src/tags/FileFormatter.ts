import { GeckoChildren } from '..'

export interface FileFormatterProps {
  /** The child elements of the file formatter */
  children?: GeckoChildren

  /** The formatter to use */
  formatter: 'prettier'

  /** The match pattern to look for */
  match: string
}

export type type = 'file-formatter'
export const type: type = 'file-formatter'

export interface GeckoFileFormatterElement {
  type: type
  props: FileFormatterProps
}

export function FileFormatter(
  props: FileFormatterProps
): GeckoFileFormatterElement {
  return { type, props }
}
