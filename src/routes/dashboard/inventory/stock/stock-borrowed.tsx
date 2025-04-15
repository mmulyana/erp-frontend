import { Check, ChevronsUpDown, Plus, X, Blocks } from 'lucide-react'
import { useForm, useFieldArray } from 'react-hook-form'
import useUrlState from '@ahooksjs/use-url-state'
import { useState } from 'react'

import { CreateTransaction } from '@/utils/types/form'
import { PATH } from '@/shared/constants/_paths'

import { DashboardLayout } from '../../../../shared/component/layout'
import { useTitle } from '../../../../shared/component/header'
import { steps } from '../_component/tour-stock'
import { column } from './_component/column'
import DetailTransaction from './_component/detail-transaction'
import DeleteTransaction from './_component/delete-transaction'
import TitlePage from '../../../../shared/component/title-page'

import { useProjects } from '@/hooks/api/use-project'
import { useGoods } from '@/hooks/api/use-goods'
import { useApiData } from '@/shared/hooks/use-api-data'
import usePermission from '@/shared/hooks/use-permission'
import useTour from '@/hooks/use-tour'
import {
  useCreateTransaction,
  useTransactionPagination,
} from '@/hooks/api/use-transaction'

import Modal, { ModalContainer } from '@/components/modal-v2'
import Tour from '@/components/common/tour'
import { Form, FormField } from '@/components/ui/form'
import { FilterTable } from '@/shared/component/data-table/component'
import { DataTable } from '@/shared/component/data-table'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const HIDE = ['supplier', 'price']

const links = [
  {
    name: 'Inventory',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Kelola',
    path: PATH.PROJECT_INDEX,
  },
  {
    name: 'Dipinjam',
    path: PATH.INVENTORY_STOCK_BORROWED,
  },
]

