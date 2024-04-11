import { geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'
import { ControllerTestFile } from '../ControllerTestFile'

export function GetUserTestFile(props: {
  resourceName: string
  resourceUrl: string
  schema: JSONSchemaType<any>
}) {
  return (
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
  )
}
