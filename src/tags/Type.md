A TypeScript type.

Example:

```tsx
<Type export name="Digit">
  {
    "'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'"
  }
</Type>
```

Produces:

```js
export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
```

You can combine `<Type>` with `<Object type>` to create a named object type. Example:

```tsx
<Type export name="User">
  <Object type>
    <Property name="name" type="string" required />
  </Object>
</Type>
```

Produces:

```ts
export type User = {
  name: string
}
```
