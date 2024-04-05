/** @jsx geckoJSX */
import {
  File,
  Folder,
  geckoJSX,
  Root,
  Text,
} from '@flatfile/gecko'
import { CalculatorButton } from './templates/CalculatorButton'

export default function () {
  return (
    <Root path="project/src/gecko_generated" erase>
      <File name="readme.md">
        <Text>Hello world</Text>
      </File>
      <Folder name="components">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <File name={`Digit${digit}.tsx`}>
            <CalculatorButton digit={digit} />
          </File>
        ))}
      </Folder>
    </Root>
  )
}
