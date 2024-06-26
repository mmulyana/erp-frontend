import Navbar from '@/components/navbar'
import { useAccounts } from '@/utils/api/use-account'
import { useRoles } from '@/utils/api/use-roles'
import { Separator } from '@radix-ui/react-separator'
import { KeyRound, Users2 } from 'lucide-react'
import React from 'react'

type Props = {
  title: string
}
export default function Layout({
  children,
  title = 'name',
}: React.PropsWithChildren & Props) {
  const { data: dataAccounts } = useAccounts()
  const { data: dataRoles } = useRoles()

  return (
    <>
      <div className='max-w-5xl mx-auto px-4 pt-4'>
        <div className='mb-4'>
          <p className='text-xl text-gray-800'>{title}</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4'>
          <div className='rounded-md border border-gray-200 bg-white h-fit p-2'>
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
                  variant: 'secondary',
                },
                {
                  title: 'Roles',
                  label: dataRoles?.length || '0',
                  icon: KeyRound,
                  variant: 'ghost',
                },
              ]}
            />
          </div>
          <div>{children}</div>
        </div>
      </div>
      <div className='fixed top-0 left-0 w-full h-screen bg-common-background-1 -z-10' />
    </>
  )
}
