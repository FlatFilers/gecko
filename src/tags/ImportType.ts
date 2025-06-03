export interface ImportTypeProps {
  named: string[]
  from: string
}

export type type = 'importType'
export const type: type = 'importType'

export interface GeckoImportTypeElement {
  type: type
  props: ImportTypeProps
}

export function ImportType(
  props: ImportTypeProps
): GeckoImportTypeElement {
  return { type, props }
} 