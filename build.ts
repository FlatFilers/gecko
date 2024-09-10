import { AllTags } from './src'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

async function build() {
  const tagDocs = await Promise.all(
    Object.keys(AllTags).map(async (tag) => {
      const filePath = path.join('./src/tags', `${tag}.md`)
      try {
        const doc = (
          await readFile(filePath, 'utf-8')
        ).replace(
          /\(\.\/([^.]+)\.md\)/g,
          (_, tag) => `(#${tag.toLowerCase()})`
        )
        return `<a name="${tag.toLowerCase()}"> </a>
[↥ Table of Contents](#table-of-contents)
${doc}`
      } catch (error) {
        console.error(
          `Error reading file for tag ${tag}:`,
          error
        )
        return ''
      }
    })
  )

  const combinedDocs = `
# Gecko Tag Reference


## Table of Contents

<a name="table-of-contents"> </a>

${Object.keys(AllTags)
  .map((tag) => `- [${tag}](#${tag.toLowerCase()})`)
  .join('\n')}

${tagDocs.join('\n\n')}
  `

  try {
    await writeFile('TAGS.md', combinedDocs, 'utf-8')
    console.log('TAGS.md has been successfully created.')
  } catch (error) {
    console.error('Error writing TAGS.md:', error)
  }
}

build().catch((e) => console.error(e))
