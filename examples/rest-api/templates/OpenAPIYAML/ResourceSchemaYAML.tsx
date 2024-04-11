import { Text, geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'
import { RequiredPropertiesToYAML } from './RequiredPropertiesToYAML'
import { SchemaPropertiesToYAML } from './SchemaPropertiesToYAML'
export function ResourceSchemaYAML(props: {
  resourceName: string
  schema: JSONSchemaType<any>
}) {
  return (
    <>
      <Text>
        {`    ${props.resourceName}:
      type: object
      properties:`}
      </Text>
      <SchemaPropertiesToYAML schema={props.schema} />
      <Text>{`      required:`}</Text>
      <RequiredPropertiesToYAML schema={props.schema} />
      <Text>
        {`    ${props.resourceName}Create:
      type: object
      properties:`}
      </Text>
      <SchemaPropertiesToYAML schema={props.schema} />
      <Text>{`      required:`}</Text>
      <RequiredPropertiesToYAML schema={props.schema} />
      <Text>
        {`    ${props.resourceName}Update:
      type: object
      properties:`}
      </Text>
      <SchemaPropertiesToYAML schema={props.schema} />
      <Text />
    </>
  )
}
