import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
  useDetailTransaction,
  useUpdateTransaction,
} from '@/hooks/api/use-transaction'
import { useInventoryData } from '../../_hook/use-inventory-data'
import Modal, { ModalContainer } from '@/components/modal-v2'
import SelectV1 from '@/components/common/select/select-v1'
import { CommandItem } from '@/components/ui/command'
import { useApiData } from '@/shared/hooks/use-api-data'
import { BASE_URL } from '@/shared/constants/urls'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { updateTransaction } from '@/utils/types/form'

export const dialogDetailTransaction = atom<{
  open: boolean
  id: number
} | null>(null)

type FormValues = {
  supplierId: number | null
  projectId: number | null
  price: number | null
  date: string
  qty: number
  goodsId: number
  type: string
}

export default function DetailTransaction() {
  // HANDLE DIALOG
  const [selected, setSelected] = useAtom(dialogDetailTransaction)
  const onClose = () => {
    setSelected(null)
  }

  // HANDLE GET DATA
  const { goods, suppliers } = useInventoryData()
  const { data, isLoading } = useApiData(
    useDetailTransaction({
      id: selected?.id,
      enabled: selected?.open || false,
    })
  )

  // HANDLE FORM
  const { mutate: update } = useUpdateTransaction()

  const form = useForm<FormValues>()

  const submit = (data: FormValues) => {
    if (!selected?.id) return
    const payload: updateTransaction = {
      supplierId: Number(data.supplierId),
      projectId: Number(data.projectId),
      price: Number(data.price),
      date: new Date(data.date),
      qty: Number(data.qty),
    }

    update(
      { id: selected?.id, payload },
      {
        onSuccess: () => {
          form.reset()
          onClose()
        },
      }
    )
  }

  useEffect(() => {
    if (data && !isLoading && !!selected?.open) {
      form.reset({
        goodsId: Number(data.goodsId),
        date: new Date(data.date).toISOString().split('T')[0],
        price: Number(data.price),
        projectId: Number(data.projectId),
        qty: Number(data.qty),
        supplierId: Number(data.supplierId),
        type: data.type,
      })
    }
  }, [selected?.open, data, isLoading])

  const type = form.watch('type')

  return (
    <Modal
      open={selected?.open || false}
      setOpen={onClose}
      title='Detail transaksi'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <ModalContainer setOpen={onClose}>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div className='col-span-1 md:col-span-2'>
                <FormItem>
                  <FormLabel>Barang</FormLabel>
                  <SelectV1
                    name='goodsId'
                    preview={(val) => {
                      const good = goods?.find(
                        (item) => item.id === Number(val)
                      )
                      return <span>{good?.name || ''}</span>
                    }}
                  >
                    {goods?.map((item) => (
                      <CommandItem
                        key={item.id}
                        className='hover:bg-red-400'
                        value={String(item.id)}
                        onSelect={(val: string) => {
                          form.setValue('goodsId', Number(val))
                        }}
                      >
                        <span className='p-2 grid grid-cols-[40px_1fr] gap-2 items-center'>
                          {item.photoUrl ? (
                            <img
                              src={BASE_URL + '/img/' + item.photoUrl}
                              className='w-full h-10 rounded'
                            />
                          ) : (
                            <div className='w-full h-10 rounded flex items-center justify-center'></div>
                          )}
                          {item.name}
                        </span>
                      </CommandItem>
                    ))}
                  </SelectV1>
                </FormItem>
              </div>
              <FormField
                control={form.control}
                name='qty'
                label='Kuantitas'
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const value = e.target.value
                      field.onChange(value === '' ? null : Number(value))
                    }}
                  />
                )}
              />
              <FormField
                control={form.control}
                name='price'
                label='Harga'
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const value = e.target.value
                      field.onChange(value === '' ? null : Number(value))
                    }}
                  />
                )}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {type == 'in' && (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <SelectV1
                    name='supplierId'
                    preview={(val) => {
                      const supplier = suppliers?.find(
                        (item) => item.id === Number(val)
                      )
                      return <span>{supplier?.name || ''}</span>
                    }}
                  >
                    {suppliers?.map((item) => (
                      <CommandItem
                        key={item.id}
                        className='hover:bg-red-400'
                        value={String(item.id)}
                        onSelect={(val: string) => {
                          form.setValue('goodsId', Number(val))
                        }}
                      >
                        <span className='p-2 grid grid-cols-[40px_1fr] gap-2 items-center'>
                          {item.photoUrl ? (
                            <img
                              src={BASE_URL + '/img/' + item.photoUrl}
                              className='w-full h-10 rounded'
                            />
                          ) : (
                            <div className='w-full h-10 rounded flex items-center justify-center'></div>
                          )}
                          {item.name}
                        </span>
                      </CommandItem>
                    ))}
                  </SelectV1>
                </FormItem>
              )}

              <div className='col-start-2'>
                <FormField
                  label='Tanggal'
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <Input
                      {...field}
                      type='date'
                      className='block'
                      value={field.value || ''} // Ensure value is always a string
                    />
                  )}
                />
              </div>
            </div>
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}
