export interface ImportProps {
  default?: string
  from: string
  named?: string[]
  type?: true
}

export interface GeckoImportElement {
  type: 'import'
  props: ImportProps
}

export function Import(
  props: ImportProps
): GeckoImportElement {
  return { type: 'import', props }
}
