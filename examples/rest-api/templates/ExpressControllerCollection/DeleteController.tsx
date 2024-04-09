import { File, Text, geckoJSX } from '@flatfile/gecko'

export function DeleteController(props: {
  resourceName: string
  repositoryType: string
  repositoryTypeImport: string
}) {
  return (
    <File name="delete.ts">
      <Text>
        {`import { Request, Response } from 'express'
import { ${props.repositoryType} } from '${props.repositoryTypeImport}'

export default function(repository: ${props.repositoryType}) {
  return async (req: Request, res: Response) => {
    const id = req.params.id
    try {
      await repository.delete${props.resourceName}(id)
      res.status(204).send()
    } catch (error) {
      res.status(404).json({ error: 'Item not found' })
    }
  }
}`}
      </Text>
    </File>
  )
}
