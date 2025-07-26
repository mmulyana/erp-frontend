import { ReactNode } from 'react'

type PermissionProps = {
  userPermissions: string[]
  requiredPermissions: string[]
  children: ReactNode
  fallback?: ReactNode
}

export function Permission({
  userPermissions = [],
  requiredPermissions = [],
  children,
  fallback = null,
}: PermissionProps) {
  const hasAnyPermission = (): boolean => {
    return requiredPermissions.some((permission) =>
      userPermissions.includes(permission)
    )
  }

  return hasAnyPermission() ? <>{children}</> : <>{fallback}</>
}

export const withPermission = (
  WrappedComponent: React.ComponentType,
  requiredPermissions: string[]
) => {
  return (props: any) => (
    <Permission
      userPermissions={props.userPermissions}
      requiredPermissions={requiredPermissions}
    >
      <WrappedComponent {...props} />
    </Permission>
  )
}
