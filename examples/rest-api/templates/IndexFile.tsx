import { File, Text, geckoJSX } from '@flatfile/gecko'

export function IndexFile() {
  return (
    <File name="index.ts">
      <Text>import express from 'express'</Text>
      <Text>const app = express()</Text>
      <Text>app.use(express.json())</Text>
      <Text>{`import { UserRepository } from './repositories/user'`}</Text>
      <Text>
        {`const userRepo = new UserRepository({
async select(limit, offset, where) {
return [ {id: '1', name: 'Test user', email: 'test@example.com' } ]
},
async insert(data) {
return '1'
},
async update(id, data) {
// no op
},
async delete(id) {
return true
}
})`}
      </Text>
      <Text>{`import ListUsersController from './controllers/users/list'`}</Text>
      <Text>
        app.get('/users', ListUsersController(userRepo))
      </Text>
      <Text>{`import CreateUserController from './controllers/users/create'`}</Text>
      <Text>
        app.post('/users', CreateUserController(userRepo))
      </Text>
      <Text>{`import UpdateUserController from './controllers/users/update'`}</Text>
      <Text>
        app.put('/users/:id',
        UpdateUserController(userRepo))
      </Text>
      <Text>{`import DeleteUserController from './controllers/users/delete'`}</Text>
      <Text>
        app.delete('/users/:id',
        DeleteUserController(userRepo))
      </Text>
      <Text>{`import GetUserController from './controllers/users/get'`}</Text>
      <Text>
        app.get('/users/:id', GetUserController(userRepo))
      </Text>
      <Text>{`app.listen(3000, () => { console.log('Server is running on port 3000') })`}</Text>
    </File>
  )
}
