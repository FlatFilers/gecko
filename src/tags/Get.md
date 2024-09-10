### `<Get>`

`<Get>` creates a class property getter function, and may only be used inside of a `<Class>` element.

Flags (attributes) include at most one of `private`, `protected`, or `public`.

```tsx
<Class name="MyClass">
  <Get protected name="foo">
    {'return 4'}
  </Get>
</Class>
```

Produces:

```ts
class MyClass {
  protected get foo() {
    return 4
  }
}
```
