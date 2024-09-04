import { GeckoTypeElement } from '../tags/Type'
import { CommitContext } from '../types/CommitContext'
import { formatChildren } from '../util/formatChildren'
import { renderContent } from './renderContent'

export function renderType(
  context: CommitContext,
  _type: GeckoTypeElement
) {
  const body = formatChildren(_type.props.children)
    .map((x) => '  ' + renderContent(context, x, true))
    .join('\n')
  const typeDefinition = `type ${_type.props.name} = ${body}`

  if (_type.props.export === 'default') {
    return `export default ${typeDefinition}`
  }

  return `${_type.props.export ? 'export ' : ''}${typeDefinition}`
}
