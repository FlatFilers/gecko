import { Method, MethodProps } from './Method'

export type GetProps = Pick<
  MethodProps,
  | 'children'
  | 'name'
  | 'private'
  | 'protected'
  | 'public'
  | 'returnType'
  | 'undocumented'
>

export function Get(props: GetProps) {
  return Method({ ...props, accessor: 'get' })
}
