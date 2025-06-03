import { GeckoImportTypeElement } from '../tags/ImportType'
import { CommitContext } from '../types/CommitContext'

export function renderImportType(
  context: CommitContext,
  importType: GeckoImportTypeElement
) {
  const { from, named } = importType.props

  if (!named || named.length === 0) {
    return ''
  }

  return `import type { ${named.join(', ')} } from '${from}'`
} 