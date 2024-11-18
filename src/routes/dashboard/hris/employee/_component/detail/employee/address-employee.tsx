import { RadioV2 } from '@/components/common/radio-v2'
import { Button } from '@/components/ui/button'
import { Form, FormLabel } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
  useCreateAddress,
  useDeleteAddress,
  useUpdateAddress,
} from '@/hooks/api/use-employee'
import { cn } from '@/utils/cn'
import { Address } from '@/utils/types/api'
import { Eye, EyeOff, Pencil, Plus, Trash } from 'lucide-react'
import { KeyboardEvent, useRef, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
  id?: number | null
  addresses: Address[]
  permission?: string[]
}

export default function AddressEmployee({ id, addresses, permission }: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { mutate: create } = useCreateAddress()
  const { mutate: remove } = useDeleteAddress()
  const { mutate: update } = useUpdateAddress()

  const form = useForm<{ value: string; type: string }>({
    defaultValues: {
      value: '',
      type: '',
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
    form.reset()
    setSelectedId(id)
    setIsAddress(true)
    const index = addresses.findIndex((item) => item.id === id)
    form.setValue('value', addresses[index].value)
    form.setValue('type', addresses[index].type)
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
          {
            id: selectedId,
            value: form.getValues('value'),
            type: form.getValues('type'),
          },
          {
            onSuccess: () => {
              reset()
            },
          }
        )
        return
      }
      create(
        { id, value: form.getValues('value'), type: form.getValues('type') },
        {
          onSuccess: () => {
            reset()
          },
        }
      )
    }
  }

  const isAllowed = permission?.includes('employee:update')

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
                <div
                  key={index}
                  className='relative group pb-2 border-b border-dark/20 w-full'
                >
                  <p className='text-dark'>{address.value}</p>
                  <div className='absolute right-0 top-0 flex gap-2 items-center'>
                    {isAllowed && (
                      <button
                        className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                        onClick={() => {
                          remove({ id: address.id })
                        }}
                      >
                        <Trash size={12} />
                      </button>
                    )}
                    {isAllowed && (
                      <button
                        className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                        onClick={() => {
                          onEdit(address.id)
                        }}
                      >
                        <Pencil size={12} />
                      </button>
                    )}
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
                  {isAllowed && (
                    <button
                      className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                      onClick={() => {
                        remove({ id: addresses[0].id })
                      }}
                    >
                      <Trash size={12} />
                    </button>
                  )}
                  {isAllowed && (
                    <button
                      className='w-6 h-6 rounded-full text-dark bg-muted-foreground/10 flex items-center justify-center'
                      onClick={() => {
                        onEdit(addresses[0].id)
                      }}
                    >
                      <Pencil size={12} />
                    </button>
                  )}
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
              <Controller
                control={form.control}
                name='type'
                render={({ field }) => (
                  <div className='space-y-2 w-full mt-2'>
                    <FormLabel>Tipe alamat</FormLabel>
                    <div className='flex gap-1 items-center justify-between'>
                      <RadioV2
                        {...field}
                        value='domicile'
                        className='h-6 rounded-full flex items-center justify-center'
                        checked={field.value === 'domicile'}
                      >
                        {(checked) => (
                          <div className='flex gap-1 items-center'>
                            <div
                              className={cn(
                                'w-3 h-3 rounded-full border-[4px] border-gray-200',
                                checked && 'border-blue-primary'
                              )}
                            ></div>
                            <p className='text-sm text-dark'>Domisili</p>
                          </div>
                        )}
                      </RadioV2>
                      <RadioV2
                        {...field}
                        value='origin'
                        className='h-6 rounded-full flex items-center justify-center'
                        checked={field.value === 'origin'}
                      >
                        {(checked) => (
                          <div className='flex gap-1 items-center'>
                            <div
                              className={cn(
                                'w-3 h-3 rounded-full border-[4px] border-gray-200',
                                checked && 'border-blue-primary'
                              )}
                            ></div>
                            <p className='text-sm text-dark'>Asal</p>
                          </div>
                        )}
                      </RadioV2>
                      <RadioV2
                        {...field}
                        value='alternative'
                        className='h-6 rounded-full flex items-center justify-center'
                        checked={field.value === 'alternative'}
                      >
                        {(checked) => (
                          <div className='flex gap-1 items-center'>
                            <div
                              className={cn(
                                'w-3 h-3 rounded-full border-[4px] border-gray-200',
                                checked && 'border-blue-primary'
                              )}
                            ></div>
                            <p className='text-sm text-dark'>Alternatif</p>
                          </div>
                        )}
                      </RadioV2>
                    </div>
                  </div>
                )}
              />
            </div>
            <div className='flex justify-end gap-4'>
              <Button
                type='submit'
                variant='ghost'
                className='h-7 font-normal text-sm rounded-md text-red-400 hover:text-red-600'
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
                className='h-7 font-normal text-sm rounded-md'
                onClick={() => {
                  if (!id) return
                  if (selectedId) {
                    update(
                      {
                        id: selectedId,
                        value: form.getValues('value'),
                        type: form.getValues('type'),
                      },
                      {
                        onSuccess: () => {
                          reset()
                        },
                      }
                    )
                    return
                  }
                  create(
                    {
                      id,
                      value: form.getValues('value'),
                      type: form.getValues('type'),
                    },
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
        isAllowed && (
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
        )
      )}
    </div>
  )
}
