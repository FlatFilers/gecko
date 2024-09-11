import { GeckoChildren } from '..'

export enum DocumentationFormat {
  JSDoc = 'JSDoc',
}

export interface DocumentedProps {
  /** The child elements of the documented tag */
  children?: GeckoChildren

  /** The formats to document */
  formats: DocumentationFormat[]
}

export type type = 'documented'
export const type: type = 'documented'

export interface GeckoDocumentedElement {
  type: type
  props: DocumentedProps
}

export function Documented(
  props: DocumentedProps
): GeckoDocumentedElement {
  return { type, props }
}
