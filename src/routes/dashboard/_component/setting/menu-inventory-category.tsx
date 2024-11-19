import { ChevronLeft, Pencil, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { cn } from '@/utils/cn'

import {
  useCategory,
  useCreateCategory,
  useDeleteCategory,
  useDetailCategory,
  useUpdateCategory,
} from '@/hooks/api/use-category'

import Search from '@/components/common/search'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Category = {
  name: string
}

export default function MenuInventoryCategory() {
  const [open, setOpen] = useState(false)
  const [isDanger, setDanger] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const { mutate: create } = useCreateCategory()
  const { mutate: update } = useUpdateCategory()
  const { mutate: remove } = useDeleteCategory()

  // detail data
  const detailQuery = useDetailCategory({
    id: selectedId,
    enabled: !!selectedId,
  })
  // all data
  const allQuery = useCategory({
    ...(search !== '' ? { name: search } : undefined),
  })
  const categories = allQuery?.data?.data.data || []

  const form = useForm<Category>({
    defaultValues: {
      name: '',
    },
  })

  const submit = async (data: Category) => {
    if (!!selectedId) {
      update(
        { id: selectedId, payload: data },
        {
          onSuccess: () => {
            setOpen(false)
            setSelectedId(null)
          },
        }
      )
      return
    }
    create(
      { payload: data },
      {
        onSuccess: () => {
          setOpen(false)
        },
      }
    )
  }

  const onRemove = () => {
    if (!selectedId) return
    remove(
      { id: selectedId },
      {
        onSuccess: () => {
          setSelectedId(null)
          setDanger(false)
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
    if (open && detailQuery.data?.data?.data && !!selectedId) {
      const { name } = detailQuery.data?.data?.data
      form.setValue('name', name)
    }
  }, [open, detailQuery.data, selectedId])

  return (
    <div className={cn('max-w-lg p-6', open && 'pt-4')}>
      {open ? (
        <>
          <Button
            variant='ghost'
            className='flex gap-2 items-center mb-6 pl-0.5 pr-3'
            onClick={() => setOpen(false)}
          >
            <ChevronLeft className='w-4 h-4 text-dark/50' />
            <p className='text-sm text-dark/50'>Kembali</p>
          </Button>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <div className='flex flex-col gap-4 max-w-sm'>
                <p className='text-dark font-medium'>
                  {selectedId
                    ? 'Update lokasi penyimpanan'
                    : 'Buat lokasi penyimpanan baru'}
                </p>
                <FormField
                  control={form.control}
                  name='name'
                  label='Nama'
                  render={({ field }) => <Input {...field} />}
                />

                <Button className='w-fit'>
                  {selectedId ? 'Perbarui' : 'Simpan'}
                </Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <>
          <p className='text-sm text-dark/50'>
            Lihat semua lokasi penyimpanan yang terdaftar di sistem
          </p>
          <div className='mt-8 flex justify-between items-center'>
            <Search withoutUrl debounceTime={500} onSearch={setSearch} />
            <Button onClick={() => setOpen(!open)}>Tambah</Button>
          </div>
          <ScrollArea className='mt-6 h-64'>
            <div className='flex flex-col gap-2'>
              {categories?.map((item) => (
                <div
                  key={`competency-${item.id}`}
                  className={cn(
                    'relative bg-white border border-line rounded-lg px-3 pl-4 flex items-center gap-2 group overflow-hidden h-12',
                    selectedId === item.id &&
                      isDanger &&
                      'bg-red-400/10 border-red-200 justify-between'
                  )}
                >
                  <div className='flex gap-4 items-center'>
                    <p
                      className={cn(
                        'text-dark',
                        selectedId === item.id &&
                          isDanger &&
                          'text-red-primary text-sm'
                      )}
                    >
                      {item.name}
                      {selectedId === item.id &&
                        isDanger &&
                        ', akan dihapus dari sistem yakin?'}
                    </p>
                  </div>
                  {selectedId === item.id && isDanger && (
                    <div className='flex gap-2 items-center'>
                      <Button
                        variant='outline'
                        onClick={() => {
                          setSelectedId(null)
                          setDanger(false)
                        }}
                      >
                        Batal
                      </Button>
                      <Button variant='destructive' onClick={onRemove}>
                        Yakin
                      </Button>
                    </div>
                  )}
                  {(!isDanger || selectedId !== item.id) && (
                    <div>
                      {item?._count && (
                        <p className='text-dark/50 text-sm'>
                          digunakan sebanyak{' '}
                          <span className='text-dark'>{item._count.goods}</span>
                        </p>
                      )}
                    </div>
                  )}
                  {(!isDanger || selectedId !== item.id) && (
                    <div className='absolute top-1/2 -right-[72px] -translate-y-1/2 group-hover:right-0 h-full w-fit px-3 flex justify-between items-center gap-4 duration-150 ease-in'>
                      <button
                        onClick={() => {
                          setSelectedId(item.id)
                          setDanger(true)
                        }}
                      >
                        <Trash className='w-4 h-4 text-red-400' />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(item.id)
                          setOpen(true)
                        }}
                      >
                        <Pencil className='w-4 h-4 text-gray-400' />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  )
}
