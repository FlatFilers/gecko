import Ajv, { JSONSchemaType } from 'ajv'
import userSchema from './project/src/models/user.json'
const ajv = new Ajv()

import {
  FileFormatter,
  Folder,
  geckoJSX,
  Root,
} from '@flatfile/gecko'
import { ExpressControllerCollectionFolder } from './templates/ExpressControllerCollection/ExpressControllerCollectionFolder.tsx'
import { IndexFile } from './templates/IndexFile.tsx'
import { OpenAPIYAMLFile } from './templates/OpenAPIYAML/OpenAPIYAMLFile.tsx'
import { RepositoryFile } from './templates/RepositoryFile.tsx'
import { ResourceFile } from './templates/ResourceFile.tsx'
import { ExpressControllerCollectionJestTests } from './templates/tests/ExpressControllerCollectionJestTests.tsx'

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
      <FileFormatter
        formatter="prettier"
        match="*.{js,json,ts}"
      >
        <Folder name="controllers">
          <ExpressControllerCollectionFolder
            name="users"
            repositoryType="UserRepository"
            repositoryTypeImport="../../repositories/user"
            resourceName="User"
            resourceSchema={validatedUserSchema}
          />
        </Folder>
        <Folder name="resources">
          <ResourceFile
            fileName="user"
            resourceName="User"
            resourceSchema={validatedUserSchema}
          />
        </Folder>
        <Folder name="repositories">
          <RepositoryFile
            fileName="user"
            resourceClassImport="../resources/user.ts"
            resourceClassName="UserResource"
            resourceName="User"
            resourceNamePlural="Users"
          />
        </Folder>
        <IndexFile />
        <Folder name="tests">
          <ExpressControllerCollectionJestTests
            resourceName="User"
            resourceUrl="/users"
            schema={validatedUserSchema}
          />
        </Folder>
        <OpenAPIYAMLFile userSchema={validatedUserSchema} />
      </FileFormatter>
    </Root>
  )
}
