import { DocumentedType } from './extractInterfaceProps'

export function interfaceMarkdownTable(
  interfaceProps: Record<string, DocumentedType>
) {
  const tableHeader =
    '| Name | Type | Description |\n| -------- | -------- | -------- |\n'
  return (
    tableHeader +
    Object.entries(interfaceProps)
      .map(([key, value]) => {
        return `| \`${key}\` | \`${value.type.replace(/\|/g, '\\|')}\` | ${value.description?.replace(/\|/g, '\\|') ?? ''} |`
      })
      .join('\n') +
    '\n'
  )
}