export default function StockBorrowedPage() {
  useTitle(links)

  const permission = usePermission()

  // handle tour
  const tours = useTour('manage-stock')

  const [search, setSearch] = useState('')
  const { data: projects } = useApiData(
    useProjects({
      search,
    })
  )
  const [goodName, setGoodName] = useState('')
  const { data: goods } = useApiData(useGoods({ name: goodName }))

  const [url] = useUrlState({ page: '' })
  const { data: transactions, isLoading } = useApiData(
    useTransactionPagination({
      type: 'borrowed',
      ...(url.page !== '' ? { page: url.page } : undefined),
    })
  )

  const { mutate } = useCreateTransaction()
  const [open, setOpen] = useState(false)

  const form = useForm<CreateTransaction>({
    defaultValues: {
      date: '',
      items: [{ goodsId: null, qty: null, price: null, type: 'borrowed' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const onSubmit = async (payload: CreateTransaction) => {
    mutate(
      { payload },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }

  const isAllowed = permission.includes('transaction:create')

  return (
    <>
      <DashboardLayout className='overflow-hidden'>
        <TitlePage className='mb-2'>
          <div className='flex gap-2 items-center'>
            <Blocks className='text-[#989CA8]' />
            <p className='text-dark font-medium'>Dipinjam</p>
          </div>
        </TitlePage>
        <FilterTable
          onAdd={() => setOpen(!open)}
          className='border-t border-line'
          create={isAllowed}
        />
        <DataTable
          columns={column.filter((item) => !HIDE.includes(String(item.id)))}
          totalPages={transactions?.total_pages}
          data={transactions?.data || []}
          isLoading={isLoading}
          withPagination
        />
      </DashboardLayout>
      <Modal title='Opname' open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalContainer setOpen={setOpen}>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <div className='flex justify-between items-center bg-[#F1F5F9] pl-2 rounded-t-lg h-10 border-b border-[#E5EBF1]'>
                    <h3 className='text-sm font-medium text-dark'>
                      Barang ke-{index + 1}
                    </h3>
                    {index > 0 && (
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='text-slate-600 hover:text-red-400 hover:bg-transparent'
                        onClick={() => remove(index)}
                      >
                        <X className='w-4 h-4' strokeWidth={3} />
                      </Button>
                    )}
                  </div>
                  <div className='p-4 bg-[#F8FAFC] rounded-b-lg'>
                    <div className='grid grid-cols-3 gap-4'>
                      <div className='col-span-2'>
                        <FormField
                          label='Barang'
                          name={`items.${index}.goodsId`}
                          control={form.control}
                          render={({ field }) => (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant='outline'
                                  role='combobox'
                                  aria-expanded={open}
                                  className='w-full px-2 h-10 justify-between text-dark '
                                >
                                  {field.value
                                    ? goods?.find(
                                        (item) =>
                                          item.id === Number(field.value)
                                      )?.name
                                    : 'Pilih barang'}
                                  <ChevronsUpDown
                                    size={16}
                                    className='opacity-50'
                                  />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                side='bottom'
                                className='p-0'
                                style={{
                                  width: 'var(--radix-popover-trigger-width)',
                                }}
                              >
                                <Command shouldFilter={false}>
                                  <CommandInput
                                    placeholder='Cari...'
                                    value={goodName}
                                    onValueChange={setGoodName}
                                  />
                                  <CommandList>
                                    <CommandEmpty>tidak ditemukan</CommandEmpty>
                                    <CommandGroup className='h-48 overflow-auto'>
                                      {goods?.map((item) => (
                                        <CommandItem
                                          key={item.id}
                                          value={String(item.id)}
                                          onSelect={(value) => {
                                            form.setValue(
                                              `items.${index}.goodsId`,
                                              Number(value)
                                            )
                                          }}
                                          disabled={item.available === 0}
                                        >
                                          <div className='flex gap-2 items-center'>
                                            <div className='w-16 h-16 rounded-lg bg-dark/5'></div>
                                            <div className='flex flex-col gap-1'>
                                              <p className='text-base text-dark'>
                                                {item.name}
                                              </p>
                                              <p className='text-dark/50'>
                                                {!!item.available ? (
                                                  <>
                                                    Tersedia{' '}
                                                    <span className='text-dark font-medium'>
                                                      {item.available}
                                                    </span>
                                                  </>
                                                ) : (
                                                  'Persediaan Habis'
                                                )}
                                              </p>
                                            </div>
                                          </div>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          )}
                        />
                      </div>

                      <FormField
                        label='Kuantitas'
                        control={form.control}
                        name={`items.${index}.qty`}
                        render={({ field }) => (
                          <div className='relative'>
                            <Input
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const value = e.target.value
                                field.onChange(
                                  value === '' ? null : Number(value)
                                )
                              }}
                            />
                            {field.value && (
                              <div className='absolute top-0 right-0 h-full pr-3 flex items-center text-dark capitalize text-sm font-medium'>
                                {goods?.find(
                                  (s) =>
                                    s.id ===
                                    Number(form.watch(`items.${index}.goodsId`))
                                )?.measurement?.name || ''}
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  {index === fields.length - 1 && (
                    <div className='pt-2'>
                      <Button
                        type='button'
                        variant='secondary'
                        size='sm'
                        className='pl-2.5 pr-4 text-slate-600 font-normal gap-1'
                        onClick={() =>
                          append({
                            goodsId: null,
                            qty: null,
                            price: null,
                            type: 'out',
                          })
                        }
                      >
                        <Plus
                          size={14}
                          strokeWidth={2}
                          className='text-slate-500'
                        />
                        Tambah Item
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-4 mt-4 border-t border-line border-dashed'>
                <FormField
                  label='Proyek'
                  name='projectId'
                  control={form.control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger className='border' asChild>
                        <Button
                          variant='outline'
                          role='combobox'
                          aria-expanded={open}
                          className='w-full px-2 h-10 justify-between text-dark'
                        >
                          {field.value
                            ? projects?.find(
                                (item) => item.id === Number(field.value)
                              )?.name
                            : 'Pilih Proyek'}
                          <ChevronsUpDown size={16} className='opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        side='bottom'
                        className='p-0'
                        style={{
                          width: 'var(--radix-popover-trigger-width)',
                        }}
                      >
                        <Command shouldFilter={false}>
                          <CommandInput
                            placeholder='Cari...'
                            value={search}
                            onValueChange={setSearch}
                          />
                          <CommandList>
                            <CommandEmpty>tidak ditemukan</CommandEmpty>
                            <CommandGroup className='h-48 overflow-auto'>
                              {projects?.map((item) => (
                                <CommandItem
                                  key={item.id}
                                  value={String(item.id)}
                                  onSelect={(value) => {
                                    form.setValue('projectId', Number(value))
                                  }}
                                >
                                  <div className='flex justify-between items-center w-full'>
                                    <p className='text-base text-dark'>
                                      {item.name}
                                    </p>
                                    {Number(field.value) === item.id && (
                                      <div className='w-4 h-4 rounded-full flex items-center justify-center bg-green-primary pr-0.5'>
                                        <Check
                                          size={12}
                                          className='text-white'
                                        />
                                      </div>
                                    )}
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />

                <FormField
                  label='Tanggal'
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <Input type='date' {...field} className='block' />
                  )}
                />
              </div>
            </ModalContainer>
          </form>
        </Form>
      </Modal>
      <DeleteTransaction />
      <DetailTransaction />

      <Tour steps={steps} {...tours} />
    </>
  )
}
