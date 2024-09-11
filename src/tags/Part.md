A part to be later collected by a [`<Collect>`](./Collect.md) tag.

Example:

```tsx
<Part tag="example">A</Part>
<Part tag="example">B</Part>
<Part tag="example">C</Part>
<File name="parts.ts">
  <Collect tag="example" />
</File>
```

Produces a `parts.ts` file with content:

```
A
B
C
```
