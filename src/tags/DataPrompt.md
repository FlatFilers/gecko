A data prompt, which prompts an AI agent to return the specified data in the given TypeScript type format before continuing code generation.

Example:

```tsx
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
```

Produces:

```tsx
<select>
  <option value="AF">Afghanistan</option>
  <option value="AL">Albania</option>
  <option value="DZ">Algeria</option>
  <option value="AS">American Samoa</option>
  <option value="AD">Andorra</option>
  <option value="AO">Angola</option>
  <option value="AI">Anguilla</option>
  <option value="AQ">Antarctica</option>
  <option value="AG">Antigua and Barbuda</option>
  <option value="AR">Argentina</option>
  ... (185 more countries)
</select>
```
