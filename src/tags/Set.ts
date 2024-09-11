import { Method, MethodProps } from './Method'

export type SetProps = Pick<
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

export function Set(props: SetProps) {
  return Method({
    ...props,
    accessor: 'set',
    arguments: [props.argument],
  })
}
