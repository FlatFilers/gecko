export function contentIsEquivalent(
  unreplacedContent: string,
  existing: string,
  updated: string,
  replacements: Record<string, string>
) {
  const position = {
    unreplacedContent: 0,
    existing: 0,
    updated: 0,
  }
  const replacementEntries = Object.entries(replacements)
  while (true) {
    const nextUnreplacedPositions = (
      replacementEntries.map(([search]) => [
        unreplacedContent.indexOf(
          search,
          position.unreplacedContent
        ),
        search,
      ]) as [number, string][]
    )
      .filter(([a]) => a > -1)
      .sort(([a], [b]) => a - b)
    const foundNext = nextUnreplacedPositions.shift()
    if (!foundNext) {
      break
    }
    const [nextUnreplacedPosition, search] = foundNext
    const moveLength =
      nextUnreplacedPosition - position.unreplacedContent
    const diffs = {
      existing: existing.substring(
        position.existing,
        moveLength
      ),
      updated: updated.substring(
        position.updated,
        moveLength
      ),
    }
    if (diffs.existing !== diffs.updated) {
      return false // something changed between replacement areas
    }
    position.unreplacedContent += moveLength
    position.existing += moveLength
    position.updated += moveLength
    const replace = replacements[search]
    if (search === '{{timestamp}}') {
      if (replace.length !== 20) {
        throw new Error(
          `Timestamp expected to be 20 characters, if changing timestamp format update this code`
        )
      }
      // we don't consider the file different if the timestamp has changed, as long as it is still 20 characters
      const existingValue = existing.substring(
        position.existing,
        position.existing + 20
      )
      if (existingValue[existingValue.length - 1] === 'Z') {
        position.unreplacedContent += search.length
        position.existing += 20
        position.updated += 20
        continue
      } else {
        return false // not a valid timestamp
      }
    }
    const values = {
      existing: existing.substring(
        position.existing,
        position.existing + replace.length
      ),
      updated: updated.substring(
        position.updated,
        position.updated + replace.length
      ),
    }
    if (values.existing !== values.updated) {
      return false // something changed in the replacement area
    }
    position.unreplacedContent += search.length
    position.existing += replace.length
    position.updated += replace.length
  }
  const remainder = {
    existing: existing.substring(position.existing),
    updated: updated.substring(position.updated),
  }
  return remainder.existing === remainder.updated
}
