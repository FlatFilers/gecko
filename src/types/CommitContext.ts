import { GeckoDocumentedElement } from '../tags/Documented'
import { GeckoFileFormatterElement } from '../tags/FileFormatter'
import { GeckoFileTemplateElement } from '../tags/FileTemplate'
import { GeckoFile } from './GeckoSource'

export interface CommitContext {
  committedFilePaths: Set<string>
  committedFiles: Map<string, GeckoFile>
  documentedStack: GeckoDocumentedElement[]
  fileFormatterStack: GeckoFileFormatterElement[]
  fileTemplateStack: GeckoFileTemplateElement[]
}
