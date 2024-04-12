import { Text, geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'

export function SchemaPropertiesToYAML(props: {
  schema: JSONSchemaType<any>
}) {
  return (
    <Text>
      {Object.entries(props.schema.properties || {})
        .map(
          ([propName, propSchema]: [string, any]) =>
            `        ${propName}:
          type: ${propSchema.type}${
            propSchema.format
              ? `
          format: ${propSchema.format}`
              : ''
          }`,
        )
        .join('\n')}
    </Text>
  )
}
