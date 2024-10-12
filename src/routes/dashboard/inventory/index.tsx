import { Button } from '@/components/ui/button'
import Container from '../_component/container'
import { Link } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'
import { Goods } from '@/utils/types/api'
import { Package } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCreateGoods, useGoods } from '@/hooks/api/use-goods'
import { useMemo, useState } from 'react'
import { PATH } from '@/utils/constant/_paths'
import { useTitle } from '../_component/header'
import { DashboardLayout } from '../_component/layout'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form'
import { useBrand } from '@/hooks/api/use-brand'
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
import { FilterTable, HeadTable } from '@/components/data-table/component'
import { useMeasurement } from '@/hooks/api/use-measurement'
import { useLocation } from '@/hooks/api/use-location'
import { useCategory } from '@/hooks/api/use-category'
import { useTransaction } from '@/hooks/api/use-transaction'
import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import CardHighlight from './_component/index/card-highlight'
import CardActivity from './_component/index/card-activity'
import ButtonLink from './_component/button-link'
import Overlay from '@/components/common/overlay'
import Modal from '@/components/modal-v2'

export const links = [
  {
    name: 'Inventory',
    path: PATH.INVENTORY_INDEX,
  },
]

export default function Index() {
  useTitle(links)

  const queryGoods = useGoods({})
  const data = useMemo(
    () => queryGoods.data?.data?.data,
    [queryGoods.isLoading, queryGoods.isFetching]
  )

  const queryBrand = useBrand({})
  const brands = useMemo(
    () => queryBrand.data?.data?.data,
    [queryBrand.isLoading]
  )

  const queryMeasurement = useMeasurement({})
  const measurements = useMemo(
    () => queryMeasurement.data?.data?.data,
    [queryMeasurement.isLoading]
  )

  const queryLocation = useLocation({})
  const locations = useMemo(
    () => queryLocation.data?.data?.data,
    [queryLocation.isLoading]
  )

  const queryCategory = useCategory({})
  const categories = useMemo(
    () => queryCategory.data?.data?.data,
    [queryCategory.isLoading]
  )

  const queryTransaction = useTransaction({})
  const transactions = useMemo(
    () => queryTransaction.data?.data?.data,
    [queryTransaction.isLoading, queryTransaction.isFetching]
  )

  // START OF COLUMNS
  const columns: ColumnDef<Goods>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => (
        <Overlay
          className='w-full'
          overlay={
            <Link
              className='absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] bg-white hover:shadow-sm hover:shadow-gray-200'
              to={`/inventory/detail/${row.original.id}`}
            >
              Lihat
            </Link>
          }
        >
          <Link to={`/inventory/detail/${row.original.id}`}>
            {row.original.name}
          </Link>
        </Overlay>
      ),
    },
    {
      id: 'measurement',
      header: 'Satuan',
      cell: ({ row }) => <p>{row.original.measurement.name}</p>,
    },
    {
      accessorKey: 'qty',
      header: 'Qty',
    },
    {
      accessorKey: 'available',
      header: 'Ketersediaan',
    },
    {
      id: 'location',
      header: 'Lokasi',
      cell: ({ row }) => <p>{row.original.location.name}</p>,
    },
    {
      id: 'action',
    },
  ]
  // END OF COLUMNS

  // START OF ADD DATA
  const { mutate: create } = useCreateGoods()

  const [open, setOpen] = useState(false)
  useFixPointerEvent(open)

  const form = useForm({
    defaultValues: {
      name: '',
      minimum: '',
      qty: '',
      brandId: '',
      measurementId: '',
      locationId: '',
      categoryId: '',
    },
  })

  const onSubmit = (data: any) => {
    create(
      { payload: { ...data, available: data.qty } },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }
  // END OF ADD DATA

  // START OF HANDLE SELECT
  const [openBrand, setOpenBrand] = useState(false)
  const [openMeasurement, setOpenMeasurement] = useState(false)
  const [openLocation, setOpenLocation] = useState(false)
  const [openCategory, setOpenCategory] = useState(false)
  // END OF HANDLE SELECT

  return (
    <>
      <DashboardLayout>
        <div className='grid grid-cols-1 md:grid-cols-[1fr_360px]'>
          <Container className='flex flex-col gap-4 relative w-full overflow-auto'>
            <CardHighlight />
            <div className='border border-line rounded-xl overflow-hidden'>
              <HeadTable>
                <div className='flex gap-4 items-center'>
                  <Package className='text-[#989CA8]' />
                  <p className='text-dark font-medium'>Barang</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <Button onClick={() => setOpen(true)}>Tambah</Button>
                </div>
              </HeadTable>
              <FilterTable placeholder='Cari barang' />
              <DataTable
                columns={columns}
                data={data || []}
                isLoading={queryGoods.isLoading}
                withLoading
                withPagination
                styleFooter='border-t border-b-0'
              />
            </div>
            <div className='absolute right-0 top-0 h-full w-[1px] bg-[#EFF0F2]' />
          </Container>
          <div>
            <div className='flex gap-3.5 items-center border-b border-line px-4 py-2'>
              <p>Aktivitas Terkini</p>
              <ButtonLink />
            </div>
            <ScrollArea className='h-[calc(100vh-104px)] px-4'>
              {transactions?.map((item, index) => (
                <CardActivity
                  {...item}
                  isFirst={index === 0}
                  key={item.id}
                  isLast={index === transactions?.length - 1}
                />
              ))}
            </ScrollArea>
          </div>
        </div>
      </DashboardLayout>
      <Modal open={open} setOpen={setOpen} title='Add data'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='px-4 py-4 space-y-4'>
              <FormField
                label='Nama'
                control={form.control}
                name='name'
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                label='Kuantitas'
                control={form.control}
                name='qty'
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                label='Batas minimum'
                control={form.control}
                name='minimum'
                render={({ field }) => <Input {...field} />}
              />

              <Controller
                name='categoryId'
                control={form.control}
                render={({ field }) => (
                  <Popover open={openCategory} onOpenChange={setOpenCategory}>
                    <PopoverTrigger className='w-full'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full justify-start'
                        type='button'
                      >
                        {field.value ? (
                          <span>
                            {
                              categories.find(
                                (s: any) => s.id === Number(field.value)
                              )?.name
                            }
                          </span>
                        ) : (
                          <span>Pilih kategori</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='p-0' side='right' align='start'>
                      <Command>
                        <CommandInput placeholder='Change status...' />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((brand: any) => (
                              <CommandItem
                                key={brand.id}
                                value={brand.id.toString()}
                                onSelect={(value) => {
                                  form.setValue('categoryId', value as string)
                                  setOpenCategory(false)
                                }}
                              >
                                <span>{brand.name}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              />

              <div className='flex gap-2 items-center flex-wrap'>
                <Controller
                  name='brandId'
                  control={form.control}
                  render={({ field }) => (
                    <Popover open={openBrand} onOpenChange={setOpenBrand}>
                      <PopoverTrigger>
                        <Button
                          variant='outline'
                          size='sm'
                          className='w-[150px] justify-start'
                          type='button'
                        >
                          {field.value ? (
                            <>
                              <img
                                src={
                                  import.meta.env.VITE_BASE_URL +
                                  '/img/' +
                                  brands.find(
                                    (s: any) => s.id === Number(field.value)
                                  )?.photoUrl
                                }
                                className='mr-2 h-4 w-4 rounded-full'
                              />
                              {
                                brands.find(
                                  (s: any) => s.id === Number(field.value)
                                )?.name
                              }
                            </>
                          ) : (
                            <span>Pilih merek</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className='p-0'
                        side='bottom'
                        align='start'
                      >
                        <Command>
                          <CommandInput placeholder='Change status...' />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              {brands.map((brand: any) => (
                                <CommandItem
                                  key={brand.id}
                                  value={brand.id.toString()}
                                  onSelect={(value) => {
                                    form.setValue('brandId', value as string)
                                    setOpenBrand(false)
                                  }}
                                >
                                  <img
                                    src={
                                      import.meta.env.VITE_BASE_URL +
                                      '/img/' +
                                      brand.photoUrl
                                    }
                                    className='h-4 w-4 rounded'
                                  />
                                  <span>{brand.name}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />

                <Controller
                  name='measurementId'
                  control={form.control}
                  render={({ field }) => (
                    <Popover
                      open={openMeasurement}
                      onOpenChange={setOpenMeasurement}
                    >
                      <PopoverTrigger>
                        <Button
                          variant='outline'
                          size='sm'
                          className='w-[150px] justify-start'
                          type='button'
                        >
                          {field.value ? (
                            <span>
                              {
                                measurements.find(
                                  (s: any) => s.id === Number(field.value)
                                )?.name
                              }
                            </span>
                          ) : (
                            <span>Pilih jenis ukuran</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className='p-0'
                        side='right'
                        align='start'
                      >
                        <Command>
                          <CommandInput placeholder='Change status...' />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              {measurements.map((item: any) => (
                                <CommandItem
                                  key={item.id}
                                  value={item.id.toString()}
                                  onSelect={(value) => {
                                    form.setValue(
                                      'measurementId',
                                      value as string
                                    )
                                    setOpenMeasurement(false)
                                  }}
                                >
                                  <span>{item.name}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />

                <Controller
                  name='locationId'
                  control={form.control}
                  render={({ field }) => (
                    <Popover open={openLocation} onOpenChange={setOpenLocation}>
                      <PopoverTrigger className='w-fit'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='w-fit justify-start'
                          type='button'
                        >
                          {field.value ? (
                            <span>
                              {
                                locations.find(
                                  (s: any) => s.id === Number(field.value)
                                )?.name
                              }
                            </span>
                          ) : (
                            <span>Pilih lokasi penyimpanan</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className='p-0'
                        side='right'
                        align='start'
                      >
                        <Command>
                          <CommandInput placeholder='Change status...' />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              {locations.map((item: any) => (
                                <CommandItem
                                  key={item.id}
                                  value={item.id.toString()}
                                  onSelect={(value) => {
                                    form.setValue('locationId', value as string)
                                    setOpenLocation(false)
                                  }}
                                >
                                  <span>{item.name}</span>
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
    </>
  )
}
