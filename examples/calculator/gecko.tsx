import {
  Afterwards,
  DocumentationFormat,
  Documented,
  File,
  FileFormatter,
  FileTemplate,
  Folder,
  geckoJSX,
  GeckoSource,
  Root,
  TemplateMatch,
  Text,
} from '@flatfile/gecko'

import { CalculatorButton } from './templates/CalculatorButton'

import { digitList } from './digitList.ts'

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
    <Root requires={['digitList.ts']}>
      <FileFormatter
        formatter="prettier"
        match="*.(ts|tsx)"
      >
        <FileTemplate templates={[generatedTypeScriptFile]}>
          <File name="digitList.ts">
            {/* notice we are writing to a file that gecko.tsx imports, and is listed in <Root requires={[]}> */}
            <Text>{`export const digitList = [${new Array(
              10
            )
              .fill(0)
              .map((_, i) => i)
              .join(', ')}]`}</Text>
          </File>
          <Folder name="project/src/gecko_generated">
            <File once name="readme.md">
              <Text>Hello world</Text>
            </File>
            <Documented
              formats={[DocumentationFormat.JSDoc]}
            >
              <Folder name="components">
                {digitList.map((digit) => (
                  <File name={`Digit${digit}.tsx`}>
                    <CalculatorButton digit={digit} />
                  </File>
                ))}
              </Folder>
              <Afterwards>
                {(s: GeckoSource) => (
                  <File name="digits.md">
                    {s
                      .match(/Digit\d\.tsx$/)
                      .map((file) => (
                        <Text>
                          {`Component '${
                            file.pathSegments?.[
                              file.pathSegments.length - 1
                            ]
                          }' (${file.content.length}b)`}
                        </Text>
                      ))}
                  </File>
                )}
              </Afterwards>
            </Documented>
          </Folder>
        </FileTemplate>
      </FileFormatter>
    </Root>
  )
}
