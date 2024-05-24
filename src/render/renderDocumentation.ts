import { DocumentationFormat } from '../tags/Documented'
import { CommitContext } from '../types/CommitContext'

export function renderDocumentation<T>(
  context: CommitContext,
  formats: Record<DocumentationFormat, (x: T) => string>,
  subject: T
): string {
  const documentationFormats = new Set()
  for (const doc of context.documentedStack) {
    for (const format of doc.props.formats) {
      documentationFormats.add(format)
    }
  }
  if (
    documentationFormats.has(DocumentationFormat.JSDoc) &&
    DocumentationFormat.JSDoc in formats
  ) {
    return formats[DocumentationFormat.JSDoc](subject)
  }
  return ''
}
