export function prettySize(size: number): string {
  const units = ['b', 'kb', 'Mb', 'Gb', 'Tb']
  let unitIndex = 0
  let scaledSize = size

  while (
    scaledSize >= 1024 &&
    unitIndex < units.length - 1
  ) {
    unitIndex += 1
    scaledSize /= 1024
  }

  // For sizes less than 1024, return without decimal places
  if (unitIndex === 0) {
    return `${scaledSize}${units[unitIndex]}`
  }

  // For larger sizes, use toFixed(1) to get one decimal place,
  // then use parseFloat to remove trailing zeros
  return `${parseFloat(scaledSize.toFixed(1))}${units[unitIndex]}`
}
