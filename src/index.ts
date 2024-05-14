import 'dotenv/config'

import { GeckoClassElement } from './tags/Class.ts'
import { GeckoDataPromptElement } from './tags/DataPrompt.ts'
import { GeckoFileElement } from './tags/File.ts'
import { GeckoFileFormatterElement } from './tags/FileFormatter.ts'
import { GeckoFileTemplateElement } from './tags/FileTemplate.ts'
import { GeckoFolderElement } from './tags/Folder.ts'
import { GeckoFunctionElement } from './tags/Function.ts'
import { GeckoMethodElement } from './tags/Method.ts'
import { GeckoPropertyElement } from './tags/Property.ts'
import { GeckoRootElement } from './tags/Root.ts'
import { GeckoTextElement } from './tags/Text.ts'

export { commit } from './commit.ts'
export { printResolveSummary, resolve } from './resolve.ts'
export { Class } from './tags/Class.ts'
export { DataPrompt } from './tags/DataPrompt.ts'
export { File } from './tags/File.ts'
export { FileFormatter } from './tags/FileFormatter.ts'
export {
  FileTemplate,
  TemplateMatch,
} from './tags/FileTemplate.ts'
export { Folder } from './tags/Folder.ts'
export { Function } from './tags/Function.ts'
export { Method } from './tags/Method.ts'
export { Property } from './tags/Property.ts'
export { Root } from './tags/Root.ts'
export { Text } from './tags/Text.ts'

export type GeckoElement =
  | GeckoClassElement
  | GeckoDataPromptElement
  | GeckoFileElement
  | GeckoFileFormatterElement
  | GeckoFileTemplateElement
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
  | GeckoFileTemplateElement
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
