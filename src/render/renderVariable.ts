import { CommitContext } from '../types/CommitContext'
import { GeckoVariableElement } from '../tags/Variable'
import { renderContent } from './renderContent'
import { formatChildren } from '../util/formatChildren'

export function renderVariable(
  context: CommitContext,
  variable: GeckoVariableElement
) {
  const {
    children,
    name,
    type,
    mutable,
    export: _export,
  } = variable.props
  const declarationType = mutable ? 'let' : 'const'
  const exportKeyword =
    _export === 'default'
      ? 'export default '
      : _export
        ? 'export '
        : ''
  const typeAnnotation =
    typeof type === 'object'
      ? `: ${formatChildren(type)
          .map((x) => renderContent(context, x, true))
          .join(' ')}`
      : type
        ? `: ${type}`
        : ''
  const body = children
    ? formatChildren(children)
        .map((x) => renderContent(context, x, true))
        .join(' ')
    : ''

  return `${exportKeyword}${declarationType} ${name}${typeAnnotation}${body.length > 0 ? '=' : ''}${body}`
}
