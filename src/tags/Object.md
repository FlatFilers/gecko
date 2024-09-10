### `<Object>`

An object.

Example:

```tsx
<Object>
  <Property name="id">123</Property>
  <Property name="name">{"'John Doe'"}</Property>
  <Property name="email">
    {"'john.doe@example.com'"}
  </Property>
</Object>
```

Produces:

```js
{
  id: 123,
  name: 'John Doe',
  email: 'john.doe@example.com'
}
```
