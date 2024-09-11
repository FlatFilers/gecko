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
