export interface ExportProps {
  /** The name to export as */
  as?: string

  /** Whether to export all exports from the module*/
  all?: true

  /** The name of the module or file to export from */
  from: string

  /** The names to export */
  named?: string[]

  /** Whether to export as types */
  type?: true
}

export type type = 'export'
export const type: type = 'export'

export interface GeckoExportElement {
  type: type
  props: ExportProps
}

export function Export(
  props: ExportProps
): GeckoExportElement {
  return { type, props }
}
