import { GeckoImportElement } from '../tags/Import'
import { CommitContext } from '../types/CommitContext'

export function renderImport(
  context: CommitContext,
  _import: GeckoImportElement
) {
  const { default: _default, from, named } = _import.props

  const importParts = [
    ...(_default ? [_default] : []),
    ...(named?.length ? [`{ ${named.join(', ')} }`] : []),
  ]

  const imports = importParts.length
    ? `${importParts.join(', ')} `
    : ''

  return `import ${imports}from'${from}'`
}
