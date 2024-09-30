import { Plus, Shield } from 'lucide-react'
import { usePermissionsGroup } from '@/hooks/api/use-permission'
import { useEffect, useMemo, useState } from 'react'
import { PermissionGroup } from '@/utils/types/permision-group'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import AddModal from './_components/add-modal'
import EditModal from './_components/edit-modal'
import { Layout } from '../component'

export default function Permission() {
  const { data, isLoading } = usePermissionsGroup()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)
  const [id, setId] = useState<number | undefined>(undefined)

  const groups = useMemo(() => {
    if (isLoading) return []
    return data?.data.data.groups
  }, [data])

  useEffect(() => {
    if (!isOpenEdit) setId(undefined)
  }, [isOpenEdit])

  return (
    <>
      <Layout>
        <div className='w-full h-fit rounded-md border border-gray-200 bg-white p-4 flex justify-between items-center'>
          <div className='flex gap-2'>
            <div className='w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center'>
              <Shield className='h-4 w-4 text-blue-500' />
            </div>
            <div>
              <p className='text-xl font-medium text-gray-800'>Permission</p>
              <p className='text-sm text-gray-600'>Manage Permission</p>
            </div>
          </div>
          <Button
            variant='default'
            onClick={() => setIsOpen(!isOpen)}
            className='gap-1 flex items-center px-2 py-1.5 h-fit rounded hover:bg-brand-blue hover:text-white'
          >
            <Plus className='h-4 w-4' />{' '}
            <span className='text-xs'>Add permission</span>
          </Button>
        </div>
        <div className='w-full h-fit rounded-md mt-4 flex flex-col gap-6'>
          {groups.map((group: PermissionGroup) => (
            <div
              key={group.id}
              className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 p'
            >
              <div className='md:px-4'>
                <h5 className='text-gray-800 capitalize font-medium'>
                  {group.name}
                </h5>
                <p className='mt-0.5 text-sm text-gray-400'>
                  {group.description || ''}
                </p>
              </div>
              <div className='bg-white border border-gray-200 rounded-md'>
                <div className='py-2.5 px-4 flex justify-between items-center'>
                  <p className='text-sm text-gray-700'>Permissions</p>
                  <Button
                    variant='secondary'
                    className='gap-1 flex items-center px-2 py-1.5 h-fit rounded hover:bg-gray-200'
                    onClick={() => {
                      setIsOpenEdit(!isOpenEdit)
                      setId(group.id)
                    }}
                  >
                    <Plus className='h-4 w-4' />{' '}
                    <span className='text-xs'>Edit</span>
                  </Button>
                </div>
                <Separator />
                <div className='p-4'>
                  <Table className='rounded-md overflow-hidden'>
                    <TableHeader className='bg-gray-50'>
                      <TableRow className='rounded-t-md'>
                        <TableHead className='w-[10px] h-fit py-2.5'>
                          <span className='text-sm font-normal text-gray-800'>
                            No
                          </span>
                        </TableHead>
                        <TableHead className=' h-fit py-2.5'>
                          <span className='text-sm font-normal text-gray-800'>
                            Name
                          </span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.permissions.map((permission, index) => (
                        <TableRow key={permission.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {permission.name.replace('_', ' ')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
      <AddModal open={isOpen} setOpen={setIsOpen} />
      <EditModal open={isOpenEdit} setOpen={setIsOpenEdit} id={id} />
    </>
  )
}
