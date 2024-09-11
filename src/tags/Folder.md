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
