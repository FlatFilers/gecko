import { GeckoMethodElement } from '../tags/Method'
import { CommitContext } from '../types/CommitContext'
import { formatChildren } from '../util/formatChildren'
import { renderContent } from './renderContent'

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
  if (inInterface) {
    return `${flag}${_static}${_async}${method.props.name}${typeArguments}(${args})${returnType}`
  }
  const body = formatChildren(method.props.children)
    .map((x) => '  ' + renderContent(context, x))
    .join('\n')
  return `${flag}${_static}${_async}${method.props.name}${typeArguments}(${args})${returnType} {\n${body}\n}\n`
}
