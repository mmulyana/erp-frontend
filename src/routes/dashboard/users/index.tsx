import { useAccounts } from '@/utils/api/use-account'
import { Nav } from './nav'
import { KeyRound, Plus, Users2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useRoles } from '@/utils/api/use-roles'

export default function Users() {
  const { data: dataAccounts } = useAccounts()
  const { data: dataRoles } = useRoles()

  return (
    <>
      <div className='max-w-5xl mx-auto px-4 pt-4'>
        <div className='mb-4'>
          <p className='text-xl text-gray-800'>Account Management</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4'>
          <div className='rounded-md border border-gray-200 bg-white h-fit p-2'>
            <div className='pt-0.5 px-2'>
              <span className='text-sm text-gray-600 font-medium'>Menus</span>
            </div>
            <Separator className='my-1.5' />
            <Nav
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
          <div>
            <div className='w-full h-fit rounded-md border border-gray-200 bg-white p-4'>
              <div className='flex gap-2'>
                <div className='w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center'>
                  <Users2 className='h-4 w-4 text-blue-500' />
                </div>
                <div>
                  <p className='text-xl font-medium text-gray-800'>Users </p>
                  <p className='text-sm text-gray-600'>
                    Invite or manage users
                  </p>
                </div>
              </div>
            </div>
            <div className='w-full h-fit rounded-md border border-gray-200 bg-white mt-4'>
              <div className='py-2.5 px-4 flex justify-between items-center'>
                <span className='text-sm text-gray-800 font-medium'>
                  Account
                </span>
                <Button
                  variant='ghost'
                  className='gap-1 flex items-center px-2 py-1.5 h-fit rounded hover:bg-brand-blue hover:text-white'
                >
                  <Plus className='h-4 w-4' />{' '}
                  <span className='text-xs'>New Account</span>
                </Button>
              </div>
              <Separator />
              <div className='p-4'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='fixed top-0 left-0 w-full h-screen bg-common-background-1 -z-10' />
    </>
  )
}
