import { KeyRound, Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table'
import { columns } from './_components/columns'
import { useRoles } from '@/utils/api/use-roles'
import { useState } from 'react'
import AddModal from './_components/add-modal'
import { Layout } from '../component'

export default function Roles() {
  const { data } = useRoles()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Layout>
        <div className='w-full h-fit rounded-md border border-gray-200 bg-white p-4'>
          <div className='flex gap-2'>
            <div className='w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center'>
              <KeyRound className='h-4 w-4 text-blue-500' />
            </div>
            <div>
              <p className='text-xl font-medium text-gray-800'>Roles</p>
              <p className='text-sm text-gray-600'>Manage Roles</p>
            </div>
          </div>
        </div>
        <div className='w-full h-fit rounded-md border border-gray-200 bg-white mt-4'>
          <div className='py-2.5 px-4 flex justify-between items-center'>
            <span className='text-sm text-gray-800 font-medium'>Roles</span>
            <Button
              variant='default'
              onClick={() => setIsOpen(!isOpen)}
              className='gap-1 flex items-center px-2 py-1.5 h-fit rounded hover:bg-brand-blue hover:text-white'
            >
              <Plus className='h-4 w-4' />{' '}
              <span className='text-xs'>New Role</span>
            </Button>
          </div>
          <Separator />
          <div className='p-4'>
            <DataTable data={data?.data.data.roles || []} columns={columns} />
          </div>
        </div>
      </Layout>
      <AddModal open={isOpen} setOpen={setIsOpen} />
    </>
  )
}
