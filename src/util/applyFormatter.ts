import prettier from 'prettier'
import { GeckoFileFormatterElement } from '../tags/FileFormatter'

export async function applyFormatter(
  formatter: GeckoFileFormatterElement,
  content: string,
  filePath: string
): Promise<string> {
  switch (formatter.props.formatter) {
    case 'prettier':
      const prettierConfig =
        await prettier.resolveConfig(filePath)
      return prettier.format(content, {
        ...prettierConfig,
        filepath: filePath,
      })
    default:
      throw new Error(
        `${JSON.stringify(formatter.props.formatter)} is not a recognized gecko formatter`
      )
  }
}
