import {
  File,
  Function,
  Import,
  Text,
  geckoJSX,
} from '@flatfile/gecko'
import { JSONSchemaType } from 'ajv'
export function CreateController(props: {
  resourceName: string
  repositoryType: string
  repositoryTypeImport: string
  resourceSchema: JSONSchemaType<any>
}) {
  return (
    <File name="create.ts">
      <Import default="Ajv" from="ajv" />
      <Import default="addFormats" from="ajv-formats" />
      <Import
        named={['Request', 'Response']}
        from="express"
      />
      <Import
        named={[props.repositoryType]}
        from={props.repositoryTypeImport}
      />
      <Text>
        {`
// when creating an item, we must first remove the id property
// before validating the incoming data
const createSchema = ${JSON.stringify(props.resourceSchema)}
delete (createSchema.properties as any).id
createSchema.required =
  createSchema.required.filter(x => x !== 'id')

const ajv = new Ajv()
addFormats(ajv)
const validate = ajv.compile<any>(createSchema)`}
      </Text>
      <Function
        export="default"
        name=""
        arguments={[`repository: ${props.repositoryType}`]}
      >
        <Text>{`return async (req: Request, res: Response) => {
    const data = req.body
    const isValid = validate(data)
    if (!isValid) {
      res.status(400).json({ errors: validate.errors })
      return
    }
    try {
      const item = await repository.create${props.resourceName}(data)
      res.status(201).json(item)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Unknown error' })
    }
  }`}</Text>
      </Function>
    </File>
  )
}
