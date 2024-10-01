import { Button, buttonVariants } from '@/components/ui/button'
import Container from '../_component/container'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { ColumnDef } from '@tanstack/react-table'
import { Goods } from '@/utils/types/api'
import { Ellipsis } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import ButtonLink from './_component/button-link'
import CardHighlight from './_component/card-highlight'
import CardActivity from './_component/card-activity'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useCreateGoods, useGoods } from '@/hooks/api/use-goods'
import { useMemo, useState } from 'react'
import SearchV2 from '@/components/common/search/search-v2'
import Filter from '@/components/common/filter'
import {
  SelectItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PATH } from '@/utils/constant/_paths'
import { useTitle } from '../_component/header'
import { DashboardLayout } from '../_component/layout'
import Modal from '@/components/modal-v2'
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
import { useMeasurement } from '@/hooks/api/use-measurement'
import { useLocation } from '@/hooks/api/use-location'
import { useCategory } from '@/hooks/api/use-category'

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

  const columns: ColumnDef<Goods>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ cell }) => (
        <div className='flex gap-2 items-center'>
          <p>{cell.row.original.name}</p>
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              '!py-1 !px-[10px] rounded-[6px] text-xs h-fit'
            )}
            to={`/inventory/detail/${cell.row.original.id}`}
          >
            Lihat
          </Link>
        </div>
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
      id: 'category',
      header: 'Kategori',
      cell: ({ row }) => <p>{row.original.category.name}</p>,
    },
    {
      id: 'location',
      header: 'Lokasi',
      cell: ({ row }) => <p>{row.original.location.name}</p>,
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

  // START OF ADD DATA
  const { mutate: create } = useCreateGoods()
  const [open, setOpen] = useState(false)

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
          queryGoods.refetch()
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
        <div className='grid grid-cols-1 md:grid-cols-[1fr_380px]'>
          <Container className='flex flex-col gap-4 relative w-full overflow-auto'>
            <CardHighlight />
            <div className='pb-1.5 border-b border-[#EFF0F2] flex justify-between items-center relative'>
              <div className='relative px-2'>
                <p className='text-[#313951] font-medium'>Barang</p>
                <div className='w-full h-0.5 bg-[#5463E8] absolute -bottom-2.5 left-0'></div>
              </div>
              <div className='flex gap-2 items-center'>
                <SearchV2 />
                <Filter>
                  <div className='flex flex-col gap-2'>
                    <Select>
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Kategori' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Kategori</SelectLabel>
                          <SelectItem value='apple'>Mesin Bor</SelectItem>
                          <SelectItem value='banana'>Cat</SelectItem>
                          <SelectItem value='blueberry'>Kuas</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </Filter>
                <Button onClick={() => setOpen(true)}>Tambah Data</Button>
              </div>
            </div>
            <ScrollArea className='w-full'>
              <DataTable
                columns={columns}
                data={data || []}
                isLoading={queryGoods.isLoading}
                withLoading
                withPagination
              />
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
            <div className='absolute right-0 top-0 h-full w-[1px] bg-[#EFF0F2]' />
          </Container>
          <Container>
            <div className='flex gap-3.5 items-center mb-4'>
              <p>Aktivitas Terkini</p>
              <ButtonLink />
            </div>
            <div>
              <ScrollArea className='h-[calc(100vh-128px)] pr-4'>
                <CardActivity type='in' />
                <CardActivity type='out' />
                <CardActivity type='in' />
                <CardActivity type='in' isLast />
              </ScrollArea>
            </div>
          </Container>
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
