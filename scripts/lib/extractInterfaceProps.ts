import ts from 'typescript'

export interface DocumentedType {
  description?: string
  required: boolean
  type: string
}

export function extractInterfaceProps(
  fileName: string,
  interfaceName: string
): Record<string, DocumentedType> {
  const program = ts.createProgram([fileName], {})
  const sourceFile = program.getSourceFile(fileName)
  const typeChecker = program.getTypeChecker()

  if (!sourceFile) {
    throw new Error(
      `Could not find source file: ${fileName}`
    )
  }

  function getJSDocComment(
    node: ts.Node
  ): string | undefined {
    const jsDocComments = ts.getJSDocCommentsAndTags(
      node
    ) as ts.JSDoc[]
    if (jsDocComments && jsDocComments.length > 0) {
      const comment = jsDocComments[0].comment
      return typeof comment === 'object' &&
        'length' in comment
        ? comment.join('\n')
        : comment
    }
    return undefined
  }

  const result: Record<string, DocumentedType> = {}

  function visit(node: ts.Node) {
    if (
      (ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node)) &&
      node.name.text === interfaceName
    ) {
      const symbol = typeChecker.getSymbolAtLocation(
        node.name
      )
      if (symbol) {
        const type =
          typeChecker.getDeclaredTypeOfSymbol(symbol)
        const properties =
          typeChecker.getPropertiesOfType(type)

        properties.forEach((prop) => {
          const propType =
            typeChecker.getTypeOfSymbolAtLocation(
              prop,
              node
            )
          const propTypeName = typeChecker.typeToString(
            propType,
            undefined,
            ts.TypeFormatFlags.NoTruncation
          )
          const declarations = prop.declarations
          if (declarations) {
            const propNode = declarations[0]
            const isOptional =
              declarations &&
              declarations.some(
                (d) =>
                  ts.isPropertySignature(d) &&
                  d.questionToken !== undefined
              )
            const description = getJSDocComment(propNode)
            result[prop.name] = {
              description,
              required: !isOptional,
              type: propTypeName,
            }
          }
        })
      }
    }

    ts.forEachChild(node, visit)
  }

  if (sourceFile) {
    visit(sourceFile)
  }

  return result
}
