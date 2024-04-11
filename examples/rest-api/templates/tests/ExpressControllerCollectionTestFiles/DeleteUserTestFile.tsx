import { geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'
import { ControllerTestFile } from '../ControllerTestFile'

export function DeleteUserTestFile(props: {
  resourceName: string
  resourceUrl: string
  schema: JSONSchemaType<any>
}) {
  return (
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
  )
}
