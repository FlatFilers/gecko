import { AllTags } from '../src'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { extractInterfaceProps } from './lib/extractInterfaceProps'
import { interfaceMarkdownTable } from './lib/interfaceMarkdownTable'

async function build() {
  const tagDocs = await Promise.all(
    Object.keys(AllTags).map(async (tag) => {
      const docFilePath = path.join(
        './src/tags',
        `${tag}.md`
      )
      const sourceFilePath = path.join(
        './src/tags',
        `${tag}.ts`
      )
      try {
        const docFileContent = await readFile(
          docFilePath,
          'utf-8'
        )

        const interfaceProps = extractInterfaceProps(
          sourceFilePath,
          `${tag}Props`
        )

        const interfacePropsRequired = Object.fromEntries(
          Object.entries(interfaceProps).filter(
            ([_, value]) => value.required
          )
        )

        const interfacePropsOptional = Object.fromEntries(
          Object.entries(interfaceProps).filter(
            ([_, value]) => !value.required
          )
        )

        const requiredPropsDoc = interfaceMarkdownTable(
          interfacePropsRequired
        )

        const optionalPropsDoc = interfaceMarkdownTable(
          interfacePropsOptional
        )

        const requiredPropsSection = Object.keys(
          interfacePropsRequired
        ).length
          ? `### Required Props

${requiredPropsDoc}`
          : ''

        const optionalPropsSection = Object.keys(
          interfacePropsOptional
        ).length
          ? `### Optional Props

${optionalPropsDoc}`
          : ''

        const doc = docFileContent.replace(
          /\(\.\/([^.]+)\.md\)/g,
          (_, tag) => `(#${tag.toLowerCase()})`
        )
        return `<a name="${tag.toLowerCase()}"> </a>
[↥ Table of Contents](#table-of-contents)
### \`<${tag}>\`
${requiredPropsSection}
${optionalPropsSection}
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

### Gecko Tags
${Object.keys(AllTags)
  .map((tag) => `- [${tag}](#${tag.toLowerCase()})`)
  .join('\n')}

## Tag Reference

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
