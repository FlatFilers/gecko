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
import { ExpressControllerCollectionFolder } from './templates/ExpressControllerCollection/ExpressControllerCollectionFolder.tsx'
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
          repositoryType="UserRepository"
          repositoryTypeImport="../../repositories/user"
          resourceName="User"
        />
      </Folder>
      <Folder name="resources">
        <ResourceFile
          fileName="user"
          resourceName="User"
          schema={validatedUserSchema}
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
      <File name="index.ts">
        <Text>import express from 'express'</Text>
        <Text>const app = express()</Text>
        <Text>app.use(express.json())</Text>
        <Text>{`import { UserRepository } from './repositories/user'`}</Text>
        <Text>
          {`const userRepo = new UserRepository({
  async select(limit, offset, where) {
    return [ {id: '1', name: 'Test user', email: 'test@example.com' } ]
  },
  async insert(data) {
    return '1'
  },
  async update(id, data) {
    // no op
  },
  async delete(id) {
    return true
  }
})`}
        </Text>
        <Text>{`import ListUsersController from './controllers/users/list'`}</Text>
        <Text>
          app.get('/users', ListUsersController(userRepo))
        </Text>
        <Text>{`import CreateUserController from './controllers/users/create'`}</Text>
        <Text>
          app.post('/users', CreateUserController(userRepo))
        </Text>
        <Text>{`import UpdateUserController from './controllers/users/update'`}</Text>
        <Text>
          app.put('/users/:id',
          UpdateUserController(userRepo))
        </Text>
        <Text>{`import DeleteUserController from './controllers/users/delete'`}</Text>
        <Text>
          app.delete('/users/:id',
          DeleteUserController(userRepo))
        </Text>
        <Text>{`import GetUserController from './controllers/users/get'`}</Text>
        <Text>
          app.get('/users/:id', GetUserController(userRepo))
        </Text>
        <Text>{`app.listen(3000, () => { console.log('Server is running on port 3000') })`}</Text>
      </File>
      <File name="openapi.yaml">test</File>
    </Root>
  )
}
