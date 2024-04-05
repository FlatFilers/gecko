import {
  File,
  Folder,
  Text,
  geckoJSX,
} from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'

export function ExpressControllerCollectionFolder(props: {
  name: string
  schema: JSONSchemaType<any>
}) {
  return (
    <Folder name={props.name}>
      <File name="get.ts">
        <Text>console.log("hello from get.ts")</Text>
      </File>
      <File name="create.ts">
        <Text>console.log("hello from create.ts")</Text>
      </File>
      <File name="update.ts">
        <Text>console.log("hello from update.ts")</Text>
      </File>
      <File name="delete.ts">
        <Text>console.log("hello from delete.ts")</Text>
      </File>
      <File name="list.ts">
        <Text>console.log("hello from list.ts")</Text>
      </File>
    </Folder>
  )
}
