import { GeckoObjectElement } from '../tags/Object'
import { CommitContext } from '../types/CommitContext'
import { formatChildren } from '../util/formatChildren'
import { renderContent } from './renderContent'

export function renderObject(
  context: CommitContext,
  object: GeckoObjectElement
) {
  const body = formatChildren(object.props.children)
    .map(
      (x) =>
        '  ' +
        renderContent(context, x, object.props.type, true)
    )
    .join(',\n')
  return `{\n${body}\n}`
}
