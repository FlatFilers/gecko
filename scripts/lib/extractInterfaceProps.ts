import ts from 'typescript'

export function extractInterfaceProps(
  fileName: string,
  interfaceName: string
): Record<string, any> {
  const program = ts.createProgram([fileName], {})
  const sourceFile = program.getSourceFile(fileName)
  const typeChecker = program.getTypeChecker()

  if (!sourceFile) {
    throw new Error(
      `Could not find source file: ${fileName}`
    )
  }

  const result: Record<string, any> = {}

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
          const propTypeName =
            typeChecker.typeToString(propType)
          const declarations = prop.declarations
          const isOptional =
            declarations &&
            declarations.some(
              (d) =>
                ts.isPropertySignature(d) &&
                d.questionToken !== undefined
            )

          result[prop.name] = {
            type: propTypeName,
            required: !isOptional,
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
