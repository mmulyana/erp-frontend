import InputFile from '@/components/common/input-file'
import Search from '@/components/common/search'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  useBrand,
  useCreateBrand,
  useDeleteBrand,
  useDetailBrand,
  useUpdateBrand,
} from '@/hooks/api/use-brand'
import { cn } from '@/utils/cn'
import { BASE_URL } from '@/utils/constant/_urls'
import { ChevronLeft, Pencil, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type Brand = {
  name: string
  photo: File | null
  preview: string | null
}

export default function MenuInventoryBrand() {
  const [open, setOpen] = useState(false)
  const [isDanger, setDanger] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const { mutate: create } = useCreateBrand()
  const { mutate: update } = useUpdateBrand()
  const { mutate: remove } = useDeleteBrand()

  // detail data
  const detailQuery = useDetailBrand({
    id: selectedId,
    enabled: !!selectedId,
  })
  // all data
  const allQuery = useBrand({
    ...(search !== '' ? { name: search } : undefined),
  })
  const brands = allQuery?.data?.data.data || []

  const form = useForm<Brand>({
    defaultValues: {
      name: '',
      photo: null,
      preview: null,
    },
  })

  const submit = async (data: Brand) => {
    if (!!selectedId) {
      update(
        { payload: { id: selectedId, ...data } },
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
    if (open) {
      form.reset()
      form.setValue('preview', null)
    }
  }, [open])

  useEffect(() => {
    if (open && detailQuery.data?.data?.data && !!selectedId) {
      const { name, photoUrl } = detailQuery.data?.data?.data
      form.setValue('name', name)
      form.setValue('preview', photoUrl || null)
    }
  }, [open, detailQuery.data, selectedId])

  const defaultPreview = form.watch('preview')

  return (
    <div className={cn('max-w-lg p-6', open && 'pt-4')}>
      {open ? (
        <>
          <Button
            variant='ghost'
            className='flex gap-2 items-center mb-6 pl-0.5 pr-3'
            onClick={() => {
              setOpen(false)
              setSelectedId(null)
              form.reset()
            }}
          >
            <ChevronLeft className='w-4 h-4 text-dark/50' />
            <p className='text-sm text-dark/50'>Kembali</p>
          </Button>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <div className='flex flex-col gap-4 max-w-sm'>
                <p className='text-dark font-medium'>
                  {selectedId ? 'Update merek' : 'Buat merek baru'}
                </p>
                <FormField
                  control={form.control}
                  name='name'
                  label='Nama'
                  render={({ field }) => <Input {...field} />}
                />
                <InputFile
                  name='photo'
                  label='Photo'
                  defaultPreview={defaultPreview}
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
            Lihat semua merk yang terdaftar di sistem
          </p>
          <div className='mt-8 flex justify-between items-center'>
            <Search withoutUrl debounceTime={500} onSearch={setSearch} />
            <Button onClick={() => setOpen(!open)}>Tambah</Button>
          </div>
          <div className='mt-6 flex flex-col gap-2'>
            {brands?.map((item) => (
              <div
                key={`competency-${item.id}`}
                className={cn(
                  'relative bg-white border border-line rounded-lg flex items-center gap-2 group overflow-hidden p-1',
                  selectedId === item.id &&
                    isDanger &&
                    'bg-red-400/10 border-red-200 justify-between'
                )}
              >
                <div className='flex gap-2 items-center'>
                  {(!isDanger || selectedId !== item.id) && (
                    <img
                      className='w-12 h-12 rounded object-cover object-center shadow-md'
                      src={BASE_URL + '/img/' + item.photoUrl}
                    />
                  )}
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
        </>
      )}
    </div>
  )
}
