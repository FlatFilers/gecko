import { Folder, geckoJSX } from '@flatfile/gecko'

import { JSONSchemaType } from 'ajv'
import { CreateController } from './CreateController'
import { DeleteController } from './DeleteController'
import { GetController } from './GetController'
import { ListController } from './ListController'
import { UpdateController } from './UpdateController'

export function ExpressControllerCollectionFolder(props: {
  name: string
  resourceName: string
  repositoryType: string
  repositoryTypeImport: string
  resourceSchema: JSONSchemaType<any>
}) {
  return (
    <Folder name={props.name}>
      <GetController {...props} />
      <CreateController {...props} />
      <UpdateController {...props} />
      <DeleteController {...props} />
      <ListController {...props} />
    </Folder>
  )
}
