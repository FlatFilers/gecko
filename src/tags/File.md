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
