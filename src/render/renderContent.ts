import { GeckoChild } from '..'
import { CommitContext } from '../types/CommitContext'
import { formatChildren } from '../util/formatChildren'
import { renderClass } from './renderClass'
import { renderCollect } from './renderCollect'
import { renderExport } from './renderExport'
import { renderFunction } from './renderFunction'
import { renderImport } from './renderImport'
import { renderImportType } from './renderImportType'
import { renderInterface } from './renderInterface'
import { renderMethod } from './renderMethod'
import { renderObject } from './renderObject'
import { renderProperty } from './renderProperty'
import { renderReturn } from './renderReturn'
import { renderType } from './renderType'
import { renderVariable } from './renderVariable'

const DEBUG = false

export function renderContent(
  context: CommitContext,
  content: GeckoChild,
  inInterface: boolean = false,
  inObject: boolean = false
) {
  if (typeof content === 'number') {
    if (DEBUG) {
      console.log(`number: ${content.toString(10)}`)
    }
    return content.toString(10)
  } else if (typeof content === 'string') {
    if (DEBUG) {
      console.log(`string: ${JSON.stringify(content)}`)
    }
    return content
  }
  if (DEBUG) {
    console.log(
      `<${content.type} ${JSON.stringify(content?.props)}>`
    )
  }
  switch (content.type) {
    case 'afterwards':
      throw new Error(
        `Afterwards in file contents not yet implemented`
      )
    case 'class':
      return renderClass(context, content)
    case 'collect':
      return renderCollect(context, content)
    case 'export':
      return renderExport(context, content)
    case 'function':
      return renderFunction(context, content)
    case 'import':
      return renderImport(context, content)
    case 'importType':
      return renderImportType(context, content)
    case 'interface':
      return renderInterface(context, content)
    case 'method':
      return renderMethod(context, content, inInterface)
    case 'property':
      return renderProperty(
        context,
        content,
        inInterface,
        inObject
      )
    case 'return':
      return renderReturn(context, content)
    case 'text':
      if (typeof content.props.children === 'number') {
        return content.props.children.toString(10)
      } else if (
        typeof content.props.children === 'string'
      ) {
        return content.props.children
      }
      return (
        formatChildren(content.props.children)
          ?.map((x) => renderContent(context, x))
          ?.join?.('') ?? ''
      )
    case 'type':
      return renderType(context, content)
    case 'file':
      return `// Error: Gecko <File ${JSON.stringify(content.props)}> not supported at this location.`
    case 'folder':
      return `// Error: Gecko <Folder ${JSON.stringify(content.props)}> not supported at this location.`
    case 'object':
      return renderObject(context, content)
    case 'variable':
      return renderVariable(context, content)
    default:
      if (DEBUG) {
        console.dir(context)
        console.dir(content)
      }
      throw new Error(
        `unknown Gecko tag type: ${JSON.stringify(content.type)}`
      )
  }
}
