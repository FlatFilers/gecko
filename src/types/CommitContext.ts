import { GeckoDocumentedElement } from '../tags/Documented'
import { GeckoFileFormatterElement } from '../tags/FileFormatter'
import { GeckoFileTemplateElement } from '../tags/FileTemplate'

export interface CommitContext {
  committedFilePaths: Set<string>
  documentedStack: GeckoDocumentedElement[]
  fileFormatterStack: GeckoFileFormatterElement[]
  fileTemplateStack: GeckoFileTemplateElement[]
}
