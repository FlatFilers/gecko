import { DataPrompt, Text, geckoJSX } from '@flatfile/gecko'

export function CountrySelector() {
  return (
    <>
      <Text>{`<select>`}</Text>
      <DataPrompt
        input="list of every country in the world"
        type="{code: string, name: string}[]"
      >
        {(countries: { code: string; name: string }[]) => (
          <>
            {countries.map(({ code, name }) => (
              <Text>{`<option value=${code}>${name}</option>`}</Text>
            ))}
          </>
        )}
      </DataPrompt>
      <Text>{`</select>`}</Text>
    </>
  )
}
