import { GeckoChildren } from '..'

export interface FileProps {
  /** The child elements of the file */
  children?: GeckoChildren

  /** The name of the file */
  name: string

  /** Whether the file should be overwritten if it already exists, if this is set the file will not be overwritten */
  once?: true
}

export type type = 'file'
export const type: type = 'file'

export interface GeckoFileElement {
  type: type
  props: FileProps
}

export function File(props: FileProps): GeckoFileElement {
  return { type, props }
}
