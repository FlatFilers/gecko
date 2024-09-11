Plain text to be written to a file. Adjacent `<Text>` or `<Function>` tags within a `<File>` are separated by a new line.

Example:

```tsx
<File name="index.ts">
  <Text>{'export class User {'}</Text>
  <Text>{'  constructor() { }'}</Text>
  <Text>{'}'}</Text>
</File>
```

Produces:

```ts
export class User {
  constructor() {}
}
```
