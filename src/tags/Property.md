A class property. May only be used inside of a `<Class>`, `<Interface>`, or `<Object>` element. Depending on the context, the property may be a class property, interface property, or object property.

Properties in different contexts have varying attributes and behaviors:

1. Class Properties:

   - Can use `value` attribute or children to set initial value
   - Can use `type` attribute to set property type
   - Can set access modifiers: `private`, `protected`, or `public` (at most one)
   - Can be marked as `readonly` or `static`

2. Interface Properties:

   - Must use `type` attribute to set property type
   - Can be marked as `readonly`
   - Cannot have initial values

3. Object Properties:

   a. In regular objects:

   - Can use `value` attribute or children to set property value
   - Cannot set type, access modifiers, or `readonly`/`static` flags

   b. In type objects (when parent `<Object>` has `type` attribute):

   - Must use `type` attribute to set property type
   - Can set access modifiers: `private`, `protected`, or `public`
   - Can be marked as `readonly` or `static`
   - Cannot have initial values

All property types except value objects support the `required` attribute.

The following table summarizes the attributes available for properties in different contexts:

| Context                   | name     | type     | value (property or children) | flags (private, protected, public) | readonly | static   | required |
| ------------------------- | -------- | -------- | ---------------------------- | ---------------------------------- | -------- | -------- | -------- |
| **Class Property**        | Required | Optional | Optional                     | Optional (one of)                  | Optional | Optional | Optional |
| **Interface Property**    | Required | Required | 🚫                           | 🚫                                 | Optional | 🚫       | Optional |
| **Value Object Property** | Required | 🚫       | Required                     | 🚫                                 | 🚫       | 🚫       | 🚫       |
| **Type Object Property**  | Required | Required | 🚫                           | Optional (one of)                  | Optional | Optional | Optional |

Notes:

- For class properties and value object properties, `value` can be set using either the `value` attribute or children elements.
- Type object properties are properties within an `<Object>` element that has the `type` attribute set.
- The `required` attribute is not included in this table but can be used for class properties, interface properties, and type object properties.

Example class property:

```tsx
<Class name="Vehicle">
  <Property
    private
    name="wheels"
    type="number"
    value="4"
    required
  />
  <Property public name="color" type="string" />
</Class>
```

Produces:

```ts
class Vehicle {
  private wheels: number = 4
  public color?: string
}
```

Example interface property:

```tsx
<Interface name="Vehicle">
  <Property name="wheels" type="number" required />
  <Property name="color" type="string" />
</Interface>
```

Produces:

```ts
interface Vehicle {
  wheels: number
  color?: string
}
```

Example value object property:

```tsx
<Variable name="vehicle">
  <Object>
    <Property name="wheels" value="4" />
    <Property name="color">red</Property>
  </Object>
</Variable>
```

Produces:

```ts
const vehicle = {
  wheels: 4,
  color: 'red',
}
```

Example type object property:

```tsx
<Type name="Vehicle">
  <Object type>
    <Property
      protected
      name="wheels"
      type="number"
      required
    />
    <Property public name="color" type="string" />
  </Object>
</Type>
```

Produces:

```ts
type Vehicle = {
  protected wheels: number
  public color?: string
}
```
