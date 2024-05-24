import {
  File,
  Function,
  Import,
  Text,
  geckoJSX,
} from '@flatfile/gecko'
export function GetController(props: {
  resourceName: string
  repositoryType: string
  repositoryTypeImport: string
}) {
  return (
    <File name="get.ts">
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
        {`return async (req: Request, res: Response) => {
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
          }`}
      </Function>
    </File>
  )
}
