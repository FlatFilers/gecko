import { Method, MethodProps } from './Method'

export function Set(
  props: Pick<
    MethodProps,
    | 'children'
    | 'name'
    | 'private'
    | 'protected'
    | 'public'
    | 'undocumented'
  > & {
    argument: string
  }
) {
  return Method({
    ...props,
    accessor: 'set',
    arguments: [props.argument],
  })
}
