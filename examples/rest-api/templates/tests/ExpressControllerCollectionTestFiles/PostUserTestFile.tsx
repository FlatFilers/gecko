import { geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'
import { ControllerTestFile } from '../ControllerTestFile'

export function PostUserTestFile(props: {
  resourceName: string
  resourceUrl: string
  schema: JSONSchemaType<any>
}) {
  return (
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
          name: 'should return 400 when name is empty',
          requestBodyJson: {
            name: '',
            email: 'john@example.com',
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
          name: 'should return 400 when email is missing',
          requestBodyJson: {
            name: 'John Doe',
          },
          expectedStatus: 400,
          expectedResponseJson: {
            errors: [
              {
                instancePath: '',
                keyword: 'required',
                message:
                  "must have required property 'email'",
                params: {
                  missingProperty: 'email',
                },
                schemaPath: '#/required',
              },
            ],
          },
        },
        {
          name: 'should return 400 when email is invalid',
          requestBodyJson: {
            name: 'John Doe',
            email: 'john-example.com',
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
          name: 'should return 400 when name is missing',
          requestBodyJson: {
            email: 'john@example.com',
          },
          expectedStatus: 400,
          expectedResponseJson: {
            errors: [
              {
                instancePath: '',
                keyword: 'required',
                message:
                  "must have required property 'name'",
                params: {
                  missingProperty: 'name',
                },
                schemaPath: '#/required',
              },
            ],
          },
        },
      ]}
    />
  )
}
