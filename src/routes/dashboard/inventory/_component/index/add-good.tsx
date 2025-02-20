import { ComponentIcon, MapIcon, Puzzle, RulerIcon } from 'lucide-react'
import UploadProfileV2 from '@/components/common/upload-profile-v2'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { useMeasurement } from '@/hooks/api/use-measurement'
import SelectV1 from '@/components/common/select/select-v1'
import { Form, FormField } from '@/components/ui/form'
import { useLocation } from '@/hooks/api/use-location'
import { useCategory } from '@/hooks/api/use-category'
import { useCreateGoods } from '@/hooks/api/use-goods'
import { CommandItem } from '@/components/ui/command'
import { useBrand } from '@/hooks/api/use-brand'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { atom, useAtom } from 'jotai'
import { useApiData } from '@/shared/hooks/use-api-data'
import { useFixPointerEvent } from '@/shared/hooks/use-fix-pointer-events'
import { EditorDescription } from '@/components/tiptap/editor-description'

export const dialogGoodAtom = atom<boolean>(false)

export default function AddGood() {
  const brands = useApiData(useBrand())
  const measurements = useApiData(useMeasurement())
  const locations = useApiData(useLocation())
  const categories = useApiData(useCategory())

  const [open, setOpen] = useAtom(dialogGoodAtom)

  const { mutate: create } = useCreateGoods()

  const form = useForm({
    defaultValues: {
      name: '',
      minimum: '',
      qty: '',
      brandId: '',
      measurementId: '',
      locationId: '',
      categoryId: '',
      description: '',
      photo: null as null | File,
    },
  })

  const onSubmit = (data: any) => {
    create(
      { payload: { ...data, available: data.qty } },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }

  useFixPointerEvent(open)

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title='Barang baru'
      className='md:max-w-[640px] max-w-full'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ModalContainer setOpen={setOpen}>
            <div className='space-y-4'>
              <UploadProfileV2 name='photo' />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  label='Nama'
                  control={form.control}
                  name='name'
                  render={({ field }) => <Input {...field} />}
                />
                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    label='Kuantitas'
                    control={form.control}
                    name='qty'
                    render={({ field }) => <Input {...field} />}
                  />
                  <FormField
                    label='Batas minimum'
                    control={form.control}
                    name='minimum'
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center flex-wrap'>
                <SelectV1
                  name='categoryId'
                  className='w-fit gap-2'
                  prefix={<ComponentIcon size={14} />}
                  placeholder='Pilih kategori'
                  preview={(val) => {
                    const category = categories?.data?.find(
                      (item) => item.id === Number(val)
                    )
                    return <span>{category?.name || ''}</span>
                  }}
                >
                  {categories?.data?.map((item) => (
                    <CommandItem
                      key={item.id}
                      className='hover:bg-red-400'
                      value={String(item.id)}
                      onSelect={(value: string) => {
                        form.setValue('categoryId', value)
                      }}
                    >
                      <span className='px-2 py-0.5 flex gap-1 items-center'>
                        {item.name}
                      </span>
                    </CommandItem>
                  ))}
                </SelectV1>

                <SelectV1
                  name='brandId'
                  className='w-fit gap-2'
                  prefix={<Puzzle size={14} />}
                  placeholder='Pilih Merek'
                  preview={(val) => {
                    const brand = brands?.data?.find(
                      (item) => item.id === Number(val)
                    )
                    return <span>{brand?.name || ''}</span>
                  }}
                >
                  {brands?.data?.map((item) => (
                    <CommandItem
                      key={item.id}
                      className='hover:bg-red-400'
                      value={String(item.id)}
                      onSelect={(value: string) => {
                        form.setValue('brandId', value)
                      }}
                    >
                      <span className='px-2 py-0.5 flex gap-1 items-center'>
                        {item.name}
                      </span>
                    </CommandItem>
                  ))}
                </SelectV1>

                <SelectV1
                  name='measurementId'
                  className='w-fit gap-2'
                  prefix={<RulerIcon size={14} />}
                  placeholder='Pilih ukuran'
                  preview={(val) => {
                    const measurement = measurements?.data?.find(
                      (item) => item.id === Number(val)
                    )
                    return <span>{measurement?.name || ''}</span>
                  }}
                >
                  {measurements?.data?.map((item) => (
                    <CommandItem
                      key={item.id}
                      className='hover:bg-red-400'
                      value={String(item.id)}
                      onSelect={(value: string) => {
                        form.setValue('measurementId', value)
                      }}
                    >
                      <span className='px-2 py-0.5 flex gap-1 items-center'>
                        {item.name}
                      </span>
                    </CommandItem>
                  ))}
                </SelectV1>

                <SelectV1
                  name='locationId'
                  className='w-fit gap-2'
                  prefix={<MapIcon size={14} />}
                  placeholder='Pilih lokasi'
                  preview={(val) => {
                    const location = locations?.data?.find(
                      (item) => item.id === Number(val)
                    )
                    return <span>{location?.name || ''}</span>
                  }}
                >
                  {locations?.data?.map((item) => (
                    <CommandItem
                      key={item.id}
                      className='hover:bg-red-400'
                      value={String(item.id)}
                      onSelect={(value: string) => {
                        form.setValue('locationId', value)
                      }}
                    >
                      <span className='px-2 py-0.5 flex gap-1 items-center'>
                        {item.name}
                      </span>
                    </CommandItem>
                  ))}
                </SelectV1>
              </div>

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <EditorDescription
                    content={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}
