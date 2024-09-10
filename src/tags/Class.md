### `<Class>`

A class.

Optional flags (attributes) include `export` to export the class and `abstract` for abstract classes. May be exported as default with `export="default"` or exported as named with `export name="MyClass"`.

Example:

```tsx
<Class
  export
  name="User"
  extends="BaseModel"
  implements="AuthProvider"
>
  ... class implementation ...
</Class>
```

Produces:

```ts
export class User extends BaseModel implements AuthProvider {
 ... class implementation ...
}
```

To use default export, pass `export="default"`:

```tsx
<Class export="default" name="User" />
```

Produces:

```ts
export default class User {
 ... class implementation ...
}
```
