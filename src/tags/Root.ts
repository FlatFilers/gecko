import { GeckoChildren } from '..'

export interface RootProps {
  /** The child elements of the root declaration*/
  children?: GeckoChildren

  /** If true, the root folder will be erased before generating the output */
  erase?: true

  /** The path of the root directory, all generated folders and files will be placed in this directory */
  path?: string

  /** The file paths upon which the generated files depend, all files specified here will cause Gecko to re-run if they are modified during the generation process */
  requires?: string[]
}

export type type = 'root'
export const type: type = 'root'

export interface GeckoRootElement {
  type: type
  props: RootProps
}

export function Root(props: RootProps): GeckoRootElement {
  return { type, props }
}
