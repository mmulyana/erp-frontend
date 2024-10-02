import { generatePath, useParams } from 'react-router-dom'
import { Title, useTitle } from '../../_component/header'
import { DashboardLayout } from '../../_component/layout'
import { useMemo, useState } from 'react'
import { PATH } from '@/utils/constant/_paths'
import { ColumnDef } from '@tanstack/react-table'
import { SupplierEmployee } from '@/utils/types/api'
import Chips from '@/components/common/chips'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import {
  useCreateSupplierEmployee,
  useSupplierEmployee,
} from '@/hooks/api/use-supplier-employee'
import TopHeader from '../_component/top-header'
import { DataTable } from '@/components/data-table'
import Container from '../../_component/container'
import useUrlState from '@ahooksjs/use-url-state'
import { links } from './data'
import { useForm, Controller } from 'react-hook-form'
import { CreateSupplierEmployee } from '@/utils/types/form'
import Modal, { ModalContainer } from '@/components/modal-v2'
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

export default function Employee() {
  const [url] = useUrlState({ name: '' })

  // HANDLE BREADCRUMB
  const { detail } = useParams()
  const [lastLink] = useState<any>(() => {
    if (!detail) return
    const parts = detail.split('-')
    parts.pop()
    const result = parts.join(' ')
    return {
      name: result,
      path: generatePath(PATH.EMPLOYEE_DETAIL, {
        detail: detail?.split('-').pop(),
      }),
    }
  })
  useTitle([...links, lastLink as Title])
  const positionId = detail?.split('-').pop()

  // GET DATA
  const {
    data: dataEmployee,
    isLoading,
    isFetching,
    refetch,
  } = useSupplierEmployee({
    id: Number(positionId),
    enabled: !!Number(positionId),
    ...(url.name !== '' ? { name: url.name } : { name: '' }),
  })
  const data = useMemo(() => dataEmployee?.data?.data, [isLoading, isFetching])

  // COLUMN
  const columns: ColumnDef<SupplierEmployee>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
    },
    {
      accessorKey: 'position',
      header: 'Jabatan',
    },
    {
      accessorKey: 'phone',
      header: 'Kontak',
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

  // HANDLE DATA
  const { mutate } = useCreateSupplierEmployee()

  const form = useForm<CreateSupplierEmployee>({
    defaultValues: {
      name: '',
      phone: '',
      position: '',
      status: '',
    },
  })

  const onSubmit = async (data: CreateSupplierEmployee) => {
    if (!Number(positionId)) return

    mutate(
      { payload: { ...data, supplierId: Number(positionId) } },
      {
        onSuccess: () => {
          refetch()
          setOpen(false)
          form.reset()
        },
      }
    )
  }

  const [open, setOpen] = useState(false)

  return (
    <DashboardLayout>
      <Container className='flex flex-col gap-4'>
        <TopHeader title={lastLink.name} onClick={() => setOpen(true)} />
        <DataTable
          columns={columns}
          data={data || []}
          isLoading={isLoading}
          withLoading
          withPagination
        />
      </Container>
      <Modal title='Tambah pegawai' open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalContainer setOpen={setOpen}>
              <FormField
                label='Nama'
                control={form.control}
                name='name'
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                label='Jabatan'
                control={form.control}
                name='position'
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                label='No. Telp'
                control={form.control}
                name='phone'
                render={({ field }) => <Input {...field} />}
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
                    <PopoverContent className='p-0' side='bottom' align='start'>
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
            </ModalContainer>
          </form>
        </Form>
      </Modal>
    </DashboardLayout>
  )
}
