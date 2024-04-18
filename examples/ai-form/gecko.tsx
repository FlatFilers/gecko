import { File, geckoJSX, Root, Text } from '@flatfile/gecko'
import { CountrySelector } from './templates/CountrySelector'

const title = 'Gecko AI Form Example'

export default function () {
  return (
    <Root path="project" erase>
      <File name="index.html">
        <Text>{`<!doctype html>
<html>
 <head>
  <title>${title}</title>
  <link rel="stylesheet" href="./theme.css" type="text/css"/>
`}</Text>
        <Text>{`
 </head>
 <body>
`}</Text>
        <Text>{'<h1>Gecko AI Form Example</h1>'}</Text>
        <CountrySelector />
        <Text>{'</body>'}</Text>
      </File>
      <File name="theme.css">
        {`body {
 background-color: #384858;
 color: #c0a070;
 font-family: sans-serif;
 margin: 0;
 padding: 1em;
}`}
      </File>
    </Root>
  )
}
