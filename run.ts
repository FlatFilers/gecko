import { join } from 'path'
import { commit, printResolveSummary, resolve } from './src'
import { CommitContext } from './src/types/CommitContext'

async function main() {
  const workingDir = process.cwd(),
    rootDir = workingDir
  const { default: generate } = await import(
    join(workingDir, 'gecko.tsx')
  )
  const rootContext: CommitContext = {
    committedFilePaths: new Set(),
    committedFiles: new Map(),
    documentedStack: [],
    fileFormatterStack: [],
    fileTemplateStack: [],
    partsByTagAndOrder: new Map(),
    requiredFilePaths: new Set(),
    restart: false,
    restartFiles: new Set(),
    rootDir,
    workingDir,
  }
  await commit(
    await resolve(rootContext, await generate()),
    rootContext
  )
}

main()
  .catch((e) => {
    globalThis.console.error(e)
    process.exit(1)
  })
  .then(printResolveSummary)
