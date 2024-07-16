import React, { useMemo } from 'react'
import { useAccounts } from '@/utils/api/use-account'
import { usePermissionsGroup } from '@/utils/api/use-permission'
import { useRoles } from '@/utils/api/use-roles'
import { PATH } from '@/utils/constant/_paths'
import { Separator } from '@radix-ui/react-separator'
import { KeyRound, Shield, Users2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import { LucideIcon } from 'lucide-react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { DashboardLayout } from '../../component'

type Links = {
  title: string
  label?: string
  icon: LucideIcon
  path: string
}
interface navVertical {
  links: Links[]
}

export default function Layout({ children }: React.PropsWithChildren) {
  const { data: dataAccounts, isLoading: isLoadingAccount } = useAccounts()
  const { data: dataRoles, isLoading: isLoadingRoles } = useRoles()
  const { data: dataGroups, isLoading: isLoadingGroup } = usePermissionsGroup()

  const groups = useMemo(() => {
    if (isLoadingGroup) return '0'
    return dataGroups?.data.data.groups.length
  }, [dataGroups])

  const accounts = useMemo(() => {
    if (isLoadingAccount) return '0'
    return dataAccounts?.length
  }, [dataAccounts])

  const roles = useMemo(() => {
    if (isLoadingRoles) return '0'
    return dataRoles?.data.data.roles.length
  }, [dataRoles])

  return (
    <DashboardLayout>
      <div className='max-w-full mx-auto px-4 pt-2.5'>
        <div className='mb-4'>
          <p className='text-gray-800'>Account & Role Management</p>
        </div>
        <div className='pb-10'>{children}</div>
      </div>
    </DashboardLayout>
  )
}
