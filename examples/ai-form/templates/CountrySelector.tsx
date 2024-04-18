import { Prompt, Text, geckoJSX } from '@flatfile/gecko'

export function CountrySelector() {
  return (
    <>
      <Text>{`<select>`}</Text>
      <Prompt
        input="list of all countries"
        type="{code: string, name: string}[]"
      >
        {(countries: { code: string; name: string }[]) => (
          <>
            {countries.map(({ code, name }) => (
              <Text>{`<option value=${code}>${name}</option>`}</Text>
            ))}
          </>
        )}
      </Prompt>
      <Text>{`</select>`}</Text>
    </>
  )
}
