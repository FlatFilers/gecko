import { File, Text, geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'

export function RepositoryFile(props: {
  name: string
  resourceClassImport: string
  resourceClassName: string
  schema: JSONSchemaType<any>
}) {
  return (
    <File name={`${props.name}.ts`}>
      <Text>
        {`console.log("hello from ${props.name}.ts")`}
      </Text>
    </File>
  )
}
