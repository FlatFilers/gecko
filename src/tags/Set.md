`<Set>` creates a class property setter function, and may only be used inside of a `<Class>` element.

Flags (attributes) include at most one of `private`, `protected`, or `public`.

```tsx
<Class name="MyClass">
  <Property public name="fooInternal" type="number" />
  <Set public name="foo" argument="value: number">
    {'this.fooInternal = value'}
  </Set>
</Class>
```

Produces:

```ts
class MyClass {
  public foo: number

  public set foo(value: number) {
    this.fooInternal = value
  }
}
```
