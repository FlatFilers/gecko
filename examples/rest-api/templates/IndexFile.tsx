import { File, Text, geckoJSX } from '@flatfile/gecko'
import { ExpressControllerCollectionRoutes } from './ExpressControllerCollection/ExpressControllerCollectionRoutes'

export function IndexFile() {
  return (
    <File name="index.ts">
      <Text>import express from 'express'</Text>
      <Text>{`import { join } from 'path'`}</Text>
      <Text>{`import { MockORM } from '../MockORM'`}</Text>
      <Text>{`import { UserRepository } from './repositories/user'`}</Text>
      <Text />
      <Text>export const app = express()</Text>
      <Text>app.use(express.json())</Text>
      <Text>
        {`
const usersJsonPath = globalThis.usersJsonPath
 ?? join(__dirname, 'users.json')

const userRepo = new UserRepository(
  new MockORM(usersJsonPath)
)
`}
      </Text>
      <ExpressControllerCollectionRoutes
        controllerPath="./controllers/users"
        resourceName="User"
        resourceNamePlural="Users"
        resourceUrl="/users"
        repositoryVariableName="userRepo"
      />
      <Text>
        {`if (!globalThis.inTest) {
  const port = process.env.PORT ?? 3000
  app.listen(port, () => {
    console.log(\`Server is running on port \${port}\`)
  })
}`}
      </Text>
      <Text />
    </File>
  )
}
