# Gecko

![Gecko mascot, a green gecko wearing glasses](./resources/gecko.jpeg)

Gecko is a JSX code generation framework for TypeScript.

## Prerequisites

Gecko is written in TypeScript, and requires [ts-node](https://www.npmjs.com/package/ts-node).

[Bun](https://bun.sh/) support is planned.

## Example: React + Vite front end

To test Gecko, run the following from this repository's root folder:

```
npm install
cd examples/calculator
npm --prefix project install
npm run gecko
npm --prefix project run dev
```

Gecko should run and generate files in the `./examples/calculator/project/src/gecko_generated` folder.

If there were no errors during the Gecko or Vite build, the calculator example will be available at http://localhost:5173 that looks like this:

![Calculator example](./resources/calculator.png)

## Example: Express REST API

To start the API, first run Gecko and then launch the resulting API:

```
npm install
cd examples/rest-api
npm --prefix project install
npm run gecko
npm --prefix project start
```

If there were no errors encountered, you should be able to visit http://localhost:3000/users and see a list of users:

```
[
  {
    "id": "1",
    "name": "Test user",
    "email": "test@example.com"
  }
]
```

## Project structure

Projects using Gecko should have the following structure:

```
├── gecko.tsx
├── package.json
├── project
│   ├── (your project files)
│   ├── package.json
└── templates
    └── example.tsx
```

Your entire project source code, including its `package.json`, `tsconfig.json`, etc must be in the `./project` sub-folder. This is important because the `gecko.tsx` template file must be isolated from your project's own TypeScript configuration. It will run under Gecko's internal `tsconfig.json`.

## Reference

Gecko uses a file named `gecko.tsx` at the root of your project to generate files. The file contents might look something like:

```import {
  File,
  Folder,
  geckoJSX,
  Root,
  Text,
} from '@flatfile/gecko'

import { Button } from './templates/Button'

export default function () {
  return (
    <Root path="project/src/gecko_generated" erase>
      <File name="readme.md">
        <Text>Hello world</Text>
      </File>
      <Folder name="components">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <File name={`Digit${digit}.tsx`}>
            <Button label={digit} />
          </File>
        ))}
      </Folder>
    </Root>
  )
}
```

Gecko supports many JSX tags to structure generated code:

### `<Root>`

This tag should wrap all other tags used. It specifies the location of generated folders and files on disk with `path="path/to/generated/content"`. If the `erase` attribute is present, the folder path specified will be erased on each build. Use `erase` with extreme caution!

### `<File>`

A file. Takes a `name="fileName.ext"` argument. Children of this tag will be the contents written to the file.

### `<Folder>`

A folder. Takes a `name="myFolderName"` property. This tag may contain other `<Folder>` or `<File>` tags as children.

### `<Function>`

A function. May be exported as default with `export="default"` or exported as named with `export name="myFunctionName"`.

### `<Text>`

Plain text to be written to a file. Adjacent `<Text>` or `<Function>` tags within a `<File>` are separated by a new line.
