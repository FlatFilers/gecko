import { GeckoClassElement } from '../tags/Class'
import { CommitContext } from '../types/CommitContext'
import { formatChildren } from '../util/formatChildren'
import { renderContent } from './renderContent'

export function renderClass(
  context: CommitContext,
  _class: GeckoClassElement
) {
  if (
    _class.props.export &&
    _class.props.export !== 'default' &&
    (typeof _class.props.name !== 'string' ||
      _class.props.name.length == 0)
  ) {
    throw new Error(
      'Class name is required when exporting as named'
    )
  }
  const abstract = _class.props.abstract ? 'abstract ' : ''
  const body = formatChildren(_class.props.children)
    .map((x) => renderContent(context, x))
    .join('\n')
  const _extends = _class.props.extends
    ? ' extends ' + _class.props.extends
    : ''
  const _implements = _class.props.implements
    ? ' implements ' + _class.props.implements
    : ''
  const cls = `class ${_class.props.name}${_extends}${_implements} {\n${body}\n}`
  const _export =
    _class.props.export === 'default'
      ? 'export default '
      : _class.props.export
        ? 'export '
        : ''
  return `${_export}${abstract}${cls}`
}
