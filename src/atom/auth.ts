import { User } from '@/utils/types/api'
import { atom } from 'jotai'

export const userAtom = atom<User | null>(null)
