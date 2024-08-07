import { CommitContext } from './CommitContext'

export interface GeckoFile {
  content?: string
  destination?: true // is a destination (write file target)
  encoding?: 'utf-8' // todo support encodings other than utf-8
  path?: string
  source?: true // is a source (file that is read from)
  name?: string
  pathSegments?: string[]
}

export interface GeckoDestinationFile extends GeckoFile {
  content: string
  destination: true
  path: string
  name: string
  pathSegments: string[]
}

export interface GeckoSource {
  baseDir: string
  context: CommitContext
  match(re?: RegExp): GeckoDestinationFile[]
  read(path: string): GeckoFile
}
