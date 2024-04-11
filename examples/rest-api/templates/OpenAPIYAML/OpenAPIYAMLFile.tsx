import { File, Text, geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'
import { ExpressControllerCollectionOpenAPIYAML } from './ExpressControllerCollectionOpenAPIYAML'
import { ResourceSchemaYAML } from './ResourceSchemaYAML'

export function OpenAPIYAMLFile(props: {
  userSchema: JSONSchemaType<any>
}) {
  return (
    <File name="openapi.yaml">
      <Text>
        {`openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
  description: API for managing users

servers:
- url: http://localhost:3000
  description: Local development server

paths:`}
      </Text>
      <ExpressControllerCollectionOpenAPIYAML
        resourceName="User"
        schema={props.userSchema}
      />
      <Text>
        {`
components:
  schemas:`}
      </Text>
      <ResourceSchemaYAML
        resourceName="User"
        schema={props.userSchema}
      />
    </File>
  )
}
