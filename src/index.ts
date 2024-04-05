import { GeckoFileElement } from './tags/File.ts'
import { GeckoFolderElement } from './tags/Folder.ts'
import { GeckoFunctionElement } from './tags/Function.ts'
import { GeckoRootElement } from './tags/Root.ts'
import { GeckoTextElement } from './tags/Text.ts'

export { commit } from './commit.ts'
export { File } from './tags/File.ts'
export { Folder } from './tags/Folder.ts'
export { Function } from './tags/Function.ts'
export { Root } from './tags/Root.ts'
export { Text } from './tags/Text.ts'

export type GeckoElement =
  | GeckoFileElement
  | GeckoFolderElement
  | GeckoFunctionElement
  | GeckoRootElement
  | GeckoTextElement

interface PropsArg {
  children?: Children
  [prop: string]: Children | string | (() => any)
}

type Child = GeckoElement | string
type Children = Child[] | Child[][]
type ElementDefinition =
  | (() => any)
  | ((props: any) => GeckoElement)

export function geckoJSX(
  elementDefinition: ElementDefinition,
  props: PropsArg,
  ...children: Children
): GeckoElement | Children {
  if (elementDefinition === geckoJSX) {
    return children
  }
  props = props ?? {}
  props.children = children.flat()
  if (typeof elementDefinition !== 'function') {
    throw new Error(
      `Gecko component type must be function, got ${typeof elementDefinition}`
    )
  }
  return elementDefinition(props)
}

declare global {
  namespace JSX {
    type Element = GeckoElement
    type IntrinsicElements = never
  }
}
