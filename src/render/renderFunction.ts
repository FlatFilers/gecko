import { DocumentationFormat } from '../tags/Documented'
import { GeckoFunctionElement } from '../tags/Function'
import { CommitContext } from '../types/CommitContext'
import { formatChildren } from '../util/formatChildren'
import { renderContent } from './renderContent'
import { renderDocumentation } from './renderDocumentation'

const functionDocumentation = {
  [DocumentationFormat.JSDoc]: renderFunctionJSDoc,
}

function renderParamJSDoc(param: string) {
  const [name, type] = param.split(':').map((x) => x.trim())
  const _type = type.length > 0 ? ` {${type}}` : ''
  return ` * @param${_type} ${name}`
}

function renderFunctionJSDoc(
  func: GeckoFunctionElement
): string {
  const params = (
    func.props.arguments?.map(renderParamJSDoc) ?? []
  ).join('\n')
  return `\n/**\n${params}${params.length > 0 ? '\n' : ''} */\n`
}

export function renderFunction(
  context: CommitContext,
  func: GeckoFunctionElement
) {
  if (
    func.props.export &&
    func.props.export !== 'default' &&
    (typeof func.props.name !== 'string' ||
      func.props.name.length == 0)
  ) {
    throw new Error(
      'Function name is required when exporting as named'
    )
  }
  const args = func.props.arguments
    ? func.props.arguments.join(', ')
    : ''
  const returnType = func.props.returnType
    ? ': ' + func.props.returnType
    : ''
  const typeArguments = func.props.typeArguments?.length
    ? `<${func.props.typeArguments.join(', ')}>`
    : ''
  const body = formatChildren(func.props.children)
    .map((x) => '  ' + renderContent(context, x))
    .join('\n')
  const docs = renderDocumentation<GeckoFunctionElement>(
    context,
    functionDocumentation,
    func
  )
  const fn = `${func.props.async ? 'async ' : ''}function ${
    func.props.name
  }${typeArguments}(${args})${returnType} {\n${body}\n}`
  if (func.props.export === 'default') {
    return `${docs}export default ${fn}`
  }
  return `${docs}${func.props.export ? 'export ' : ''}${fn}`
}
