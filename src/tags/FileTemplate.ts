import { GeckoElement } from '..'

export interface TemplateMatch {
  match: string
  template: string
}

export interface FileTemplateProps {
  children?: GeckoElement | GeckoElement[]
  templates: TemplateMatch[]
}

export interface GeckoFileTemplateElement {
  type: 'file-template'
  props: FileTemplateProps
}

export function FileTemplate(
  props: FileTemplateProps
): GeckoFileTemplateElement {
  return {
    type: 'file-template',
    props,
  }
}
