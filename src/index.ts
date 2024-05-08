import 'dotenv/config'

import { GeckoClassElement } from './tags/Class'
import { GeckoDataPromptElement } from './tags/DataPrompt'
import { GeckoFileElement } from './tags/File'
import { GeckoFileFormatterElement } from './tags/FileFormatter'
import { GeckoFolderElement } from './tags/Folder'
import { GeckoFunctionElement } from './tags/Function'
import { GeckoMethodElement } from './tags/Method'
import { GeckoPropertyElement } from './tags/Property'
import { GeckoRootElement } from './tags/Root'
import { GeckoTextElement } from './tags/Text'

export { commit } from './commit'
export { printResolveSummary, resolve } from './resolve'
export { Class } from './tags/Class'
export { DataPrompt } from './tags/DataPrompt'
export { File } from './tags/File'
export { FileFormatter } from './tags/FileFormatter'
export { Folder } from './tags/Folder'
export { Function } from './tags/Function'
export { Method } from './tags/Method'
export { Property } from './tags/Property'
export { Root } from './tags/Root'
export { Text } from './tags/Text'

export type GeckoElement =
  | GeckoClassElement
  | GeckoDataPromptElement
  | GeckoFileElement
  | GeckoFileFormatterElement
  | GeckoFolderElement
  | GeckoFunctionElement
  | GeckoMethodElement
  | GeckoPropertyElement
  | GeckoRootElement
  | GeckoTextElement

export type GeckoResolvedElement =
  | GeckoClassElement
  | GeckoFileElement
  | GeckoFileFormatterElement
  | GeckoFolderElement
  | GeckoFunctionElement
  | GeckoMethodElement
  | GeckoPropertyElement
  | GeckoRootElement
  | GeckoTextElement

interface PropsArg {
  [prop: string]:
    | Children
    | string
    | (() => any)
    | undefined
  children?: Children
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
  props.children = children
    .flat(Infinity)
    .filter((x) => x !== null) as Child[]
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
