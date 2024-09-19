Prints a file with the status of the Gecko build.

Example:

```tsx
<Folder name="dist">
  <File name="README.md">Example content</File>
  <File name="index.ts">console.log('Hello world')</File>
  <GeckoStatusFile />
</Folder>
```

Produces a file `dist/GeckoStatus.md` with the following content:

```
# Gecko Status

## Files

<details open>
  <summary>📁 dist</summary>
  <blockquote>
    <div>📄 README.md <code>15b</code></div>
    <div>📄 index.ts <code>26b</code></div>
  </blockquote>
</details>
```

Preview of `dist/GeckoStatus.md`:

<blockquote>

# Gecko Status

## Files

  <details open>
    <summary>📁 dist</summary>
    <blockquote>
      <div>📄 README.md <code>15b</code></div>
      <div>📄 index.ts <code>26b</code></div>
    </blockquote>
  </details>
</blockquote>
