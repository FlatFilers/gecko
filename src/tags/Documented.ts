import { GeckoChildren } from '..'

export enum DocumentationFormat {
  JSDoc = 'JSDoc',
}

export interface DocumentedProps {
  children?: GeckoChildren
  formats: DocumentationFormat[]
}

export interface GeckoDocumentedElement {
  type: 'documented'
  props: DocumentedProps
}

export function Documented(
  props: DocumentedProps
): GeckoDocumentedElement {
  return {
    type: 'documented',
    props,
  }
}
