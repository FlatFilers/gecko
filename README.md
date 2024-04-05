# gecko

![Gecko mascot, a green gecko wearing glasses](./resources/gecko.jpeg)

JSX code generation framework for TypeScript

## Prerequisites

Gecko is written in TypeScript, and requires either [Bun](https://bun.sh/) or [ts-node](https://www.npmjs.com/package/ts-node).

## Examples

To test Gecko, run the following from this repository's root folder:

```
npm install
cd examples/calculator
npm --prefix project install
npm run gecko
npm --prefix project run dev
```

Gecko should run and generate files in the `./examples/calculator/project/gecko_generated` folder.

If there were no errors during the Gecko or Vite build, the calculator example will be available at http://localhost:5173 that looks like this:

![Calculator example](./resources/calculator.png)

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

Gecko supports many JSX tags to structure generated code:

### `<Root>`

This tag should wrap all other tags used. It's job is to write the generated folders and files to disk. If the `erase` attribute is present, the folder specified by `path="path/to/generated/content"` will be erased on each build. Use `erase` with extreme caution!

### `<File>`

A file. Takes a `name="fileName.ext"` argument. Children of this tag will be the contents written to the file.

### `<Folder>`

A folder. Takes a `name="myFolderName"` property. This tag may contain other `<Folder>` or `<File>` tags as children.

### `<Function>`

A function. May be exported as default with `export="default"` or exported as named with `export name="myFunctionName"`.

### `<Text>`

Plain text to be written to a file. Adjacent `<Text>` or `<Function>` tags within a `<File>` are separated by a new line.
