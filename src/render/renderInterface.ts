import { GeckoInterfaceElement } from '../tags/Interface'
import { CommitContext } from '../types/CommitContext'
import { formatChildren } from '../util/formatChildren'
import { renderContent } from './renderContent'

export function renderInterface(
  context: CommitContext,
  _interface: GeckoInterfaceElement
) {
  const _extends = _interface.props.extends
    ? ' extends ' + _interface.props.extends
    : ''
  const body = formatChildren(_interface.props.children)
    .map((x) => '  ' + renderContent(context, x, true))
    .join('\n')
  const interfaceDefinition = `interface ${_interface.props.name}${_extends} {\n${body}\n}`

  if (_interface.props.export === 'default') {
    return `export default ${interfaceDefinition}`
  }
  return `${_interface.props.export ? 'export ' : ''}${interfaceDefinition}`
}
