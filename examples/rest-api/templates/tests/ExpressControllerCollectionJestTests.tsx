import { File, geckoJSX, Text } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'
import { ControllerTestFile } from './ControllerTestFile'

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
      <ControllerTestFile
        resourceName={props.resourceName}
        resourceUrl={props.resourceUrl}
        httpMethod="get"
        testCases={[
          {
            name: 'should return an empty array when no users exist',
            setUp: { users: [] },
            expectedStatus: 200,
            expectedResponseJson: '[]',
          },
          {
            name: 'should return an array of users when users exist',
            setUp: {
              users: [
                {
                  id: '1',
                  name: 'John Doe',
                  email: 'john@example.com',
                },
                {
                  id: '2',
                  name: 'Jane Smith',
                  email: 'jane@example.com',
                },
              ],
            },
            expectedStatus: 200,
            expectedResponseJson: [
              {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
              },
              {
                id: '2',
                name: 'Jane Smith',
                email: 'jane@example.com',
              },
            ],
          },
        ]}
      />
      <ControllerTestFile
        resourceName={props.resourceName}
        resourceUrl={props.resourceUrl}
        httpMethod="post"
        testCases={[
          {
            name: 'should create a new user',
            requestBodyJson: {
              name: 'John Doe',
              email: 'john@example.com',
            },
            expectedStatus: 201,
            expectedResponseJson: {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com',
            },
            setUp: { users: [] },
          },
          {
            name: 'should return 400 when email is missing',
            requestBodyJson: {
              name: 'John Doe',
            },
            expectedStatus: 400,
            expectedResponseJson: {
              error: 'missing email',
            },
          },
          {
            name: 'should return 400 when name is missing',
            requestBodyJson: {
              email: 'john@example.com',
            },
            expectedStatus: 400,
            expectedResponseJson: {
              error: 'missing name',
            },
          },
        ]}
      />
      <ControllerTestFile
        resourceName={props.resourceName}
        resourceUrl={`${props.resourceUrl}/:id`}
        httpMethod="get"
        testCases={[
          {
            name: 'should return 404 when user is not found',
            setUp: { users: [] },
            expectedStatus: 404,
          },
          {
            name: 'should return the user when user exists',
            setUp: {
              users: [
                {
                  id: '1',
                  name: 'John Doe',
                  email: 'john@example.com',
                },
              ],
            },
            expectedStatus: 200,
            expectedResponseJson: {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com',
            },
          },
        ]}
      />
      <ControllerTestFile
        resourceName={props.resourceName}
        resourceUrl={`${props.resourceUrl}/:id`}
        httpMethod="put"
        testCases={[
          {
            name: 'should update the user',
            setUp: {
              users: [
                {
                  id: '1',
                  name: 'John Doe',
                  email: 'john@example.com',
                },
              ],
            },
            requestBodyJson: {
              name: 'Updated Name',
              email: 'updated@example.com',
            },
            expectedStatus: 200,
            expectedResponseJson: {
              id: '1',
              name: 'Updated Name',
              email: 'updated@example.com',
            },
          },
          {
            name: 'should return 404 when user is not found',
            setUp: { users: [] },
            requestBodyJson: {
              name: 'Updated Name',
              email: 'updated@example.com',
            },
            expectedStatus: 404,
          },
        ]}
      />
      <ControllerTestFile
        resourceName={props.resourceName}
        resourceUrl={`${props.resourceUrl}/:id`}
        httpMethod="delete"
        testCases={[
          {
            name: 'should delete the user',
            setUp: {
              users: [
                {
                  id: '1',
                  name: 'John Doe',
                  email: 'john@example.com',
                },
              ],
            },
            expectedStatus: 204,
          },
          {
            name: 'should return 404 when user is not found',
            setUp: { users: [] },
            expectedStatus: 404,
          },
        ]}
      />
    </>
  )
}
