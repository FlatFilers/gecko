import {
  DocumentationFormat,
  Documented,
  File,
  FileFormatter,
  FileTemplate,
  Folder,
  geckoJSX,
  Root,
  TemplateMatch,
  Text,
} from '@flatfile/gecko'

import { CalculatorButton } from './templates/CalculatorButton'

const generatedTypeScriptFile: TemplateMatch = {
  match: '*.(ts|tsx)',
  template: `/**
 * {{filename}}
 * Generated by Gecko at {{timestamp}}
 */
{{body}}`,
}

export default function () {
  return (
    <Root path="project/src/gecko_generated" erase>
      <FileFormatter
        formatter="prettier"
        match="*.(ts|tsx)"
      >
        <File once name="readme.md">
          <Text>Hello world</Text>
        </File>
        <FileTemplate templates={[generatedTypeScriptFile]}>
          <Documented formats={[DocumentationFormat.JSDoc]}>
            <Folder name="components">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                (digit) => (
                  <File name={`Digit${digit}.tsx`}>
                    <CalculatorButton digit={digit} />
                  </File>
                )
              )}
            </Folder>
          </Documented>
        </FileTemplate>
      </FileFormatter>
    </Root>
  )
}
