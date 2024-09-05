import { GeckoReturnElement } from '../tags/Return'
import { CommitContext } from '../types/CommitContext'
import { formatChildren } from '../util/formatChildren'
import { renderContent } from './renderContent'

export function renderReturn(
  context: CommitContext,
  _return: GeckoReturnElement
) {
  const { children } = _return.props
  const body = formatChildren(children)
    .map((x) => renderContent(context, x, false, false))
    .join(' ')
  return `  return ${body}`
}
