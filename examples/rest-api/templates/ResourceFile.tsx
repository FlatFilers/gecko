import {
  Class,
  File,
  Method,
  Text,
  geckoJSX,
} from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'

function getTypeScriptType(
  propSchema: JSONSchemaType<any>,
): string {
  const { type } = propSchema
  if (type === 'string') {
    return 'string'
  }
  if (type === 'number' || type === 'integer') {
    return 'number'
  }
  if (type === 'boolean') {
    return 'boolean'
  }
  if (type === 'array') {
    return 'any[]'
  }
  return 'any'
}

function PropertyDeclarations(props: {
  schema: JSONSchemaType<any>
}) {
  const { properties, required } = props.schema
  return (
    <>
      {Object.entries(properties || {}).map(
        ([propName, propSchema]) => (
          <Text>
            {`${propName}${
              required?.includes(propName) ? '' : '?'
            }: ${getTypeScriptType(
              propSchema as JSONSchemaType<any>,
            )}`}
          </Text>
        ),
      )}
    </>
  )
}

export function ResourceFile(props: {
  fileName: string
  resourceName: string
  resourceSchema: JSONSchemaType<any>
}) {
  return (
    <File name={`${props.fileName}.ts`}>
      <Class name={`${props.resourceName}Resource`} export>
        <PropertyDeclarations
          schema={props.resourceSchema}
        />
        <Method
          name="constructor"
          arguments={[
            `data: Partial<${props.resourceName}Resource>`,
          ]}
        >
          {`Object.assign(this, data)`}
        </Method>
      </Class>
    </File>
  )
}
