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
    if (!data.name || data.name.length === 0) {
      res.status(400).json({ error: 'missing name' })
      return
    }
    if (!data.email || data.email.length === 0) {
      res.status(400).json({ error: 'missing email' })
      return
    }
    try {
      const item = await repository.create${props.resourceName}(data)
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
