import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PhoneNumber } from '@/utils/types/api'
import { Phone } from 'lucide-react'
import { KeyboardEvent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
  id?: number | null
  phones: PhoneNumber[]
}
export default function PhoneEmployee({ id, phones }: Props) {
  const form = useForm<{ value: string }>({
    defaultValues: {
      value: '',
    },
  })
  const [isPhone, setIsPhone] = useState(false)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        
    }
  }

  const submit = (data: { value: string }) => {}

  if (!id) return null

  return (
    <div className='space-y-2'>
      <div className='flex gap-2 flex-wrap'>
        {phones?.map((phone, index) => (
          <div
            key={index}
            className='px-2 py-0.5 rounded-full border border-line text-dark/50'
          >
            {phone.value}
          </div>
        ))}
      </div>
      {isPhone ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <div className='flex gap-2 items-center'>
              <div className='relative'>
                <Controller
                  control={form.control}
                  name='value'
                  render={({ field }) => (
                    <Input
                      onKeyDown={handleKeyDown}
                      className='peer ps-9 [direction:inherit]'
                      {...field}
                    />
                  )}
                />
                <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
                  <Phone size={16} strokeWidth={2} aria-hidden='true' />
                </div>
              </div>
              <Button
                type='submit'
                variant='secondary'
                className='h-6 font-normal text-sm rounded-md p-0 px-2'
              >
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Button
          variant='ghost'
          className='font-normal p-0 hover:bg-transparent gap-1 flex items-center text-blue-primary/80 hover:text-blue-primary h-fit px-2 py-0.5 relative border text-sm'
          onClick={() => setIsPhone(true)}
        >
          Tambah No.telp
        </Button>
      )}
    </div>
  )
}
