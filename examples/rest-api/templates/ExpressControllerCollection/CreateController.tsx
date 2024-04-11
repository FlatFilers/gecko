import { File, Text, geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'
export function CreateController(props: {
  resourceName: string
  repositoryType: string
  repositoryTypeImport: string
  resourceSchema: JSONSchemaType<any>
}) {
  return (
    <File name="create.ts">
      <Text>
        {`import Ajv from 'ajv'`}
        {`import addFormats from 'ajv-formats'`}
        {`import { Request, Response } from 'express'
import { ${props.repositoryType} } from '${
          props.repositoryTypeImport
        }'
// when creating an item, we must first remove the id property
// before validating the incoming data
const createSchema = ${JSON.stringify(props.resourceSchema)}
delete (createSchema.properties as any).id
createSchema.required =
  createSchema.required.filter(x => x !== 'id')

const ajv = new Ajv()
addFormats(ajv)
const validate = ajv.compile<any>(createSchema)

export default function(repository: ${
          props.repositoryType
        }) {
  return async (req: Request, res: Response) => {
    const data = req.body
    const isValid = validate(data)
    if (!isValid) {
      res.status(400).json({ errors: validate.errors })
      return
    }
    try {
      const item = await repository.create${
        props.resourceName
      }(data)
      res.status(201).json(item)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Unknown error' })
    }
  }
}`}
      </Text>
    </File>
  )
}
