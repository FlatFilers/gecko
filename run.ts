import { commit, printResolveSummary, resolve } from './src'

async function main() {
  const { default: generate } = await import(
    process.cwd() + '/gecko.tsx'
  )
  commit(await resolve(await generate()))
}

main()
  .catch((e) => globalThis.console.error(e))
  .then(printResolveSummary)
