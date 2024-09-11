export interface ImportProps {
  /** Import the default export of the module */
  default?: string

  /** The file path or moduleof the import */
  from: string

  /** The named exports of the module to import */
  named?: string[]

  /** If true, the import will be a type import */
  type?: true
}

export type type = 'import'
export const type: type = 'import'

export interface GeckoImportElement {
  type: type
  props: ImportProps
}

export function Import(
  props: ImportProps
): GeckoImportElement {
  return { type, props }
}
