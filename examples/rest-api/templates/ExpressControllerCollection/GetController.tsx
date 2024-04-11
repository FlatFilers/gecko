import { File, Text, geckoJSX } from '@flatfile/gecko'
export function GetController(props: {
  resourceName: string
  repositoryType: string
  repositoryTypeImport: string
}) {
  return (
    <File name="get.ts">
      <Text>
        {`import { Request, Response } from 'express'
import { ${props.repositoryType} } from '${props.repositoryTypeImport}'

export default function(repository: ${props.repositoryType}) {
  return async (req: Request, res: Response) => {
    const id = req.params.id
    try {
      const item = await repository.get${props.resourceName}ById(id)
      if (item === null) {
        res.status(404).json({ error: 'Item not found' })
      }
      else {
        res.status(200).json(item)
      }
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
