import { Text, geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'

export function RequiredPropertiesToYAML(props: {
  schema: JSONSchemaType<any>
}) {
  return (
    <Text>
      {props.schema.required?.map(
        (propName: string) => `        - ${propName}`
      )}
    </Text>
  )
}
