import { readFile } from 'fs/promises'

export async function loadFileMaybe(filePath: string) {
  try {
    const content = await readFile(filePath, {
      encoding: 'utf-8',
    })
    return content
  } catch (e) {}
}
