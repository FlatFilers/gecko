### `<Variable>`

A variable.

Example:

```tsx
<>
  <Variable export name="title" type="string">
    {"'My Title'"}
  </Variable>
  <Variable export mutable name="count" type="number">
    4
  </Variable>
</>
```

Produces:

```js
export const title = 'My Title'
export let count = 4
```
