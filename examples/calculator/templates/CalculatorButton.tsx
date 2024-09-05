import {
  Function,
  geckoJSX,
  Interface,
  Method,
  Object,
  Part,
  Property,
  Return,
  Text,
  Variable,
} from '@flatfile/gecko'

export function CalculatorButton({
  digit,
}: {
  digit: number
}) {
  return (
    <>
      <Interface name="DigitProps">
        <Method name="onClick" returnType="void" />
      </Interface>
      <Text />
      <Variable
        export
        name={`button${digit}`}
        type={
          <Object type>
            <Property
              name="digit"
              required
              type={digit.toString(10)}
            />
          </Object>
        }
      >
        <Object>
          <Property name="digit">
            {digit.toString(10)}
          </Property>
        </Object>
      </Variable>
      <Function
        export
        name={`Digit${digit}Button`}
        arguments={['{ onClick }: DigitProps']}
        returnType="JSX.Element"
      >
        <Return>{`<button onClick={onClick}>${digit}</button>`}</Return>
      </Function>
      <Part tag="readme" order={1}>
        <Text>## {`Digit${digit}Button`}</Text>
        <Text />
        <Text>
          Creates a button with the number "{digit}"
        </Text>
        <Text />
        <Text>To use this component:</Text>
        <Text>{`
\`\`\`
  import { Digit${digit} } from './components/Digit${digit}.tsx'

  <Digit${digit}Button onClick={() => alert(\`You clicked ${digit}!\`)} />
\`\`\`
`}</Text>
      </Part>
    </>
  )
}
