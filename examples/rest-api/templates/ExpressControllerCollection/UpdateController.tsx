import { File, Text, geckoJSX } from '@flatfile/gecko'
export function UpdateController(props: {
  resourceName: string
  repositoryType: string
  repositoryTypeImport: string
}) {
  return (
    <File name="update.ts">
      <Text>
        {`import { Request, Response } from 'express'
import { ${props.repositoryType} } from '${props.repositoryTypeImport}'

export default function(repository: ${props.repositoryType}) {
  return async (req: Request, res: Response) => {
    const id = req.params.id
    const data = req.body
    try {
      const item = await repository.update${props.resourceName}(id, data)
      res.status(200).json(item)
    } catch (error) {
      res.status(404).json({ error: 'Item not found' })
    }
  }
}`}
      </Text>
    </File>
  )
}
