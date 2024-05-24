import {
  File,
  Function,
  Import,
  Text,
  geckoJSX,
} from '@flatfile/gecko'

export function ListController(props: {
  resourceName: string
  repositoryType: string
  repositoryTypeImport: string
}) {
  return (
    <File name="list.ts">
      <Import
        named={['Request', 'Response']}
        from="express"
      />
      <Import
        named={[props.repositoryType]}
        from={props.repositoryTypeImport}
      />
      <Function
        export="default"
        arguments={[`repository: ${props.repositoryType}`]}
        name=""
      >
        <Text>{`return async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 100
  const offset = Number(req.query.offset) || 0
  try {
    const items = await repository.getAll${props.resourceName}s(limit, offset)
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}`}</Text>
      </Function>
    </File>
  )
}
