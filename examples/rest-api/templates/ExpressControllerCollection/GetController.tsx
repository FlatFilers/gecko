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
