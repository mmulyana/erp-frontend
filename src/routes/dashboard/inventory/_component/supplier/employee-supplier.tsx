import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CreateSupplierEmployee } from '@/utils/types/form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  useCreateSupplierEmployee,
  useDeleteSupplierEmployee,
  useDetailSupplierEmployee,
  useSupplierEmployee,
  useUpdateSupplierEmployee,
} from '@/hooks/api/use-supplier-employee'
import { useApiData } from '@/hooks/use-api-data'

import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import Search from '@/components/common/search'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Pencil, Phone, Trash2 } from 'lucide-react'
import ProtectedComponent from '@/components/protected'
import EmptyState from '@/components/common/empty-state'

const schema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
  position: z.string().optional(),
})

type Props = {
  id?: number | null
}
export default function EmployeeSupplier({ id }: Props) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const { mutate: create } = useCreateSupplierEmployee()
  const { mutate: update } = useUpdateSupplierEmployee()
  const { mutate: remove } = useDeleteSupplierEmployee()

  const { data: detail, isLoading } = useDetailSupplierEmployee({
    enabled: !!selected,
    id: selected,
  })

  const { data: employees } = useApiData(
    useSupplierEmployee({ id, name: search, enabled: !!id })
  )

  const form = useForm<CreateSupplierEmployee>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      position: '',
    },
  })

  const submit = (data: CreateSupplierEmployee) => {
    if (selected) {
      update(
        { id: selected, payload: data },
        {
          onSuccess: () => {
            setSelected(null)
            setOpen(false)
            form.reset()
          },
        }
      )
      return
    }
    create(
      { payload: { ...data, supplierId: Number(id) } },
      {
        onSuccess: () => {
          form.reset()
          setOpen(false)
        },
      }
    )
  }

  useEffect(() => {
    if (!open) {
      form.reset()
    }
  }, [open])

  useEffect(() => {
    if (selected && detail && !isLoading) {
      const { name, position, phone } = detail.data.data || {}
      form.reset({
        name,
        phone: phone || '',
        position: position || '',
      })
    }
  }, [detail, isLoading, selected])

  return (
    <>
      <div className='p-4 pb-4'>
        <div className='flex justify-between items-center mb-4'>
          <Search withoutUrl onSearch={setSearch} debounceTime={500} />
          <ProtectedComponent required={['supplier-employee:create']}>
            <Button variant='secondary' onClick={() => setOpen(!open)}>
              Tambah
            </Button>
          </ProtectedComponent>
        </div>
        <div className='space-y-4'>
          {employees && !!employees.length ? (
            employees?.map((item) => (
              <div
                key={`employee-` + item.id}
                className='p-2.5 bg-white rounded-lg border border-line'
              >
                <div className='flex items-start justify-between'>
                  <div className='mb-2.5'>
                    <p className='text-lg text-dark'>{item.name}</p>
                    <p className='text-dark/50'>{item?.position}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <ProtectedComponent required={['supplier-employee:update']}>
                      <Button
                        variant='secondary'
                        className='p-0 w-6 h-6'
                        onClick={() => {
                          setSelected(item.id)
                          setOpen(!open)
                        }}
                      >
                        <Pencil size={14} />
                      </Button>
                    </ProtectedComponent>
                    <ProtectedComponent required={['supplier-employee:delete']}>
                      <Button
                        variant='secondary'
                        className='p-0 w-6 h-6'
                        onClick={() => {
                          remove({ id: item.id })
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </ProtectedComponent>
                  </div>
                </div>
                {item.phone && (
                  <div className='pt-4 border-t border-line border-dashed'>
                    <div className='flex gap-2 items-center'>
                      <Phone size={16} className='text-gray-500' />
                      {item.phone}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <Modal title='Buat Pegawai Baru' open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <ModalContainer setOpen={setOpen}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='col-span-1 md:col-span-2'>
                  <FormField
                    control={form.control}
                    name='name'
                    label='Nama'
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
                <FormField
                  label='Jabatan'
                  control={form.control}
                  name='position'
                  render={({ field }) => <Input {...field} />}
                />
                <FormField
                  label='Nomor telp'
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <div className='relative'>
                      <Input {...field} className='pl-9' />
                      <div className='absolute top-0 left-0 w-9 h-full flex justify-center items-center'>
                        <Phone size={16} className='text-gray-400' />
                      </div>
                    </div>
                  )}
                />
              </div>
            </ModalContainer>
          </form>
        </Form>
      </Modal>
    </>
  )
}
