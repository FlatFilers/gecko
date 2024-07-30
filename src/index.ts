import 'dotenv/config'

import { GeckoAfterwardsElement } from './tags/Afterwards.ts'
import { GeckoClassElement } from './tags/Class.ts'
import { GeckoDataPromptElement } from './tags/DataPrompt.ts'
import { GeckoDocumentedElement } from './tags/Documented.ts'
import { GeckoExportElement } from './tags/Export.ts'
import { GeckoFileElement } from './tags/File.ts'
import { GeckoFileFormatterElement } from './tags/FileFormatter.ts'
import { GeckoFileTemplateElement } from './tags/FileTemplate.ts'
import { GeckoFolderElement } from './tags/Folder.ts'
import { GeckoFunctionElement } from './tags/Function.ts'
import { GeckoImportElement } from './tags/Import.ts'
import { GeckoInterfaceElement } from './tags/Interface.ts'
import { GeckoMethodElement } from './tags/Method.ts'
import { GeckoPropertyElement } from './tags/Property.ts'
import { GeckoRootElement } from './tags/Root.ts'
import { GeckoTextElement } from './tags/Text.ts'
import { GeckoSource } from './types/GeckoSource.ts'

export { commit } from './commit.ts'
export { printResolveSummary, resolve } from './resolve.ts'
export { Afterwards } from './tags/Afterwards.ts'
export { Class } from './tags/Class.ts'
export { DataPrompt } from './tags/DataPrompt.ts'
export {
  DocumentationFormat,
  Documented,
} from './tags/Documented.ts'
export { Export } from './tags/Export.ts'
export { File } from './tags/File.ts'
export { FileFormatter } from './tags/FileFormatter.ts'
export {
  FileTemplate,
  TemplateMatch,
} from './tags/FileTemplate.ts'
export { Folder } from './tags/Folder.ts'
export { Function } from './tags/Function.ts'
export { Import } from './tags/Import.ts'
export { Interface } from './tags/Interface.ts'
export { Get, Method, Set } from './tags/Method.ts'
export { Property } from './tags/Property.ts'
export { Root } from './tags/Root.ts'
export { Text } from './tags/Text.ts'
export {
  GeckoFile,
  GeckoSource,
} from './types/GeckoSource.ts'

// Post-AI processed elements
export type GeckoResolvedElement =
  | GeckoAfterwardsElement
  | GeckoClassElement
  | GeckoDocumentedElement
  | GeckoExportElement
  | GeckoFileElement
  | GeckoFileFormatterElement
  | GeckoFileTemplateElement
  | GeckoFolderElement
  | GeckoFunctionElement
  | GeckoImportElement
  | GeckoInterfaceElement
  | GeckoMethodElement
  | GeckoPropertyElement
  | GeckoRootElement
  | GeckoTextElement

// All possible elements, including AI prompt elements
export type GeckoElement =
  | GeckoResolvedElement
  | GeckoDataPromptElement

interface PropsArg {
  [prop: string]:
    | GeckoChildren
    | string
    | (() => any)
    | undefined
  children?: GeckoChildren
}

export type GeckoChild = string | GeckoElement

export type GeckoChildren =
  | undefined
  | null
  | string
  | GeckoElement
  | GeckoChildren[]

type ElementDefinition =
  | (() => any)
  | ((props: any) => GeckoElement)

export type GeckoContentFunction = (
  s: GeckoSource,
  baseDir: string
) => GeckoChildren

export function geckoJSX<T extends GeckoElement>(
  elementDefinition: ElementDefinition,
  props: PropsArg,
  ...children: GeckoChildren[]
): T | GeckoChildren {
  if (elementDefinition === geckoJSX) {
    return children
  }
  props = props ?? {}
  props.children = (children as GeckoElement[])
    .flat(Infinity)
    .filter((x) => x !== null) as GeckoChild[]
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
