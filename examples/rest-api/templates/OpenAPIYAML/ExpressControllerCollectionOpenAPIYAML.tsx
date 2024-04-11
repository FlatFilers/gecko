import { Text, geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'

export function ExpressControllerCollectionOpenAPIYAML(props: {
  resourceName: string
  schema: JSONSchemaType<any>
}) {
  return (
    <>
      <Text>
        {`  /${props.resourceName.toLowerCase()}s:
    get:
      summary: List all ${props.resourceName.toLowerCase()}s
      responses:
        '200':
          description: Successful response
          content:
            application/json:    
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/${
                    props.resourceName
                  }'
    post:
      summary: Create a new ${props.resourceName.toLowerCase()}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/${
                props.resourceName
              }Create'
      responses:
        '201':
          description: ${
            props.resourceName
          } created successfully
          content:
            application/json:    
              schema:
                $ref: '#/components/schemas/${
                  props.resourceName
                }'
        '400':
          description: Invalid request body
  /${props.resourceName.toLowerCase()}s/{${props.resourceName.toLowerCase()}Id}:
    get:
      summary: Get a ${props.resourceName.toLowerCase()} by ID
      parameters:
        - in: path
          name: ${props.resourceName.toLowerCase()}Id
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/${
                  props.resourceName
                }'
        '404':
          description: ${props.resourceName} not found
    put:
      summary: Update a ${props.resourceName.toLowerCase()}
      parameters:
        - in: path
          name: ${props.resourceName.toLowerCase()}Id
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/${
                props.resourceName
              }Update'
      responses:
        '200':
          description: ${
            props.resourceName
          } updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/${
                  props.resourceName
                }'
        '404':
          description: ${props.resourceName} not found
    delete:
      summary: Delete a ${props.resourceName.toLowerCase()}
      parameters:
        - in: path
          name: ${props.resourceName.toLowerCase()}Id
          required: true
          schema:
            type: string
      responses:
        '204':
          description: ${
            props.resourceName
          } deleted successfully
        '404':
          description: ${props.resourceName} not found`}
      </Text>
    </>
  )
}
