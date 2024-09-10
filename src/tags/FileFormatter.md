### `<FileFormatter>`

The `<FileFormatter>` tag specifies a file formatter to apply to all matching files.

Currently, the only supported formatter is `"prettier"`. You may specify prettier options in a `.prettierrc` file at the root of the project, directly next to the `gecko.tsx` file.

Example:

```tsx
<FileFormatter
  formatter="prettier"
  match="*.{js,json,ts,yaml}"
>
  <File name="hello.ts">
    <Text>console.log('Hello world')</Text>
  </File>
</FileFormatter>
```

This `hello.ts` file will be formatted with [Prettier](https://prettier.io).
