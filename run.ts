import {
  commit,
  printResolveSummary,
  resolve,
} from '@flatfile/gecko'

async function main() {
  const { default: generate } = await import(
    process.cwd() + '/gecko.tsx'
  )
  commit(await resolve(generate()))
}

main()
  .catch((e) => globalThis.console.error(e))
  .then(printResolveSummary)
