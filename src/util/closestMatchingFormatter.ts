import { isMatch } from 'micromatch'
import { GeckoFileFormatterElement } from '../tags/FileFormatter'
import { CommitContext } from '../types/CommitContext'

export function closestMatchingFormatter(
  context: CommitContext,
  fileName: string
): undefined | GeckoFileFormatterElement {
  for (
    let i = context.fileFormatterStack.length - 1;
    i >= 0;
    i--
  ) {
    const formatter = context.fileFormatterStack[i]
    if (isMatch(fileName, formatter.props.match)) {
      return formatter
    }
  }
}
