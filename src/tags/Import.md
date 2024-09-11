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
