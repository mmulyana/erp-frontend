import { permissionAtom } from '@/shared/store/permission'
import { useAtomValue } from 'jotai'

export default function usePermission(): string[] {
  const permission = useAtomValue(permissionAtom)
  return permission
}
