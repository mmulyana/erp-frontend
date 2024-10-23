import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
  useCreatePhone,
  useDeletePhone,
  useUpdatePhone,
} from '@/hooks/api/use-employee'
import { cn } from '@/utils/cn'
import { Address } from '@/utils/types/api'
import { Eye, EyeOff, Pencil, Plus, Trash } from 'lucide-react'
import { KeyboardEvent, useRef, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
  id?: number | null
  addresses: Address[]
}

export default function AddressEmployee({ id, addresses }: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { mutate: create } = useCreatePhone()
  const { mutate: remove } = useDeletePhone()
  const { mutate: update } = useUpdatePhone()

  const form = useForm<{ value: string }>({
    defaultValues: {
      value: '',
    },
  })

  const [isAddress, setIsAddress] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    if (isAddress && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }, [isAddress])

  const onEdit = (id: number) => {
    setSelectedId(id)
    setIsAddress(true)
    const index = addresses.findIndex((item) => item.id === id)
    form.setValue('value', addresses[index].value)
  }

  const reset = () => {
    setIsAddress(false)
    form.reset()
    containerRef.current?.focus()
    setSelectedId(null)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (!id) return
      if (selectedId) {
        update(
          { id: selectedId, value: form.getValues('value') },
          {
            onSuccess: () => {
              reset()
            },
          }
        )
        return
      }
      create(
        { id, value: form.getValues('value') },
        {
          onSuccess: () => {
            reset()
          },
        }
      )
    }
  }

  if (!id) return null

  return (
    <div className='space-y-2' ref={containerRef}>
      {addresses.length > 0 ? (
        <div
          className={cn(
            'flex gap-2 flex-wrap items-start flex-col',
            open && 'gap-4'
          )}
        >
          {open ? (
            <>
              {addresses?.map((address, index) => (
                <div key={index} className='relative group'>
                  <p className='text-dark/50 text-sm'>{address.value}</p>
                  <div className='absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 flex gap-2 items-center'>
                    <button
                      className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                      onClick={() => {
                        remove({ id: address.id })
                      }}
                    >
                      <Trash size={12} />
                    </button>
                    <button
                      className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                      onClick={() => {
                        onEdit(address.id)
                      }}
                    >
                      <Pencil size={12} />
                    </button>
                  </div>
                </div>
              ))}
              {!isAddress && (
                <Button
                  type='submit'
                  variant='secondary'
                  onClick={() => setOpen(false)}
                  className='h-5 font-normal text-sm rounded-md py-3 pl-6 pr-3 text-dark items-center gap-1 relative mx-auto'
                >
                  <EyeOff
                    size={12}
                    className='absolute left-2 top-1/2 -translate-y-1/2'
                  />
                  Tutup
                </Button>
              )}
            </>
          ) : (
            <>
              <div className='relative group gap-2 flex items-center'>
                <p className='text-dark'>{addresses[0].value}</p>
                <div className='absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 flex gap-2 items-center'>
                  <button
                    className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                    onClick={() => {
                      remove({ id: addresses[0].id })
                    }}
                  >
                    <Trash size={12} />
                  </button>
                  <button
                    className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                    onClick={() => {
                      onEdit(addresses[0].id)
                    }}
                  >
                    <Pencil size={12} />
                  </button>
                </div>
              </div>
              {addresses.length > 1 && (
                <Button
                  type='submit'
                  variant='secondary'
                  onClick={() => setOpen(true)}
                  className='h-5 font-normal text-sm rounded-md py-3 pl-6 pr-3 text-dark items-center gap-1 relative'
                >
                  <Eye
                    size={12}
                    className='absolute left-2 top-[56%] -translate-y-1/2'
                  />
                  Lihat
                  <span>{addresses?.length - 1}</span>
                  alamat lainnya
                </Button>
              )}
            </>
          )}
        </div>
      ) : null}
      {isAddress ? (
        <Form {...form}>
          <div className='flex gap-2 pt-2 flex-col'>
            <div className='relative'>
              <Controller
                control={form.control}
                name='value'
                render={({ field }) => (
                  <Textarea
                    {...field}
                    onKeyDown={handleKeyDown}
                    className='w-full rounded-md'
                    ref={inputRef}
                  />
                )}
              />
            </div>
            <div className='flex justify-end gap-2'>
              <Button
                type='submit'
                variant='ghost'
                className='h-7 font-normal text-sm rounded-md p-0 px-2 text-red-400 hover:text-red-600'
                onClick={() => {
                  setIsAddress(false)
                  setSelectedId(null)
                  containerRef.current?.focus()
                  form.reset()
                }}
              >
                Batal
              </Button>
              <Button
                type='submit'
                variant='secondary'
                className='h-7 font-normal text-sm rounded-md p-0 px-2'
                onClick={() => {
                  if (!id) return
                  if (selectedId) {
                    update(
                      { id: selectedId, value: form.getValues('value') },
                      {
                        onSuccess: () => {
                          reset()
                        },
                      }
                    )
                    return
                  }
                  create(
                    { id, value: form.getValues('value') },
                    {
                      onSuccess: () => {
                        reset()
                      },
                    }
                  )
                }}
              >
                Simpan
              </Button>
            </div>
          </div>
        </Form>
      ) : (
        <Button
          variant='ghost'
          className='font-normal hover:bg-transparent gap-1 flex items-center text-blue-primary/80 hover:text-blue-primary h-fit p-0 relative text-sm mt-1'
          onClick={() => {
            setIsAddress(true)
          }}
        >
          <Plus size={14} />
          Tambah alamat
        </Button>
      )}
    </div>
  )
}
