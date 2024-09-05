import { GeckoInterfaceElement } from '../tags/Interface'
import { CommitContext } from '../types/CommitContext'
import { formatChildren } from '../util/formatChildren'
import { renderContent } from './renderContent'

export function renderInterface(
  context: CommitContext,
  _interface: GeckoInterfaceElement
) {
  const { export: _export, extends: _extends } =
    _interface.props
  const extendsKeyword = _extends
    ? ' extends ' + _extends
    : ''
  const body = formatChildren(_interface.props.children)
    .map((x) => '  ' + renderContent(context, x, true))
    .join('\n')
  const interfaceDefinition = `interface ${_interface.props.name}${extendsKeyword} {\n${body}\n}`
  const exportKeyword =
    _export === 'default'
      ? 'export default '
      : _export
        ? 'export '
        : ''
  return `${exportKeyword}${interfaceDefinition}`
}
