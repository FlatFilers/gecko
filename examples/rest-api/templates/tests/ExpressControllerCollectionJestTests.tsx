import { File, geckoJSX, Text } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'
import { DeleteUserTestFile } from './ExpressControllerCollectionTestFiles/DeleteUserTestFile'
import { GetUserTestFile } from './ExpressControllerCollectionTestFiles/GetUserTestFile'
import { ListUsersTestFile } from './ExpressControllerCollectionTestFiles/ListUsersTestFile'
import { PostUserTestFile } from './ExpressControllerCollectionTestFiles/PostUserTestFile'
import { PutUserTestFile } from './ExpressControllerCollectionTestFiles/PutUserTestFile'

export function ExpressControllerCollectionJestTests(props: {
  resourceName: string
  resourceUrl: string
  schema: JSONSchemaType<any>
}) {
  return (
    <>
      <File name="jest.setup.js">
        <Text>
          {`const fs = require('fs')
const path = require('path')

globalThis.inTest = true

globalThis.usersJsonPath = path.join(__dirname, 'users.test.json')

global.beforeEach(() => {
  fs.writeFileSync(globalThis.usersJsonPath, '[]')
})`}
        </Text>
      </File>
      <ListUsersTestFile {...props} />
      <PostUserTestFile {...props} />
      <GetUserTestFile {...props} />
      <PutUserTestFile {...props} />
      <DeleteUserTestFile {...props} />
    </>
  )
}
