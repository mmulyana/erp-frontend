import { atom } from 'jotai'
import { Permission } from '@/utils/types/permission'

export const permissionAtom = atom<Permission | null>(null)
