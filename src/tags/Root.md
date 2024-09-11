This tag should wrap all other tags used. It specifies the location of generated folders and files on disk with `path="path/to/generated/content"`. If the `erase` attribute is present, the folder path specified will be erased on each build. Use `erase` with extreme caution!

Note that `<Root>` will not output any code on its own. It is only used to specify the root path of the generated files. The `export default function () {}` in your project's `gecko.tsx` file must return a `<Root>` element.

Example:

```tsx
<Root path="src/types">
  <File name="index.ts">
    <Class export name="User" />
  </File>
</Root>
```

Produces the file `src/types/index.ts`:

```ts
export class User {}
```
