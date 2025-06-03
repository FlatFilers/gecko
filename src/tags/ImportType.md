A TypeScript type import statement.

Example:

```tsx
<ImportType named={['UserData']} from='./user.model' />
<ImportType named={['CreateData', 'UpdateData']} from='./api.types' />
<ImportType named={['ComponentProps', 'ReactNode']} from='react' />
```

Produces:

```ts
import type { UserData } from './user.model'
import type { CreateData, UpdateData } from './api.types'
import type { ComponentProps, ReactNode } from 'react'
```

This component is specifically designed for TypeScript type imports, which are required when using types in decorated method signatures with `isolatedModules` enabled. Use this instead of `<Import type>` for cleaner separation of type and value imports. 