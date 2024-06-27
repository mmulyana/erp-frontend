import Navbar from '@/components/navbar'
import { useAccounts } from '@/utils/api/use-account'
import { useRoles } from '@/utils/api/use-roles'
import { PATH } from '@/utils/constant/_paths'
import { Separator } from '@radix-ui/react-separator'
import { KeyRound, Shield, Users2 } from 'lucide-react'
import React from 'react'

export default function Layout({ children }: React.PropsWithChildren) {
  const { data: dataAccounts } = useAccounts()
  const { data: dataRoles } = useRoles()

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
                  label: dataAccounts?.length || '0',
                  icon: Users2,
                  path: PATH.ACCOUNT,
                },
                {
                  title: 'Roles',
                  label: dataRoles?.length || '0',
                  icon: KeyRound,
                  path: PATH.ROLES,
                },
                {
                  title: "Permission",
                  label: "",
                  icon: Shield,
                  path: PATH.ROLES_PERMISSION
                }
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
