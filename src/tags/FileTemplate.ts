import { GeckoChildren } from '..'

export interface TemplateMatch {
  match: string
  template: string
}

export interface FileTemplateProps {
  /** The child elements of the file template */
  children?: GeckoChildren

  /** The templates to match */
  templates: TemplateMatch[]
}

export type type = 'file-template'
export const type: type = 'file-template'

export interface GeckoFileTemplateElement {
  type: type
  props: FileTemplateProps
}

export function FileTemplate(
  props: FileTemplateProps
): GeckoFileTemplateElement {
  return { type, props }
}
