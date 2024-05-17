import {
  Class,
  File,
  Import,
  Method,
  Property,
  Text,
  geckoJSX,
} from '@flatfile/gecko'

export function RepositoryFile(props: {
  fileName: string
  resourceName: string
  resourceNamePlural: string
  resourceClassImport: string
  resourceClassName: string
}) {
  return (
    <File name={`${props.fileName}.ts`}>
      <Text>
        <Import
          named={[props.resourceClassName]}
          from={props.resourceClassImport}
        />
        <Text />
        {`interface DataSource<Model> {
  select(limit: number, offset: number, where?: Partial<Model>): Promise<Model[]>
  insert(data: Omit<Model, 'id'>): Promise<string>
  update(id: string, data: Partial<Omit<Model, 'id'>>): Promise<void>
  delete(id: string): Promise<boolean>
}
`}
      </Text>
      <Class
        name={`${props.resourceName}Repository`}
        export
      >
        <Property
          private
          name="dataSource"
          type={`DataSource<${props.resourceClassName}>`}
        />
        <Method
          name="constructor"
          arguments={[
            `dataSource: DataSource<${props.resourceClassName}>`,
          ]}
        >
          {'this.dataSource = dataSource'}
        </Method>
        <Method
          name={`get${props.resourceName}ById`}
          async
          arguments={['id: string']}
        >
          {`const data = await this.dataSource.select(1, 0, { id })
if (data.length !== 1) {
  return null
}
return new ${props.resourceClassName}(data[0])`}
        </Method>
        <Method
          name={`getAll${props.resourceNamePlural}`}
          async
          arguments={[
            'limit: number = 100',
            'offset: number = 0',
          ]}
        >
          {`const data = await this.dataSource.select(limit, offset)
return data.map(item => new ${props.resourceClassName}(item))`}
        </Method>
        <Method
          name={`update${props.resourceName}`}
          async
          arguments={[
            'id: string',
            `data: Partial<${props.resourceClassName}>`,
          ]}
        >
          {`await this.dataSource.update(id, data)
return this.get${props.resourceName}ById(id)`}
        </Method>
        <Method
          name={`create${props.resourceName}`}
          async
          arguments={[`data: ${props.resourceClassName}`]}
        >
          {`const id = await this.dataSource.insert(data)
return this.get${props.resourceName}ById(id)`}
        </Method>
        <Method
          name={`delete${props.resourceName}`}
          async
          arguments={['id: string']}
        >
          {`return this.dataSource.delete(id)`}
        </Method>
      </Class>
    </File>
  )
}
