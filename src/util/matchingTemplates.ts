import { isMatch } from 'micromatch'
import { CommitContext } from '../types/CommitContext'

export function matchingTemplates(
  context: CommitContext,
  fileName: string
): string[] {
  const templateMatches: string[] = []
  for (
    let i = context.fileTemplateStack.length - 1;
    i >= 0;
    i--
  ) {
    const fileTemplateElement = context.fileTemplateStack[i]
    for (const fileTemplate of fileTemplateElement.props
      .templates) {
      if (isMatch(fileName, fileTemplate.match)) {
        templateMatches.push(fileTemplate.template)
      }
    }
  }
  return templateMatches
}
