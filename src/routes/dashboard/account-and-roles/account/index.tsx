import { useAccounts } from '@/utils/api/use-account'
import { Plus, Users2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table'
import { columns } from './_components/columns'
import Layout from '../_components/layout'
import { useState } from 'react'
import AddModal from './_components/add-modal'

export default function Account() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data } = useAccounts()

  return (
    <>
      <Layout>
        <div className='w-full h-fit rounded-md border border-gray-200 bg-white p-4'>
          <div className='flex gap-2'>
            <div className='w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center'>
              <Users2 className='h-4 w-4 text-blue-500' />
            </div>
            <div>
              <p className='text-xl font-medium text-gray-800'>Accounts </p>
              <p className='text-sm text-gray-600'>Invite or manage account</p>
            </div>
          </div>
        </div>
        <div className='w-full h-fit rounded-md border border-gray-200 bg-white mt-4'>
          <div className='py-2.5 px-4 flex justify-between items-center'>
            <span className='text-sm text-gray-800 font-medium'>Account</span>
            <Button
              variant='default'
              className='gap-1 flex items-center px-2 py-1.5 h-fit rounded hover:bg-brand-blue hover:text-white'
              onClick={() => setIsOpen(!isOpen)}
            >
              <Plus className='h-4 w-4' />{' '}
              <span className='text-xs'>New Account</span>
            </Button>
          </div>
          <Separator />
          <div className='p-4'>
            <DataTable data={data || []} columns={columns} />
          </div>
        </div>
      </Layout>
      <AddModal open={isOpen} setOpen={setIsOpen} />
    </>
  )
}
