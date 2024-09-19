import { GeckoDocumentedElement } from '../tags/Documented'
import { GeckoFileFormatterElement } from '../tags/FileFormatter'
import { GeckoFileTemplateElement } from '../tags/FileTemplate'
import { GeckoPartElement } from '../tags/Part'
import { GeckoDestinationFile } from './GeckoSource'

export type PartElementsByOrder = Map<
  number,
  GeckoPartElement[]
>
export interface CommitContext {
  committedFilePaths: Set<string>
  committedFiles: Map<string, GeckoDestinationFile>
  documentedStack: GeckoDocumentedElement[]
  fileFormatterStack: GeckoFileFormatterElement[]
  fileTemplateStack: GeckoFileTemplateElement[]
  partsByTagAndOrder: Map<string, PartElementsByOrder>
  requiredFilePaths: Set<string>
  restart: boolean
  restartFiles: Set<string>
  rootDir: string
  workingDir: string
}
