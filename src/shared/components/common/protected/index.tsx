import { permissionAtom } from '@/shared/store/permission'
import { Permission } from '@/shared/utils/with-permission'
import { useAtomValue } from 'jotai'
import React from 'react'

type Props = {
  children: React.ReactNode
  required: string[]
  fallback?: React.ReactNode
}
export default function ProtectedComponent({
  children,
  required,
  fallback,
}: Props) {
  const permission = useAtomValue(permissionAtom)

  return (
    <Permission
      requiredPermissions={required}
      userPermissions={permission}
      fallback={fallback}
    >
      {children}
    </Permission>
  )
}
