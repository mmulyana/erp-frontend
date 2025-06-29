import { atomWithStorage } from 'jotai/utils'

export const viewMode = atomWithStorage<'table' | 'grid'>('viewMode', 'table')
