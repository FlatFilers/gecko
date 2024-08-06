import { GeckoDocumentedElement } from '../tags/Documented'
import { GeckoFileFormatterElement } from '../tags/FileFormatter'
import { GeckoFileTemplateElement } from '../tags/FileTemplate'
import { GeckoDestinationFile } from './GeckoSource'

export interface CommitContext {
  afterwardsPromises: Promise<void>[]
  committedFilePaths: Set<string>
  committedFiles: Map<string, GeckoDestinationFile>
  documentedStack: GeckoDocumentedElement[]
  fileFormatterStack: GeckoFileFormatterElement[]
  fileTemplateStack: GeckoFileTemplateElement[]
  requiredFilePaths: Set<string>
  restart: boolean
  restartFiles: Set<string>
}
