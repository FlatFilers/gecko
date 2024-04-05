import { File, geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'

export function ResourceFile(props: {
  name: string
  schema: JSONSchemaType<any>
}) {
  return (
    <File name={`${props.name}.ts`}>
      {`console.log("hello from ${props.name}.ts")`}
    </File>
  )
}
