import Ajv, { JSONSchemaType } from 'ajv'
import userSchema from './project/src/models/user.json'
const ajv = new Ajv()

import {
  File,
  Folder,
  geckoJSX,
  Root,
  Text,
} from '@flatfile/gecko'
import { ExpressControllerCollectionFolder } from './templates/ExpressControllerCollectionFolder.tsx'
import { RepositoryFile } from './templates/RepositoryFile.tsx'
import { ResourceFile } from './templates/ResourceFile.tsx'

function validateJSONSchema7(
  schema: any
): schema is JSONSchemaType<any> {
  if (
    schema.$schema !==
    'http://json-schema.org/draft-07/schema#'
  ) {
    return false
  }
  const result = ajv.validateSchema(schema, true)
  return result === true
}

function getValidatedSchema(
  schema: any
): JSONSchemaType<any> {
  const isValid = validateJSONSchema7(schema)
  if (!isValid) {
    throw new Error('schema is invalid')
  }
  return schema
}

const validatedUserSchema = getValidatedSchema(userSchema)

export default function () {
  return (
    <Root path="project/src/gecko_generated" erase>
      <Folder name="controllers">
        <ExpressControllerCollectionFolder
          name="users"
          schema={validatedUserSchema}
        />
      </Folder>
      <Folder name="resources">
        <ResourceFile
          name="user"
          schema={validatedUserSchema}
        />
      </Folder>
      <Folder name="repositories">
        <RepositoryFile
          name="users"
          resourceClassImport="../resources/user.ts"
          resourceClassName="UserResource"
          schema={validatedUserSchema}
        />
      </Folder>
      <File name="index.ts">
        <Text>import express from 'express'</Text>
        <Text>const app = express()</Text>
      </File>
      <File name="openapi.yaml">test</File>
    </Root>
  )
}
