import fsPromises from 'fs/promises'

export interface DataItem {
  id: string
  [key: string]: any
}

export class MockORM<T extends DataItem> {
  private jsonFilePath: string

  constructor(filePath: string) {
    this.jsonFilePath = filePath
  }

  private async readData(): Promise<T[]> {
    try {
      const data = await fsPromises.readFile(
        this.jsonFilePath,
        'utf-8',
      )
      return JSON.parse(data)
    } catch (error) {
      if (error.code === 'ENOENT') {
        return []
      }
      throw error
    }
  }

  private async writeData(data: T[]): Promise<void> {
    await fsPromises.writeFile(
      this.jsonFilePath,
      JSON.stringify(data),
      'utf-8',
    )
  }

  async select(
    limit: number,
    offset: number,
    where?: object,
  ): Promise<T[]> {
    const data = await this.readData()
    let filteredData = data

    if (where) {
      filteredData = data.filter((item) => {
        for (const key in where) {
          if (item[key] !== where[key]) {
            return false
          }
        }
        return true
      })
    }

    return filteredData.slice(offset, offset + limit)
  }

  async insert(data: object): Promise<string> {
    const existingData = await this.readData()
    const newId = (
      Math.max(
        ...existingData.map((item) => parseInt(item.id)),
        0,
      ) + 1
    ).toString()
    const newItem = { id: newId, ...data } as T
    existingData.push(newItem)
    await this.writeData(existingData)
    return newId
  }

  async update(id: string, data: object): Promise<void> {
    const existingData = await this.readData()
    const itemIndex = existingData.findIndex(
      (item) => item.id === id,
    )
    if (itemIndex === -1) {
      throw new Error(`Item with id ${id} not found`)
    }
    Object.assign(existingData[itemIndex], data)
    await this.writeData(existingData)
  }

  async delete(id: string): Promise<boolean> {
    const existingData = await this.readData()
    const updatedData = existingData.filter(
      (item) => item.id !== id,
    )
    await this.writeData(updatedData)
    return updatedData.length < existingData.length
  }
}
