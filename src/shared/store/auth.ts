import { atom } from 'jotai'
import { User } from '../types/api'

export const userAtom = atom<User | null>(null)
