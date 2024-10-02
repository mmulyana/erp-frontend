import { ColumnDef } from '@tanstack/react-table'
import Container from '../../_component/container'
import { DashboardLayout } from '../../_component/layout'
import TopHeader from '../_component/top-header'
import { Supplier as SupplierType } from '@/utils/types/api'
import Chips from '@/components/common/chips'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import { useCreateSupplier, useSupplier } from '@/hooks/api/use-supplier'
import { useMemo, useState } from 'react'
import { DataTable } from '@/components/data-table'
import Overlay from '@/components/common/overlay'
import { generatePath, Link } from 'react-router-dom'
import { PATH } from '@/utils/constant/_paths'
import { useTitle } from '../../_component/header'
import { links } from './data'
import { useForm, Controller } from 'react-hook-form'
import Modal from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

export default function Supplier() {
  useTitle(links)

  const { data: dataSupplier, isLoading } = useSupplier({})
  const data = useMemo(() => dataSupplier?.data?.data, [isLoading])

  const columns: ColumnDef<SupplierType>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => {
        const detail = row.original.name.split(' ').join('-')
        return (
          <Overlay
            className='w-fit pr-2.5'
            overlay={
              <Link
                to={generatePath(PATH.INVENTORY_SUPPLIER_EMPLOYEE, {
                  detail: `${detail}-${row.original.id}`,
                })}
                className='absolute -right-0 translate-x-full text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] top-1/2 -translate-y-1/2 bg-white hover:shadow-sm hover:shadow-gray-200'
              >
                Lihat
              </Link>
            }
          >
            <Link
              to={generatePath(PATH.INVENTORY_SUPPLIER_EMPLOYEE, {
                detail: `${detail}-${row.original.id}`,
              })}
            >
              {row?.original?.name}
            </Link>
          </Overlay>
        )
      },
    },
    {
      accessorKey: 'phone',
      header: 'Kontak',
    },
    {
      accessorKey: 'address',
      header: 'Alamat',
    },
    {
      id: 'tag',
      header: 'Tag',
      cell: ({ row }) => {
        return (
          <div className='flex gap-2 flex-wrap items-center max-w-[120px]'>
            {row.original.tags.map((item, index) => (
              <div
                key={index}
                className='text-sm px-2 py-0.5 rounded-full bg-[#4EB4CA]/10 text-[#4EB4CA]'
              >
                {item.tag.name}
              </div>
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <Chips status={row.original.status} />,
    },
    {
      id: 'action',
      cell: () => (
        <div className='flex justify-end'>
          <Button
            variant='outline'
            className='p-0.5 rounded-[6px] h-5 w-5 border-[#EFF0F2]'
          >
            <Ellipsis className='w-4 h-4 text-[#313951]' />
          </Button>
        </div>
      ),
    },
  ]

  // START OF HANDLE FORM
  const { mutate } = useCreateSupplier()
  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      status: '',
      tags: [],
      photo: null as File | null,
    },
  })

  const [open, setOpen] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const onSubmit = (data: any) => {
    mutate(
      { payload: data },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }

  const validateFileSize = (file: File | null) => {
    if (!file) return true
    const maxSize = 5 * 1024 * 1024
    return file.size <= maxSize || 'File size must be less than 5MB'
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      form.setValue('photo', file)
    } else {
      setPhotoPreview(null)
      form.setValue('photo', null)
    }
  }
  // END OF HANDLE FORM

  return (
    <DashboardLayout>
      <Container className='flex flex-col gap-4'>
        <TopHeader title='Supplier' onClick={() => setOpen(true)} />
        <DataTable
          columns={columns}
          data={data || []}
          isLoading={isLoading}
          withLoading
          withPagination
        />
      </Container>
      <Modal title='Buat supplier' open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='p-4 space-y-4'>
              <FormField
                label='Nama'
                control={form.control}
                name='name'
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                label='No. Telp'
                control={form.control}
                name='phone'
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                label='Email'
                control={form.control}
                name='email'
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                label='Alamat'
                control={form.control}
                name='address'
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                label='Photo'
                control={form.control}
                name='photo'
                rules={{ validate: validateFileSize }}
                render={({
                  field: { value, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <div>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        handlePhotoChange(e)
                        onChange(e.target.files?.[0] || null)
                      }}
                      {...field}
                    />
                    {photoPreview && (
                      <img
                        src={photoPreview}
                        alt='Preview'
                        className='mt-2 max-w-xs max-h-40 object-contain'
                      />
                    )}
                  </div>
                )}
              />
              <Controller
                name='status'
                control={form.control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild className='w-full'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full justify-start'
                        type='button'
                      >
                        {field.value ? (
                          <span>{field.value}</span>
                        ) : (
                          <span>Pilih Status</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='p-0' side='right' align='start'>
                      <Command>
                        <CommandInput placeholder='Change status...' />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                            {['active', 'nonactive'].map(
                              (item: string, index: number) => (
                                <CommandItem
                                  key={index}
                                  value={item}
                                  onSelect={(value) => {
                                    form.setValue('status', value)
                                  }}
                                >
                                  <span>{item}</span>
                                </CommandItem>
                              )
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
            <div className='rounded-b-md px-4 py-4 bg-[#F4F4F7] border-t border-[#EFF0F2] flex justify-end gap-2 items-center'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
              <Button>Simpan</Button>
            </div>
          </form>
        </Form>
      </Modal>
    </DashboardLayout>
  )
}
