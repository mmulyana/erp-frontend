import { useAtomValue } from 'jotai'
import { permissionAtom } from '@/shared/store/permission'

export const useHasPermission = (requiredPermissions: string[]): boolean => {
	const permissions = useAtomValue(permissionAtom)
	return (
		requiredPermissions.length === 0 ||
		requiredPermissions.some((p) => permissions.includes(p))
	)
}
