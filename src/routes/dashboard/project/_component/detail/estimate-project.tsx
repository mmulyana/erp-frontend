import { useQueryClient } from '@tanstack/react-query'
import { useFieldArray, useForm } from 'react-hook-form'
import { Trash, Triangle } from 'lucide-react'
import { useSetAtom } from 'jotai'
import { useEffect, useMemo } from 'react'

import { useDeleteEstimate, useSaveEstimate } from '@/hooks/api/use-estimate'
import { formatToRupiah } from '@/utils/formatCurrency'
import { KEYS } from '@/utils/constant/_keys'
import { Estimate } from '@/utils/types/api'
import { cn } from '@/utils/cn'

import {
  accordionAtom,
  AccordionContent,
  AccordionGroup,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import EmptyImg from '/public/icons/empty-box.png'
import { useApiData } from '@/hooks/use-api-data'
import { useEmployeeByProject } from '@/hooks/api/use-project'
import { getDaysDifference } from '@/utils/get-days-difference'

interface EstimateItem {
  id: number | null
  name: string
  price: number
  qty: number
}

interface FormValues {
  items: EstimateItem[]
  deletedIds: number[]
}

type Props = {
  projectId?: number | null
  estimation?: Estimate[]
  date_started?: string | null
}
export default function EstimateProject({
  projectId,
  estimation,
  date_started,
}: Props) {
  const queryClient = useQueryClient()

  const setAccordion = useSetAtom(accordionAtom)

  const { mutate: save } = useSaveEstimate()
  const { mutate: removeEstimate } = useDeleteEstimate()

  const { data } = useApiData(
    useEmployeeByProject({
      id: projectId,
      enabled: !!date_started && date_started !== '',
    })
  )

  const { register, control, handleSubmit, watch, setValue, reset } =
    useForm<FormValues>({
      defaultValues: {
        items: [],
        deletedIds: [],
      },
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const onSubmit = (data: FormValues) => {
    if (!!data.deletedIds.length) {
      removeEstimate({ ids: data.deletedIds })
    }
    if (!projectId) return
    save(
      {
        items: data.items.map((item) => ({
          ...item,
          price: Number(item.price),
        })),
        projectId,
      },
      {
        onSuccess: () => {
          setAccordion([])
        },
      }
    )
  }

  const watchItems = watch('items')
  const watchDeletedIds = watch('deletedIds')
  const total = watchItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleRemove = (index: number) => {
    const itemToRemove = watchItems[index]
    if (itemToRemove.id !== null) {
      setValue('deletedIds', [...watchDeletedIds, itemToRemove.id])
    }
    remove(index)
  }

  useEffect(() => {
    if (estimation?.length) {
      const formattedItems = estimation.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price || 0,
        qty: item.qty || 0,
      }))

      reset({
        items: formattedItems,
        deletedIds: [],
      })
    }
  }, [estimation, reset])

  useEffect(() => {
    const unsubscribe = () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT, projectId],
      })
    }

    return () => unsubscribe()
  }, [])

  const total_days = useMemo(
    () => (date_started ? getDaysDifference(date_started) : 0),
    [date_started]
  )
  const totalSalary = useMemo(() => {
    return data?.reduce((acc, curr) => {
      const salary = parseFloat(curr.employee.basic_salary) * total_days
      return acc + salary
    }, 0)
  }, [data, total_days])

  return (
    <div className='space-y-6'>
      {!!date_started && (
        <div className='flex flex-col gap-6'>
          <div className='rounded-xl bg-white py-2 w-full border border-line pb-6'>
            <div className='flex justify-between items-center px-4 pt-1.5 pb-1'>
              <p className='text-dark/60 text-sm'>Manpower</p>
            </div>

            <div className='grid grid-cols-[2fr_1fr_2fr] px-6 mt-2 gap-2'>
              <div>
                <p className='text-dark/50 text-sm col-start-2'>Nama</p>
              </div>
              <div className='text-center'>
                <p className='text-dark/50 text-sm'>Gaji Pokok</p>
              </div>
              <div className='text-right'>
                <p className='text-dark/50 text-sm'>subtotal</p>
              </div>
            </div>

            {data?.map(({ employee }, index) => (
              <div
                className='grid grid-cols-[2fr_1fr_2fr] px-6 py-1.5 border-b gap-2'
                key={index}
              >
                <div>
                  <p className='text-dark text-sm col-start-2'>
                    {employee.fullname}
                  </p>
                </div>
                <div className='text-center'>
                  <p className='text-dark text-sm'>
                    {formatToRupiah(Number(employee.basic_salary))}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-dark text-sm'>
                    {formatToRupiah(Number(employee.basic_salary) * total_days)}
                  </p>
                </div>
              </div>
            ))}

            <div className='flex justify-end gap-2 pr-6 pt-4 items-center'>
              <p className='text-sm text-dark/50'>Total</p>
              <p className='text-sm font-medium text-dark'>
                {formatToRupiah(totalSalary || 0)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className='flex flex-col gap-6'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='rounded-xl bg-white py-2 w-full border border-line'
        >
          <div className='flex justify-between items-center px-4 pt-1.5 pb-1'>
            <p className='text-dark/60 text-sm'>Lain-lain</p>
            <Button
              type='button'
              variant='outline'
              className='text-sm font-normal px-2 py-1 h-fit gap-1 text-gray-800'
              onClick={() => {
                append({ id: null, name: '', price: 0, qty: 1 })
                setAccordion([`item-${watchItems.length}`])
              }}
            >
              Tambah
            </Button>
          </div>
          <div className='grid grid-cols-[2fr_40px_2fr_24px] pr-4 mt-2 gap-2'>
            <div className='grid grid-cols-[32px_1fr] items-center gap-2'>
              <p className='text-dark/50 text-sm col-start-2'>Nama</p>
            </div>
            <div className='text-center'>
              <p className='text-dark/50 text-sm'>Qty</p>
            </div>
            <div className='text-right'>
              <p className='text-dark/50 text-sm'>Harga</p>
            </div>
          </div>
          {fields.length ? (
            <AccordionGroup>
              {fields.map((field, index) => (
                <AccordionItem key={field.id} id={`item-${index}`}>
                  <AccordionTrigger>
                    {(isOpen, toggle) => (
                      <div className='grid grid-cols-[2fr_40px_2fr_24px] pr-4 py-1.5 border-b gap-2'>
                        <div className='grid grid-cols-[32px_1fr] items-center gap-2'>
                          <button
                            type='button'
                            className='flex justify-center'
                            onClick={() => toggle()}
                          >
                            <Triangle
                              size={10}
                              className={cn(
                                'fill-dark/80',
                                !isOpen && 'rotate-180'
                              )}
                              strokeWidth={0}
                            />
                          </button>
                          <p className='text-dark text-sm'>
                            {watchItems[index]?.name}
                          </p>
                        </div>
                        <div className='text-center'>
                          <p className='text-dark text-sm'>
                            {watchItems[index]?.qty || 0}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='text-dark text-sm'>
                            {formatToRupiah(watchItems[index]?.price || 0)}
                          </p>
                        </div>
                        <Button
                          type='button'
                          variant='ghost'
                          onClick={() => handleRemove(index)}
                          className='p-0 h-full text-red-300 hover:text-red-500 rounded'
                        >
                          <Trash size={12} className='m-0 leading-none' />
                        </Button>
                      </div>
                    )}
                  </AccordionTrigger>
                  <AccordionContent className='border-b border-line'>
                    <div className='space-y-4'>
                      <input type='hidden' {...register(`items.${index}.id`)} />
                      <div className='flex gap-2 items-center'>
                        <div className='w-[100px] flex-shrink-0'>
                          <p className='text-dark/80'>Nama</p>
                        </div>
                        <div className='flex-grow'>
                          <Input {...register(`items.${index}.name`)} />
                        </div>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <div className='w-[100px] flex-shrink-0'>
                          <p className='text-dark/80'>Kuantitas</p>
                        </div>
                        <div className='flex-grow'>
                          <Input
                            type='number'
                            {...register(`items.${index}.qty`, {
                              valueAsNumber: true,
                            })}
                          />
                        </div>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <div className='w-[100px] flex-shrink-0'>
                          <p className='text-dark/80'>Harga</p>
                        </div>
                        <div className='flex-grow'>
                          <Input
                            type='number'
                            {...register(`items.${index}.price`, {
                              valueAsNumber: true,
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </AccordionGroup>
          ) : (
            <div className='w-full h-fit py-4 bg-gray-50/50 mt-4 flex justify-center items-center flex-col'>
              <img src={EmptyImg} className='w-20 aspect-square' />
              <p className='text-dark/80 font-medium mt-4'>Masih kosong</p>
            </div>
          )}
          {!!fields.length && (
            <div className='flex justify-end gap-2 pr-6 pt-2 items-center'>
              <p className='text-sm text-dark/50'>Total</p>
              <p className='text-sm font-medium text-dark'>
                {formatToRupiah(total)}
              </p>
            </div>
          )}
          <div className='px-4 pb-2 flex justify-end mt-4'>
            <Button type='submit' className='font-normal'>
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
