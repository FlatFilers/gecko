import { geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'
import { ControllerTestFile } from '../ControllerTestFile'

export function PutUserTestFile(props: {
  resourceName: string
  resourceUrl: string
  schema: JSONSchemaType<any>
}) {
  return (
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
  )
}
