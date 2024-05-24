import { GeckoChild, GeckoChildren } from '..'

export function formatChildren(
  x: GeckoChildren
): GeckoChild[] {
  return ((Array.isArray(x) ? x : [x]) as GeckoChild[])
    .flat(Infinity)
    .filter((x) => typeof x !== 'undefined' && x !== null)
}
