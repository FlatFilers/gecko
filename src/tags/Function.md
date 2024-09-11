A function. May be exported as default with `export="default"` or exported as named with `export name="myFunctionName"`.

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

The `<Function>` tag accepts the following properties:

- `name` (required): A string representing the name of the function.
- `arguments`: An optional array of strings representing the function's parameters.
- `async`: An optional boolean (true) to make the function asynchronous.
- `children`: Optional child elements representing the function's body.
- `export`: An optional boolean or string ('default') to specify if and how the function should be exported.
- `returnType`: An optional string specifying the function's return type.
- `typeArguments`: An optional array of strings representing generic type parameters.
- `undocumented`: An optional boolean (true) to indicate if the function should be skipped when documentation is generated with [`<Documented>`](./Documented.md).

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
