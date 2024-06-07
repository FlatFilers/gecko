import { GeckoExportElement } from '../tags/Export'
import { CommitContext } from '../types/CommitContext'

export function renderExport(
  context: CommitContext,
  _export: GeckoExportElement
) {
  const { all, as, from, named, type } = _export.props

  if (typeof as === 'string' && !all) {
    throw new Error(
      `<Export> property "as" may only be specified if property "all" is specified, which exports * as {as}, for example <Export all as="default" from="..." />`
    )
  }

  const exportParts = [
    ...(all ? [as ? `* as ${as}` : '*'] : []),
    ...(named?.length ? [`{ ${named.join(', ')} }`] : []),
  ]

  if (exportParts.length === 0) {
    throw new Error(
      `<Export> must specify at least one of "all" or "named" properties`
    )
  }

  return `export ${type ? 'type ' : ''}${exportParts.join(', ')} from '${from}'`
}
