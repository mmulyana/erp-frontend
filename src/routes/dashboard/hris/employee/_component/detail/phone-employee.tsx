import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  useCreatePhone,
  useDeletePhone,
  useUpdatePhone,
} from '@/hooks/api/use-employee'
import { cn } from '@/utils/cn'
import { PhoneNumber } from '@/utils/types/api'
import { Copy, Eye, EyeOff, Pencil, Phone, Plus, Trash } from 'lucide-react'
import { KeyboardEvent, useRef, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  id?: number | null
  phones: PhoneNumber[]
}

export default function PhoneEmployee({ id, phones }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { mutate: create } = useCreatePhone()
  const { mutate: remove } = useDeletePhone()
  const { mutate: update } = useUpdatePhone()

  const form = useForm<{ value: string }>({
    defaultValues: {
      value: '',
    },
  })

  const [isPhone, setIsPhone] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    if (isPhone && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }, [isPhone])

  const onEdit = (id: number) => {
    setSelectedId(id)
    setIsPhone(true)
    const index = phones.findIndex((item) => item.id === id)
    form.setValue('value', phones[index].value)
  }

  const reset = () => {
    setIsPhone(false)
    form.reset()
    containerRef.current?.focus()
    setSelectedId(null)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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

  const onCopy = async (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      toast.success('Nomor berhasil disalin')
    }
  }

  if (!id) return null

  return (
    <div className='space-y-2' ref={containerRef}>
      {phones.length > 0 ? (
        <div
          className={cn(
            'flex gap-2 flex-wrap items-start flex-col',
            open && 'gap-4'
          )}
        >
          {open ? (
            <>
              {phones?.map((phone, index) => (
                <div key={index} className='relative group'>
                  <p className='text-dark/50 text-sm'>{phone.value}</p>
                  <div className='absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 flex gap-2 items-center'>
                    <button
                      className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                      onClick={() => onCopy(phone.value)}
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                      onClick={() => {
                        remove({ id: phone.id })
                      }}
                    >
                      <Trash size={12} />
                    </button>
                    <button
                      className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                      onClick={() => {
                        onEdit(phone.id)
                      }}
                    >
                      <Pencil size={12} />
                    </button>
                  </div>
                </div>
              ))}
              {!isPhone && (
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
                <p className='text-dark'>{phones[0].value}</p>
                <div className='absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 flex gap-2 items-center'>
                  <button
                    className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                    onClick={() => onCopy(phones[0].value)}
                  >
                    <Copy size={12} />
                  </button>
                  <button
                    className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                    onClick={() => {
                      remove({ id: phones[0].id })
                    }}
                  >
                    <Trash size={12} />
                  </button>
                  <button
                    className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                    onClick={() => {
                      onEdit(phones[0].id)
                    }}
                  >
                    <Pencil size={12} />
                  </button>
                </div>
              </div>
              {phones.length > 1 && (
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
                  <span>{phones?.length - 1}</span>
                  nomor lainnya
                </Button>
              )}
            </>
          )}
        </div>
      ) : null}
      {isPhone ? (
        <Form {...form}>
          <div className='flex gap-2 pt-2 flex-col'>
            <div className='relative'>
              <Controller
                control={form.control}
                name='value'
                render={({ field }) => (
                  <Input
                    {...field}
                    onKeyDown={handleKeyDown}
                    className='pl-6 [direction:inherit] h-7 w-full rounded-md'
                    ref={inputRef}
                  />
                )}
              />
              <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center pl-1 text-muted-foreground/80 peer-disabled:opacity-50'>
                <Phone size={14} strokeWidth={2} aria-hidden='true' />
              </div>
            </div>
            <div className='flex justify-end gap-2'>
              <Button
                type='submit'
                variant='ghost'
                className='h-7 font-normal text-sm rounded-md p-0 px-2 text-red-400 hover:text-red-600'
                onClick={() => {
                  setIsPhone(false)
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
            setIsPhone(true)
          }}
        >
          <Plus size={14} />
          Tambah No.telp
        </Button>
      )}
    </div>
  )
}