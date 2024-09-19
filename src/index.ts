import 'dotenv/config'

import { GeckoAfterwardsElement } from './tags/Afterwards.ts'
import { GeckoClassElement } from './tags/Class.ts'
import { GeckoCollectElement } from './tags/Collect.ts'
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
import { GeckoObjectElement } from './tags/Object.ts'
import { GeckoPartElement } from './tags/Part.ts'
import { GeckoPropertyElement } from './tags/Property.ts'
import { GeckoReturnElement } from './tags/Return.ts'
import { GeckoRootElement } from './tags/Root.ts'
import { GeckoTextElement } from './tags/Text.ts'
import { GeckoTypeElement } from './tags/Type.ts'
import { GeckoVariableElement } from './tags/Variable.ts'
import { GeckoSource } from './types/GeckoSource.ts'

export { commit } from './commit.ts'
export { printResolveSummary, resolve } from './resolve.ts'
export {
  GeckoFile,
  GeckoSource,
} from './types/GeckoSource.ts'

export { Afterwards } from './tags/Afterwards.ts'
export { Class } from './tags/Class.ts'
export { Collect } from './tags/Collect.ts'
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
export { GeckoStatusFile } from './tags/GeckoStatusFile.tsx'
export { Get } from './tags/Get.ts'
export { Import } from './tags/Import.ts'
export { Interface } from './tags/Interface.ts'
export { Method } from './tags/Method.ts'
export { Object } from './tags/Object.ts'
export { Part } from './tags/Part.ts'
export { Property } from './tags/Property.ts'
export { Return } from './tags/Return.ts'
export { Root } from './tags/Root.ts'
export { Set } from './tags/Set.ts'
export { Text } from './tags/Text.ts'
export { Type } from './tags/Type.ts'
export { Variable } from './tags/Variable.ts'

import { Afterwards } from './tags/Afterwards.ts'
import { Class } from './tags/Class.ts'
import { Collect } from './tags/Collect.ts'
import { DataPrompt } from './tags/DataPrompt.ts'
import { Documented } from './tags/Documented.ts'
import { Export } from './tags/Export.ts'
import { File } from './tags/File.ts'
import { FileFormatter } from './tags/FileFormatter.ts'
import { FileTemplate } from './tags/FileTemplate.ts'
import { Folder } from './tags/Folder.ts'
import { Function } from './tags/Function.ts'
import { GeckoStatusFile } from './tags/GeckoStatusFile.tsx'
import { Get } from './tags/Get.ts'
import { Import } from './tags/Import.ts'
import { Interface } from './tags/Interface.ts'
import { Method } from './tags/Method.ts'
import { Object } from './tags/Object.ts'
import { Part } from './tags/Part.ts'
import { Property } from './tags/Property.ts'
import { Return } from './tags/Return.ts'
import { Root } from './tags/Root.ts'
import { Set } from './tags/Set.ts'
import { Text } from './tags/Text.ts'
import { Type } from './tags/Type.ts'
import { Variable } from './tags/Variable.ts'

export const AllTags = {
  Afterwards,
  Class,
  Collect,
  DataPrompt,
  Documented,
  Export,
  File,
  FileFormatter,
  FileTemplate,
  Folder,
  Function,
  GeckoStatusFile,
  Get,
  Import,
  Interface,
  Method,
  Object,
  Part,
  Property,
  Return,
  Root,
  Set,
  Text,
  Type,
  Variable,
}

// Post-AI processed elements
export type GeckoResolvedElement =
  | GeckoAfterwardsElement
  | GeckoClassElement
  | GeckoCollectElement
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
  | GeckoObjectElement
  | GeckoPartElement
  | GeckoPropertyElement
  | GeckoReturnElement
  | GeckoRootElement
  | GeckoTextElement
  | GeckoTypeElement
  | GeckoVariableElement

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

export type GeckoChild = number | string | GeckoElement

export type GeckoChildren =
  | undefined
  | null
  | number
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
