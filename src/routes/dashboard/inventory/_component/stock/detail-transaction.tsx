import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useDetailTransaction } from '@/hooks/api/use-transaction'
import { useInventoryData } from '../../_hook/use-inventory-data'
import Modal, { ModalContainer } from '@/components/modal-v2'
import SelectV1 from '@/components/common/select/select-v1'
import { CommandItem } from '@/components/ui/command'
import { useApiData } from '@/hooks/use-api-data'
import { BASE_URL } from '@/utils/constant/_urls'
import { Transaction } from '@/utils/types/api'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

export const dialogDetailTransaction = atom<{
  open: boolean
  id: number
} | null>(null)

type FormValues = Partial<Transaction>

export default function DetailTransaction() {
  const [selected, setSelected] = useAtom(dialogDetailTransaction)
  const onClose = () => {
    setSelected(null)
  }

  const { goods, suppliers } = useInventoryData()

  const { data, isLoading } = useApiData(
    useDetailTransaction({
      id: selected?.id,
      enabled: selected?.open || false,
    })
  )

  const form = useForm<FormValues>()

  const submit = (data: FormValues) => {
    console.log(data)
  }

  useEffect(() => {
    if (data && !isLoading && !!selected?.open) {
      form.reset({
        goodsId: data.goodsId,
        date: data.date,
        isReturned: data.isReturned,
        price: data.price,
        projectId: data.projectId,
        qty: data.qty,
        supplierId: data.supplierId,
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
              <div className='col-span-2'>
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
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                control={form.control}
                name='price'
                label='Harga'
                render={({ field }) => <Input {...field} />}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormItem>
                <FormLabel>Supplier</FormLabel>
                {type == 'in' && (
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
                )}
              </FormItem>

              <div className='col-start-2'>
                <FormField
                  control={form.control}
                  name='price'
                  label='Harga'
                  render={({ field }) => <Input {...field} />}
                />
              </div>
            </div>
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}
