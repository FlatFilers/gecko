import { GeckoCollectElement } from '../tags/Collect'
import { GeckoPartElement } from '../tags/Part'
import {
  CommitContext,
  PartElementsByOrder,
} from '../types/CommitContext'
import { formatChildren } from '../util/formatChildren'
import { renderContent } from './renderContent'

export function renderCollect(
  context: CommitContext,
  collect: GeckoCollectElement
) {
  if (
    Array.isArray(collect.props.children)
      ? collect.props.children.length > 0
      : collect.props.children !== undefined
  ) {
    throw new Error(
      '<Collect> can not contain any children'
    )
  }
  const partsByOrder: PartElementsByOrder | undefined =
    context.partsByTagAndOrder.get(collect.props.tag)
  if (partsByOrder === undefined) {
    return ''
  }
  const allParts: GeckoPartElement[] = Array.from(
    partsByOrder.keys()
  )
    .sort()
    .flatMap((k) => partsByOrder.get(k) ?? [])
  return formatChildren(
    allParts.map((x) => x.props.children)
  )
    .map((x) => renderContent(context, x))
    .join('\n')
}
