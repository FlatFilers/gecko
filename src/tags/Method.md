A class method. May only be used inside of a `<Class>` element.

Example:

```tsx
<Class name="User">
  <Method
    name="getUser"
    async
    arguments={['id: string']}
    returnType="Promise<User>"
  >
    {'// implementation here'}
  </Method>
</Class>
```

Produces:

```ts
class User {
  async getUser(id: string): Promise<User> {
    // implementation here
  }
}
```
