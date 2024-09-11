The `<Documented>` tag is used to specify the automated documentation format for the generated code.

Currently, the only supported documentation format is JSDoc.

Example:

```tsx
<Documented formats={[DocumentationFormat.JSDoc]}>
  <File name="hello.ts">
    <Text>{`
function greet(name: string) {
  console.log(\`Hello \${name}\`)
}`}</Text>
  </File>
</Documented>
```

The functions within the generated `hello.ts` file will be decorated with JSDoc comments:

```ts
/**
 * @param {string} name
 * @returns {void}
 */
function greet(name: string) {
  console.log('Hello ${name}')
}
```
