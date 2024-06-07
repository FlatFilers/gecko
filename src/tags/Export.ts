export interface ExportProps {
  as?: string
  all?: true
  from: string
  named?: string[]
  type?: true
}

export interface GeckoExportElement {
  type: 'export'
  props: ExportProps
}

export function Export(
  props: ExportProps
): GeckoExportElement {
  return { type: 'export', props }
}
