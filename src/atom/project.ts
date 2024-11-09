import { atom } from 'jotai'

export const projectAtom = atom<{ id: number; open: boolean } | null>(null)
