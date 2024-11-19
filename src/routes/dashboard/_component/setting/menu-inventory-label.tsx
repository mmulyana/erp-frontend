import { RadioV2 } from '@/components/common/radio-v2'
import Search from '@/components/common/search'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  useCreateSupplierLabel,
  useDeleteSupplierLabel,
  useDetailSupplierLabel,
  useSupplierLabels,
  useUpdateSupplierLabel,
} from '@/hooks/api/use-supplier-label'
import { cn } from '@/utils/cn'
import { Check, ChevronLeft, Pencil, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Label = {
  name: string
  color: string
}

const COLORS = [
  '#5463E8',
  '#2A9D90',
  '#E76E50',
  '#ED5757',
  '#5E81FF',
  '#8F49CC',
]

export default function MenuInventoryLabel() {
  const [open, setOpen] = useState(false)
  const [isDanger, setDanger] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const { mutate: create } = useCreateSupplierLabel()
  const { mutate: update } = useUpdateSupplierLabel()
  const { mutate: remove } = useDeleteSupplierLabel()

  // detail data
  const detailQuery = useDetailSupplierLabel({
    id: selectedId,
    enabled: !!selectedId,
  })
  // all data
  const allQuery = useSupplierLabels({
    ...(search !== '' ? { name: search } : undefined),
  })
  const competencies = allQuery?.data?.data.data || []

  const form = useForm<Label>({
    defaultValues: {
      name: '',
      color: '#5463E8',
    },
  })

  const submit = async (data: Label) => {
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
    if (!open) {
      form.reset()
    }
  }, [open])

  useEffect(() => {
    if (open && detailQuery.data?.data?.data && !!selectedId) {
      const { color, name } = detailQuery.data?.data?.data
      form.setValue('name', name)
      form.setValue('color', color)
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
                <p className='text-dark font-medium'>{selectedId ? 'Update label supplier' : 'Buat label supplier baru'}</p>
                <FormField
                  control={form.control}
                  name='name'
                  label='Nama'
                  render={({ field }) => <Input {...field} />}
                />
                <Controller
                  name='color'
                  control={form.control}
                  render={({ field }) => (
                    <div className='flex justify-between items-center'>
                      <FormLabel>Warna</FormLabel>
                      <div className='flex justify-between gap-4'>
                        {COLORS.map((color) => (
                          <RadioV2
                            {...field}
                            key={color}
                            value={color}
                            className='h-6 w-6 rounded-full flex items-center justify-center'
                            checked={field.value === color}
                            background={color}
                          >
                            {(checked) =>
                              checked && (
                                <Check className='w-4 h-4 text-white' />
                              )
                            }
                          </RadioV2>
                        ))}
                      </div>
                    </div>
                  )}
                />
                <Button className='w-fit'>Simpan</Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <>
          <p className='text-sm text-dark/50'>
            Lihat semua label untuk supplier yang terdaftar di sistem
          </p>
          <div className='mt-8 flex justify-between items-center'>
            <Search withoutUrl debounceTime={500} onSearch={setSearch} />
            <Button onClick={() => setOpen(!open)}>Tambah</Button>
          </div>
          <div className='mt-6 flex flex-col gap-2'>
            {competencies?.map((item) => (
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
                  {(!isDanger || selectedId !== item.id) && (
                    <div
                      className='w-2 h-2 rounded-full'
                      style={{ background: item.color }}
                    ></div>
                  )}
                  <p
                    className={cn(
                      'text-dark',
                      selectedId === item.id && isDanger && 'text-red-primary'
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
                        <span className='text-dark'>
                          {item._count.supplier}
                        </span>
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
