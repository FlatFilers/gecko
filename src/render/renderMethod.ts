import { DocumentationFormat } from '../tags/Documented'
import { GeckoMethodElement } from '../tags/Method'
import { CommitContext } from '../types/CommitContext'
import { formatChildren } from '../util/formatChildren'
import { renderContent } from './renderContent'
import { renderDocumentation } from './renderDocumentation'

const methodDocumentation = {
  [DocumentationFormat.JSDoc]: renderFunctionJSDoc,
}

function renderParamJSDoc(param: string) {
  const [name, type] = param.split(':').map((x) => x.trim())
  const _type = type.length > 0 ? ` {${type}}` : ''
  return ` * @param${_type} ${name}`
}

function renderFunctionJSDoc(
  method: GeckoMethodElement
): string {
  const params = (
    method.props.arguments?.map(renderParamJSDoc) ?? []
  ).join('\n')
  return `\n/**\n${params}${params.length > 0 ? '\n' : ''} */\n`
}

export function renderMethod(
  context: CommitContext,
  method: GeckoMethodElement,
  inInterface: boolean = false
) {
  const args = method.props.arguments
    ? method.props.arguments.join(', ')
    : ''

  const returnType = method.props.returnType
    ? ': ' + method.props.returnType
    : ''
  const flag = method.props.private
    ? 'private '
    : method.props.protected
      ? 'protected '
      : method.props.public
        ? 'public '
        : ''
  const typeArguments = method.props.typeArguments?.length
    ? `<${method.props.typeArguments.join(', ')}>`
    : ''
  const _async = method.props.async ? 'async ' : ''
  const _static = method.props.static ? 'static ' : ''
  const _accessor = method.props.accessor
    ? `${method.props.accessor} `
    : ''
  if (inInterface) {
    return `${flag}${_static}${_async}${_accessor}${method.props.name}${typeArguments}(${args})${returnType}`
  }
  const body = formatChildren(method.props.children)
    .map((x) => '  ' + renderContent(context, x))
    .join('\n')
  const docs = renderDocumentation<GeckoMethodElement>(
    context,
    methodDocumentation,
    method
  )
  return `${docs}${flag}${_static}${_async}${_accessor}${method.props.name}${typeArguments}(${args})${returnType} {\n${body}\n}\n`
}
