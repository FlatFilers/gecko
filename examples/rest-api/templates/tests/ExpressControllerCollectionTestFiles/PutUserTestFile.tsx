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
          name: 'should return 400 with invalid name',
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
            name: '',
            email: 'updated@example.com',
          },
          expectedStatus: 400,
          expectedResponseJson: {
            errors: [
              {
                instancePath: '/name',
                keyword: 'minLength',
                message:
                  'must NOT have fewer than 1 characters',
                params: {
                  limit: 1,
                },
                schemaPath: '#/properties/name/minLength',
              },
            ],
          },
        },
        {
          name: 'should return 400 with invalid email',
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
            email: 'updated-example.com',
          },
          expectedStatus: 400,
          expectedResponseJson: {
            errors: [
              {
                instancePath: '/email',
                keyword: 'format',
                message: 'must match format "email"',
                params: {
                  format: 'email',
                },
                schemaPath: '#/properties/email/format',
              },
            ],
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
