export function formatMilliseconds(time: number) {
  return `${(time / 1e3).toPrecision(3)}s`
}
