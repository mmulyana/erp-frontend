import Navbar from '@/components/navbar'
import { useAccounts } from '@/utils/api/use-account'
import { usePermissionsGroup } from '@/utils/api/use-permission'
import { useRoles } from '@/utils/api/use-roles'
import { PATH } from '@/utils/constant/_paths'
import { Separator } from '@radix-ui/react-separator'
import { KeyRound, Shield, Users2 } from 'lucide-react'
import React, { useMemo } from 'react'

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
    <>
      <div className='max-w-full mx-auto px-4 pt-4'>
        <div className='mb-4'>
          <p className='text-xl text-gray-800'>Account & Role Management</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4'>
          <div className='rounded-lg border border-gray-200 bg-white h-fit p-2'>
            <div className='pt-0.5 px-2'>
              <span className='text-sm text-gray-600 font-medium'>Menus</span>
            </div>
            <Separator className='my-1.5' />
            <Navbar
              variant='vertical'
              links={[
                {
                  title: 'Users',
                  label: accounts?.toString(),
                  icon: Users2,
                  path: PATH.ACCOUNT,
                },
                {
                  title: 'Roles',
                  label: roles?.toString(),
                  icon: KeyRound,
                  path: PATH.ROLES,
                },
                {
                  title: 'Permission',
                  label: groups?.toString(),
                  icon: Shield,
                  path: PATH.ROLES_PERMISSION,
                },
              ]}
            />
          </div>
          <div className='pb-10'>{children}</div>
        </div>
      </div>
      <div className='fixed top-0 left-0 w-full h-screen bg-common-background-1 -z-10' />
    </>
  )
}
