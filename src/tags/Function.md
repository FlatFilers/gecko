A function. May be exported as default with `export="default"` or exported as named with `export name="myFunctionName"`.

A `name` is required when exporting as named, ok to omit `name` with `export="default"` or for unexported, anonymous functions.

Example:

```tsx
<Function name="myFunctionName" export="default">
  <Text>console.log('Hello world')</Text>
</Function>
```

Produces:

```ts
export default function myFunctionName() {
  console.log('Hello world')
}
```

Example:

```tsx
<Documented formats={[DocumentationFormat.JSDoc]}>
  <File name="greet.ts">
    <Function
      export
      async
      name="greetSlowly"
      arguments={['name: string']}
      returnType="Promise<void>"
    >
      <Text>await new Promise(r => setTimeout(r, 1000))</Text>
      <Text>console.log(`Hello ${name}`)</Text>
    </Function>
  </File>
</Documented>
```

Produces the following `greet.ts` file:

```ts
/**
 * @param {string} name
 * @returns {Promise<void>}
 */
async function greetSlowly(name: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 1000))
  console.log(`Hello ${name}`)
}
```
