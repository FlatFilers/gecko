import {
  Function,
  geckoJSX,
  Interface,
  Method,
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
      <Function
        export
        name={`Digit${digit}Button`}
        arguments={['{ onClick }: DigitProps']}
        returnType="JSX.Element"
      >
        {`return <button onClick={onClick}>${digit}</button>`}
      </Function>
    </>
  )
}
