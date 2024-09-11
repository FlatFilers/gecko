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
