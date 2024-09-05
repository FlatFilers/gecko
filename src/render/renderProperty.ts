import { GeckoPropertyElement } from '../tags/Property'
import { CommitContext } from '../types/CommitContext'
import { formatChildren } from '../util/formatChildren'
import { renderContent } from './renderContent'

export function renderProperty(
  context: CommitContext,
  property: GeckoPropertyElement,
  inInterface: boolean = false,
  inObject: boolean = false
) {
  const { children } = property.props
  const flag = property.props.private
    ? 'private '
    : property.props.protected
      ? 'protected '
      : property.props.public
        ? 'public '
        : ''
  const type = property.props.type
    ? `${property.props.required ? '' : '?'}: ${property.props.type}`
    : ''
  const _static = property.props.static ? 'static ' : ''
  const _readonly = property.props.readonly
    ? 'readonly '
    : ''
  const body =
    !inInterface &&
    !property.props.value &&
    property.props.children
      ? formatChildren(children)
          .map((x) =>
            renderContent(context, x, false, true)
          )
          .join(' ')
      : ''
  const value =
    !inInterface && property.props.value
      ? property.props.value
      : ''
  const valueSymbol =
    value.length > 0 || body.length > 0
      ? inObject
        ? ': '
        : ' = '
      : ''
  return `${flag}${_static}${_readonly}${property.props.name}${type}${valueSymbol}${value}${body}`
}
