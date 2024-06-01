import { Dispatch, SetStateAction } from 'react'

export type TypeSetState<T = unknown> = Dispatch<SetStateAction<T>>
