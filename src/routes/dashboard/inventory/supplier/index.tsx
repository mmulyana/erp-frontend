import { ColumnDef } from '@tanstack/react-table'
import Container from '../../_component/container'
import { DashboardLayout } from '../../_component/layout'
import TopHeader from '../_component/top-header'
import { Supplier as SupplierType } from '@/utils/types/api'
import Chips from '@/components/common/chips'
import { Button } from '@/components/ui/button'
import { Ellipsis, TrashIcon } from 'lucide-react'
import {
  useCreateSupplier,
  useDeleteSupplier,
  useSupplier,
} from '@/hooks/api/use-supplier'
import { useMemo, useState } from 'react'
import { DataTable } from '@/components/data-table'
import Overlay from '@/components/common/overlay'
import { generatePath, Link } from 'react-router-dom'
import { PATH } from '@/utils/constant/_paths'
import { useTitle } from '../../_component/header'
import { links } from './data'
import { useForm } from 'react-hook-form'
import Modal from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTag } from '@/hooks/api/use-tag'
import MultiSelectV1 from '@/components/common/select/multi-select-v1'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import InputFile from '@/components/common/input-file'
import useUrlState from '@ahooksjs/use-url-state'
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Supplier() {
  useTitle(links)

  const [url, setUrl] = useUrlState({ name: '', tag: '', status: '' })

  const {
    data: dataSupplier,
    isLoading,
    isFetching,
    refetch,
  } = useSupplier({
    ...(url.name !== '' ? { name: url.name } : undefined),
    ...(url.tag !== '' ? { tag: url.tag } : undefined),
  })
  const data = useMemo(() => dataSupplier?.data?.data, [isLoading, isFetching])

  const queryTag = useTag()
  const tags = useMemo(
    () =>
      queryTag?.data?.data?.data?.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.id,
      })) || [],
    [queryTag.isLoading]
  )

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
      header: 'No. Telp',
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
          <div className='flex gap-2 flex-wrap items-center max-w-[180px]'>
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
      cell: ({ cell }) => (
        <DropdownMenu>
          <DropdownMenuTrigger className='flex justify-center items-center rounded-[6px] h-5 w-5 border border-[#EFF0F2]'>
            <Ellipsis className='w-4 h-4 text-[#313951]' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-10 p-0'>
            <DropdownMenuItem className='cursor-pointer p-0'>
              <Button
                className='gap-1 justify-start px-2 flex items-center w-full border-none'
                variant='outline'
                onClick={() => {
                  setSelectedSupplier({ id: cell.row.original.id, open: true })
                }}
              >
                <TrashIcon className='w-4 h-4 text-red-400' />
                Hapus
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  // START OF HANDLE FORM
  const { mutate } = useCreateSupplier()
  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      status: 'active',
      tags: [] as string[],
      photo: null as File | null,
    },
  })

  const [open, setOpen] = useState(false)

  const handleTags = (ids: string[]) => {
    form.setValue('tags', [...ids])
  }

  const onSubmit = (data: any) => {
    mutate(
      { payload: data },
      {
        onSuccess: () => {
          refetch()
          setOpen(false)
          form.reset()
        },
      }
    )
  }
  // END OF HANDLE FORM

  // HANDLE DELETE
  const { mutate: deleteSupplier } = useDeleteSupplier()

  const [selectedSupplier, setSelectedSupplier] = useState<{
    id: number
    open: boolean
  } | null>(null)

  const onDelete = () => {
    if (!selectedSupplier) return

    deleteSupplier(
      { id: selectedSupplier?.id },
      {
        onSuccess: () => {
          refetch()
          setSelectedSupplier(null)
        },
      }
    )
  }

  const handleRemoveSelected = () => {
    setSelectedSupplier(null)
  }

  return (
    <DashboardLayout>
      <Container className='flex flex-col gap-4'>
        <TopHeader
          title='Supplier'
          onClick={() => setOpen(true)}
          filterContent={
            <>
              <div className='px-2 h-8 flex items-center w-full font-semibold border-b border-gray-100'>
                <span className='text-sm text-gray-600'>Filter</span>
              </div>
              <div className='px-2 space-y-2 pb-2.5'>
                <Select
                  onValueChange={(e) => setUrl({ ...url, tag: e })}
                  value={url.tag}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Tag' />
                  </SelectTrigger>
                  <SelectContent>
                    {tags.map((item: any) => (
                      <SelectItem value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(e) => setUrl({ ...url, status: e })}
                  value={url.status}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Tag' />
                  </SelectTrigger>
                  <SelectContent>
                    {['active', 'nonactive'].map((item) => (
                      <SelectItem value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          }
        />
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
              <InputFile name='photo' label='Photo' />

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
                label='Alamat'
                control={form.control}
                name='address'
                render={({ field }) => <Textarea {...field} />}
              />

              <MultiSelectV1 options={tags} onChange={handleTags} />
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
      <Modal
        title='Hapus supplier'
        open={selectedSupplier?.open || false}
        setOpen={handleRemoveSelected}
      >
        <div className='p-4 space-y-4'>
          Tindakan akan ini akan menghapus supplier serta pegawai dan lainnya
        </div>
        <div className='rounded-b-md px-4 py-4 bg-[#F4F4F7] border-t border-[#EFF0F2] flex justify-end gap-2 items-center'>
          <Button
            type='button'
            variant='secondary'
            onClick={() => setSelectedSupplier(null)}
          >
            Batal
          </Button>
          <Button onClick={onDelete}>Hapus</Button>
        </div>
      </Modal>
    </DashboardLayout>
  )
}
