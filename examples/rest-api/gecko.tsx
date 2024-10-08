import Ajv, { JSONSchemaType } from 'ajv'
import userSchema from './project/src/models/user.json'
const ajv = new Ajv()

import {
  DocumentationFormat,
  Documented,
  FileFormatter,
  FileTemplate,
  Folder,
  geckoJSX,
  GeckoStatusFile,
  Root,
  TemplateMatch,
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

const tsFileTemplate: TemplateMatch = {
  match: '*.ts',
  template: `/**
 * {{filename}} generated by Gecko
 * {{timestamp}}
 */
{{body}}`,
}

export default function () {
  return (
    <Root path="project/src/gecko_generated" erase>
      <Folder name="../../..">
        <GeckoStatusFile />
      </Folder>
      <FileFormatter
        formatter="prettier"
        match="*.{js,json,ts,yaml}"
      >
        <FileTemplate templates={[tsFileTemplate]}>
          <Documented formats={[DocumentationFormat.JSDoc]}>
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
                resourceClassImport="../resources/user"
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
            <OpenAPIYAMLFile
              userSchema={validatedUserSchema}
            />
          </Documented>
        </FileTemplate>
      </FileFormatter>
    </Root>
  )
}
