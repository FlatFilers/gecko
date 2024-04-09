import { File, Text, geckoJSX } from '@flatfile/gecko'
export function CreateController(props: {
  resourceName: string
  repositoryType: string
  repositoryTypeImport: string
}) {
  return (
    <File name="create.ts">
      <Text>
        {`import { Request, Response } from 'express'
import { ${props.repositoryType} } from '${props.repositoryTypeImport}'

export default function(repository: ${props.repositoryType}) {
  return async (req: Request, res: Response) => {
    const data = req.body
    try {
      const item = await repository.create${props.resourceName}(data)
      res.status(201).json(item)
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' })
    }
  }
}`}
      </Text>
    </File>
  )
}
