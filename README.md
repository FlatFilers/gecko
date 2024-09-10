# Gecko

![Gecko mascot, a green gecko wearing glasses](./resources/gecko.jpeg)

Gecko is a JSX code generation framework for TypeScript.

## Prerequisites

Gecko is written in TypeScript, and requires [tsx](https://www.npmjs.com/package/tsx).

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
npm install
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

Your entire project source code, including its `package.json`, `tsconfig.json`, etc should be in the `./project` sub-folder. This is important because the `gecko.tsx` template file must be isolated from your project's own TypeScript configuration. It will run under Gecko's internal `tsconfig.json`. You can use any structure you like, as long as the `gecko.tsx` file is not nested in your project's source tree, where you might have another `tsconfig.json` file, which could cause conflicts.

## Reference

Gecko uses a file named `gecko.tsx` at the root of your project to generate files. The file contents might look something like:

```jsx
import {
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

Gecko supports many JSX tags to structure generated code. For the complete list, see the [tag reference](./TAGS.md).
