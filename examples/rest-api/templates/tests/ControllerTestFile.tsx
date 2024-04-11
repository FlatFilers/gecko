import { File, geckoJSX, Text } from '@flatfile/gecko'

export function ControllerTestFile(props: {
  resourceName: string
  resourceUrl: string
  httpMethod: 'get' | 'post' | 'put' | 'delete'
  testCases: {
    name: string
    setUp?: { users: any[] }
    requestBodyJson?: any
    expectedStatus: number
    expectedResponseJson?: any
  }[]
}) {
  const fileName = `${props.httpMethod}${props.resourceName}.test.js`
  const testCases = props.testCases.map((testCase) => (
    <Text>
      {`test('${testCase.name}', async () => {
  ${
    testCase.setUp
      ? `setUsers(${JSON.stringify(testCase.setUp.users)})`
      : ''
  }
  const response = await request(app)
    .${props.httpMethod}('${props.resourceUrl.replace(
        ':id',
        '1'
      )}')
    ${
      testCase.requestBodyJson
        ? `.send(${JSON.stringify(
            testCase.requestBodyJson
          )})`
        : ''
    }
  expect(response.status).toBe(${testCase.expectedStatus})
  ${
    testCase.expectedResponseJson
      ? `expect(response.body).toEqual(${JSON.stringify(
          testCase.expectedResponseJson
        )})`
      : ''
  }
})`}
      <Text />
    </Text>
  ))

  return (
    <File name={fileName}>
      <Text>
        {`const request = require('supertest')
const fs = require('fs')
const path = require('path')
const { app } = require('../index.ts')

function setUsers(users) {
  fs.writeFileSync(
    globalThis.usersJsonPath,
    JSON.stringify(users, null, 2)
  )
}
`}
      </Text>
      {testCases}
    </File>
  )
}
