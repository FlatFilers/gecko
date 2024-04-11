import { Function, geckoJSX, Text } from '@flatfile/gecko'

export function CalculatorButton({
  digit,
}: {
  digit: number
}) {
  return (
    <>
      <Text>
        {`interface DigitProps { onClick(): void }\n`}
      </Text>
      <Function
        export
        name={`Digit${digit}Button`}
        arguments={['{ onClick }: DigitProps']}
      >
        {`return <button onClick={onClick}>${digit}</button>`}
      </Function>
    </>
  )
}
