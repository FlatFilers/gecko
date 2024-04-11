import { geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'
import { ControllerTestFile } from '../ControllerTestFile'

export function ListUsersTestFile(props: {
  resourceName: string
  resourceUrl: string
  schema: JSONSchemaType<any>
}) {
  return (
    <ControllerTestFile
      resourceName={props.resourceName}
      resourceUrl={props.resourceUrl}
      httpMethod="get"
      testFileName="listUsers"
      testCases={[
        {
          name: 'should return an empty array when no users exist',
          setUp: { users: [] },
          expectedStatus: 200,
          expectedResponseJson: [],
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
  )
}
