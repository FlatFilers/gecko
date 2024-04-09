import { File, Text, geckoJSX } from '@flatfile/gecko'

export function ListController(props: {
  resourceName: string
  repositoryType: string
  repositoryTypeImport: string
}) {
  return (
    <File name="list.ts">
      <Text>
        {`import { Request, Response } from 'express'
import { ${props.repositoryType} } from '${props.repositoryTypeImport}'

export default function(repository: ${props.repositoryType}) {
  return async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 100
    const offset = Number(req.query.offset) || 0
    try {
      const items = await repository.getAll${props.resourceName}s(limit, offset)
      res.status(200).json(items)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}`}
      </Text>
    </File>
  )
}
