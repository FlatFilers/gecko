export function applyTemplates(
  templates: string[],
  rawContent: string,
  replacements: Record<string, string>
): [string, string] {
  let body = rawContent
  let unreplacedBody = rawContent
  let intermediate: string = ''
  let unreplaced: string = ''
  const replacementsArray = Object.entries(replacements)
  for (const template of templates) {
    intermediate = template
    unreplaced = template
    for (const [key, value] of replacementsArray) {
      do {
        intermediate = intermediate.replace(key, value)
      } while (intermediate.indexOf(key) > -1)
    }
    body = intermediate.replace('{{body}}', body)
    unreplacedBody = unreplaced.replace('{{body}}', body)
  }
  return [body, unreplacedBody]
}
