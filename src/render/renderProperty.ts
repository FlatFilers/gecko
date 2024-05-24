import { GeckoPropertyElement } from '../tags/Property'
import { CommitContext } from '../types/CommitContext'

export function renderProperty(
  context: CommitContext,
  property: GeckoPropertyElement,
  inInterface: boolean = false
) {
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
  const value =
    !inInterface && property.props.value
      ? ' = ' + property.props.value
      : ''
  return `${flag}${_static}${_readonly}${property.props.name}${type}${value}`
}
