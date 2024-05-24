import {
  File,
  Function,
  Import,
  Text,
  geckoJSX,
} from '@flatfile/gecko'

export function DeleteController(props: {
  resourceName: string
  repositoryType: string
  repositoryTypeImport: string
}) {
  return (
    <File name="delete.ts">
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
  const id = req.params.id
  try {
    const deleted = await repository.delete${props.resourceName}(id)
    if (deleted) {
      res.status(204).send()
    }
    else {
      res.status(404).json({ error: 'Item not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unknown error' })
  }
}`}</Text>
      </Function>
    </File>
  )
}
