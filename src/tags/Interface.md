A TypeScript interface type.

Example:

```tsx
<Interface
  export
  name="MyComponentProps"
  extends="React.HTMLAttributes<HTMLDivElement>"
>
  <Property name="onClick" type="() => void" />
  <Property name="count" type="number" required />
</Interface>
```

Produces:

```ts
export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void
  count: number
}
```

To use default export, pass `export="default"`:

```tsx
<Interface
  export="default"
  name="MyComponentProps"
  extends="React.HTMLAttributes<HTMLDivElement>"
>
  <Property name="onClick" type="() => void" />
  <Property name="count" type="number" required />
</Interface>
```

Produces:

```ts
export default interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void
  count: number
}
```
