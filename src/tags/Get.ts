import { Method, MethodProps } from './Method'

export function Get(
  props: Pick<
    MethodProps,
    | 'children'
    | 'name'
    | 'private'
    | 'protected'
    | 'public'
    | 'returnType'
    | 'undocumented'
  >
) {
  return Method({ ...props, accessor: 'get' })
}
