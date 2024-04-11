import { File, Text, geckoJSX } from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'
export function UpdateController(props: {
  resourceName: string
  repositoryType: string
  repositoryTypeImport: string
  resourceSchema: JSONSchemaType<any>
}) {
  return (
    <File name="update.ts">
      <Text>
        {`import Ajv from 'ajv'`}
        {`import addFormats from 'ajv-formats'`}
        {`import { Request, Response } from 'express'
import { ${props.repositoryType} } from '${
          props.repositoryTypeImport
        }'

const resourceSchema = ${JSON.stringify(
          props.resourceSchema
        )}
const ajv = new Ajv()
addFormats(ajv)
const validate = ajv.compile<any>(resourceSchema)

export default function(repository: ${
          props.repositoryType
        }) {
  return async (req: Request, res: Response) => {
    const id = req.params.id
    const data = req.body
    try {
      const existingItem = await repository.get${
        props.resourceName
      }ById(id)
      if (existingItem === null) {
        res.status(404).json({ error: 'Item not found' })
        return
      }
      // apply changes and validate
      Object.assign(existingItem, data)
      const isValid = validate(existingItem)
      if (!isValid) {
        res.status(400).json({ errors: validate.errors })
        return
      }
      const item = await repository.update${
        props.resourceName
      }(id, data)
      res.status(200).json(item)
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
