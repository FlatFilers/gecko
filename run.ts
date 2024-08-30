import { commit, printResolveSummary, resolve } from './src'
import { CommitContext } from './src/types/CommitContext'

async function main() {
  const { default: generate } = await import(
    process.cwd() + '/gecko.tsx'
  )
  const rootContext: CommitContext = {
    afterwardsPromises: [],
    committedFilePaths: new Set(),
    committedFiles: new Map(),
    documentedStack: [],
    fileFormatterStack: [],
    fileTemplateStack: [],
    partsByTagAndOrder: new Map(),
    requiredFilePaths: new Set(),
    restart: false,
    restartFiles: new Set(),
  }
  commit(
    await resolve(rootContext, await generate()),
    rootContext
  )
}

main()
  .catch((e) => globalThis.console.error(e))
  .then(printResolveSummary)
