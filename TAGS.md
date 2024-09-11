
# Gecko Tag Reference


## Table of Contents

<a name="table-of-contents"> </a>

### Gecko Tags
- [Afterwards](#afterwards)
- [Class](#class)
- [Collect](#collect)
- [DataPrompt](#dataprompt)
- [Documented](#documented)
- [Export](#export)
- [File](#file)
- [FileFormatter](#fileformatter)
- [FileTemplate](#filetemplate)
- [Folder](#folder)
- [Function](#function)
- [Get](#get)
- [Import](#import)
- [Interface](#interface)
- [Method](#method)
- [Object](#object)
- [Part](#part)
- [Property](#property)
- [Return](#return)
- [Root](#root)
- [Set](#set)
- [Text](#text)
- [Type](#type)
- [Variable](#variable)

## Tag Reference

<a name="afterwards"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Afterwards>`

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoContentFunction \| GeckoContentFunction[]` | The child elements of the afterwards declaration, can be a single function or an array of functions |

Content to write to disk or operations to perform after all other content is written to disk. Takes a callback function, with access to a `GeckoSource` instance as the first argument. Use the `match` function to get files matching a given regular expression. To match all files, pass undefined or an empty regular expression.

Example:

```tsx
<Afterwards>
  {(s: GeckoSource) => (
    <File name="stats.md">
      {s.match(/\.tsx?$/).length} TypeScript files were
      generated.
    </File>
  )}
</Afterwards>
```

Produces a file `stats.md` with the text:

```
2 TypeScript files were generated.
```


<a name="class"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Class>`

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the class |
| `abstract` | `true` | Whether the class is abstract |
| `export` | `boolean \| "default"` | Specifies if the class should be exported. Can be a boolean or 'default' for default export |
| `extends` | `string` | The class that the current class extends |
| `implements` | `string` | The interfaces that the current class implements |
| `name` | `string` | The name of the class |

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


<a name="collect"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Collect>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `tag` | `string` |  |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the collect tag |

Collect all [`<Part>`](#part)s matching a tag.

Example:

_earlier..._

```
<Part tag="readme">
 <Text>This is part of the readme</Text>
</Part>
```

_later..._

```
<File name="readme.md">
 <Text># My Project</Text>
 <Text />
 <Collect tag="readme" />
</File>
```

Produces the following `readme.md` file:

```
# My Project

This is part of the readme
```


<a name="dataprompt"> </a>
[↥ Table of Contents](#table-of-contents)
### `<DataPrompt>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `input` | `string` | The input of the prompt |
| `type` | `string` | The TypeScript type of the expected output data |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `((...props: any[]) => GeckoChildren)[]` | The child elements of the data prompt. This is a function that takes in the props and returns new children |

A data prompt, which prompts an AI agent to return the specified data in the given TypeScript type format before continuing code generation.

Example:

```tsx
 <Text>{`<select>`}</Text>
  <DataPrompt
    input="list of every country in the world"
    type="{code: string, name: string}[]"
  >
    {(countries: { code: string; name: string }[]) => (
      <>
        {countries.map(({ code, name }) => (
          <Text>{`<option value=${code}>${name}</option>`}</Text>
        ))}
      </>
    )}
  </DataPrompt>
<Text>{`</select>`}</Text>
```

Produces:

```tsx
<select>
  <option value="AF">Afghanistan</option>
  <option value="AL">Albania</option>
  <option value="DZ">Algeria</option>
  <option value="AS">American Samoa</option>
  <option value="AD">Andorra</option>
  <option value="AO">Angola</option>
  <option value="AI">Anguilla</option>
  <option value="AQ">Antarctica</option>
  <option value="AG">Antigua and Barbuda</option>
  <option value="AR">Argentina</option>
  ... (185 more countries)
</select>
```


<a name="documented"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Documented>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `formats` | `DocumentationFormat[]` | The formats to document |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the documented tag |

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


<a name="export"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Export>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `from` | `string` | The name of the module or file to export from |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `as` | `string` | The name to export as |
| `all` | `true` | Whether to export all exports from the module |
| `named` | `string[]` | The names to export |
| `type` | `true` | Whether to export as types |

An export statement, which re-exports some or all of the exports from a module.

Example:

```tsx
<Export all as='React' from 'react' />
<Export type named={[ 'ReactDOM' ]} from 'react-dom' />
<Export named={['a', 'b']} from './my-module' />
<Export all from './my-module' />
```

Produces:

```tsx
export * as React from 'react'
export type { ReactDOM } from 'react-dom'
export { a, b } from './my-module'
export * from './my-module'
```


<a name="file"> </a>
[↥ Table of Contents](#table-of-contents)
### `<File>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `name` | `string` | The name of the file |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the file |
| `once` | `true` | Whether the file should be overwritten if it already exists, if this is set the file will not be overwritten |

A file. Takes a `name="fileName.ext"` argument. Children of this tag will be the contents written to the file. You may specify the attribute `once` to ensure that the file is only generated if it does not already exist. This is useful for files that must be manually modified after being generated.

Example:

```tsx
<File name="README.md" once>
  <Text>
    This file is generated only once, and then may be
    manually edited without being overwritten by Gecko later
  </Text>
</File>
```

Produces a file `README.md` with the text:

```
This file is generated only once, and then may be
manually edited without being overwritten by Gecko later
```


<a name="fileformatter"> </a>
[↥ Table of Contents](#table-of-contents)
### `<FileFormatter>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `formatter` | `"prettier"` | The formatter to use |
| `match` | `string` | The match pattern to look for |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the file formatter |

The `<FileFormatter>` tag specifies a file formatter to apply to all matching files.

Currently, the only supported formatter is `"prettier"`. You may specify prettier options in a `.prettierrc` file at the root of the project, directly next to the `gecko.tsx` file.

Example:

```tsx
<FileFormatter
  formatter="prettier"
  match="*.{js,json,ts,yaml}"
>
  <File name="hello.ts">
    <Text>console.log('Hello world')</Text>
  </File>
</FileFormatter>
```

This `hello.ts` file will be formatted with [Prettier](https://prettier.io).


<a name="filetemplate"> </a>
[↥ Table of Contents](#table-of-contents)
### `<FileTemplate>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `templates` | `TemplateMatch[]` | The templates to match |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the file template |

A file template. File templates apply to all files that match a given glob pattern. The available template variables are:

- `{{filename}}`: The name of the file.
- `{{timestamp}}`: The timestamp of when the file was generated.
- `{{body}}`: The body of the file.

You can pass multiple file templates to a `<FileTemplate>` tag, and they will be applied on matching filesin order from last to first, nesting the contents of each file template within the previous one's `{{body}}` template variable.

Example:

```tsx
const tsFileTemplate: TemplateMatch = {
  match: '*.ts',
  template: `/**
 * {{filename}} generated by Gecko
 * {{timestamp}}
 */
{{body}}`,
}

export default function () {
  return (
    <Root>
      <FileTemplate templates={[tsFileTemplate]}>
        <File name="hello.ts">
          <Text>console.log('Hello world')</Text>
        </File>
      </FileTemplate>
    </Root>
  )
}
```

Produces:

```
/**
 * hello.ts generated by Gecko
 * 2024-02-20T12:00:00Z
 */
console.log('Hello world')
```


<a name="folder"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Folder>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `name` | `string` | The name of the folder |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the folder |

A folder. Takes a `name="myFolderName"` property. This tag may contain other `<Folder>` or `<File>` tags as children. You may nest folders as deeply as you like, and files may be placed anywhere within the nesting.

Example:

```tsx
<Folder name="myFolderName">
  <Folder name="example">
    <File name="hello.ts">
      <Text>console.log('Hello world')</Text>
    </File>
  </Folder>
</Folder>
```

The `hello.ts` file will be generated inside the `myFolderName/example` folder.


<a name="function"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Function>`

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `arguments` | `string[]` | The arguments of the function. Arguments may include type annotations, i.e. `name: string`. |
| `async` | `true` | Whether the function is asynchronous. |
| `children` | `GeckoChildren` | The content of the function. |
| `export` | `boolean \| "default"` | Specifies if the function should be exported. Can be a boolean or 'default' for default export |
| `name` | `string` | The name of the function. |
| `returnType` | `string` | The return type of the function. |
| `typeArguments` | `string[]` | The type arguments of the function. |
| `undocumented` | `true` | Whether the function is undocumented when inside a `Documented` tag. |

A function. May be exported as default with `export="default"` or exported as named with `export name="myFunctionName"`.

A `name` is required when exporting as named, ok to omit `name` with `export="default"` or for unexported, anonymous functions.

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


<a name="get"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Get>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `name` | `string` | The name of the method |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the method declaration |
| `private` | `true` | If true, the method will be private |
| `protected` | `true` | If true, the method will be protected |
| `public` | `true` | If true, the method will be public |
| `returnType` | `string` | The return type of the method |
| `undocumented` | `true` | If true, the method will be undocumented when inside a `<Documented>` block |

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


<a name="import"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Import>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `from` | `string` | The file path or moduleof the import |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `default` | `string` | Import the default export of the module |
| `named` | `string[]` | The named exports of the module to import |
| `type` | `true` | If true, the import will be a type import |

An import statement.

Example:

```tsx
<Import default='React' from='react' />
<Import type named={[ 'ReactDOM' ]} from='react-dom' />
<Import default="a" named={['b', 'c']} from='./d' />
```

Produces:

```ts
import React from 'react'
import type { ReactDOM } from 'react-dom'
import a, { b, c } from './d'
```


<a name="interface"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Interface>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `name` | `string` | The name of the interface |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the interface declaration |
| `export` | `boolean \| "default"` | Specifies if the interface should be exported. Can be a boolean or 'default' for default export |
| `extends` | `string` | The interfaces that the interface extends |

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


<a name="method"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Method>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `name` | `string` | The name of the method |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `accessor` | `"get" \| "set"` | The accessor of the method, can be 'get' or 'set' |
| `arguments` | `string[]` | The arguments of the method, optionally including type annotations, for example: `['a: number', 'b: string']` |
| `async` | `true` | If true, the method will be asynchronous |
| `children` | `GeckoChildren` | The child elements of the method declaration |
| `private` | `true` | If true, the method will be private |
| `protected` | `true` | If true, the method will be protected |
| `public` | `true` | If true, the method will be public |
| `returnType` | `string` | The return type of the method |
| `static` | `true` | If true, the method will be static |
| `typeArguments` | `string[]` | The type arguments of the method, i.e. `['T']` for `<T>` |
| `undocumented` | `true` | If true, the method will be undocumented when inside a `<Documented>` block |

A class method. May only be used inside of a `<Class>` element.

Example:

```tsx
<Class name="User">
  <Method
    name="getUser"
    async
    arguments={['id: string']}
    returnType="Promise<User>"
  >
    {'// implementation here'}
  </Method>
</Class>
```

Produces:

```ts
class User {
  async getUser(id: string): Promise<User> {
    // implementation here
  }
}
```


<a name="object"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Object>`

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the object declaration |
| `private` | `true` | If true, the object will be a type object, and properties will not be able to contain values |

An object.

Example:

```tsx
<Object>
  <Property name="id">123</Property>
  <Property name="name">{"'John Doe'"}</Property>
  <Property name="email">
    {"'john.doe@example.com'"}
  </Property>
</Object>
```

Produces:

```js
{
  id: 123,
  name: 'John Doe',
  email: 'john.doe@example.com'
}
```


<a name="part"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Part>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `tag` | `string` | The tag of the part |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the part declaration |
| `order` | `number` | The order of the part |

A part to be later collected by a [`<Collect>`](#collect) tag.

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


<a name="property"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Property>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `name` | `string` | The name of the property |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the property declaration, provide either `value` or `children`, but not both |
| `private` | `true` | If true, the property will be private |
| `protected` | `true` | If true, the property will be protected |
| `public` | `true` | If true, the property will be public |
| `readonly` | `true` | If true, the property will be readonly |
| `required` | `true` | If true, the property will be required |
| `static` | `true` | If true, the property will be static |
| `type` | `string` | The type of the property |
| `value` | `string` | The value of the property, provide either `value` or `children`, but not both |

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


<a name="return"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Return>`

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the return type declaration |

The `<Return>` tag is used to return a value from a function.

```tsx
<Return>
  <Text>'Hello, world!'</Text>
</Return>
```

Produces:

```tsx
return 'Hello, world!'
```


<a name="root"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Root>`

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the root declaration |
| `erase` | `true` | If true, the root folder will be erased before generating the output |
| `path` | `string` | The path of the root directory, all generated folders and files will be placed in this directory |
| `requires` | `string[]` | The file paths upon which the generated files depend, all files specified here will cause Gecko to re-run if they are modified during the generation process |

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


<a name="set"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Set>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `name` | `string` | The name of the method |
| `argument` | `string` |  |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the method declaration |
| `private` | `true` | If true, the method will be private |
| `protected` | `true` | If true, the method will be protected |
| `public` | `true` | If true, the method will be public |
| `undocumented` | `true` | If true, the method will be undocumented when inside a `<Documented>` block |

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


<a name="text"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Text>`

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The text to be rendered |

Plain text to be written to a file. Adjacent `<Text>` or `<Function>` tags within a `<File>` are separated by a new line.

Example:

```tsx
<File name="index.ts">
  <Text>{'export class User {'}</Text>
  <Text>{'  constructor() { }'}</Text>
  <Text>{'}'}</Text>
</File>
```

Produces:

```ts
export class User {
  constructor() {}
}
```


<a name="type"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Type>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `name` | `string` | The name of the type |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the type declaration |
| `export` | `boolean \| "default"` | Specifies if the type should be exported. Can be a boolean or 'default' for default export |

A TypeScript type.

Example:

```tsx
<Type export name="Digit">
  {
    "'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'"
  }
</Type>
```

Produces:

```js
export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
```

You can combine `<Type>` with `<Object type>` to create a named object type. Example:

```tsx
<Type export name="User">
  <Object type>
    <Property name="name" type="string" required />
  </Object>
</Type>
```

Produces:

```ts
export type User = {
  name: string
}
```


<a name="variable"> </a>
[↥ Table of Contents](#table-of-contents)
### `<Variable>`
### Required Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `name` | `string` | The name of the variable |

### Optional Props

| Name | Type | Description |
| -------- | -------- | -------- |
| `children` | `GeckoChildren` | The child elements of the variable declaration |
| `export` | `boolean \| "default"` | Specifies if the variable should be exported. Can be a boolean or 'default' for default export |
| `mutable` | `true` | Indicates if the variable is mutable (can be reassigned, setting this to true will make gecko print `let` instead of `const`) |
| `type` | `GeckoChildren` | The type of the variable. Can be a string or GeckoChildren |

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

  