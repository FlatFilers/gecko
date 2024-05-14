import { GeckoFileElement } from './File'
import { GeckoFolderElement } from './Folder'

export interface TemplateMatch {
  match: string
  template: string
}

export interface FileTemplateProps {
  children?: (GeckoFolderElement | GeckoFileElement)[]
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
