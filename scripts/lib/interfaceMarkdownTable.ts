export function interfaceMarkdownTable(
  interfaceProps: Record<string, any>
) {
  const tableHeader =
    '| Name | Type |\n| -------- | -------- |\n'
  return (
    tableHeader +
    Object.entries(interfaceProps)
      .map(([key, value]) => {
        return `| \`${key}\` | \`${value.type.replace(/\|/g, '\\|')}\` |`
      })
      .join('\n')
  )
}
