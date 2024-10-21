import PhotoProfile from '@/components/common/photo-profile'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'

type Account = {
  fullname: ''
  email: ''
  phone: ''
}

export default function MenuAccount() {
  const form = useForm<Account>({
    defaultValues: {},
  })
  return (
    <Form {...form}>
      <form>
        <div className='flex flex-col gap-6 max-w-sm p-6'>
          <div>
            <Label className='mb-3 block font-normal text-dark/80'>Photo</Label>
            <PhotoProfile defaultPreview={null} size={64} />
          </div>
          <div>
            <FormField
              label='Nama'
              control={form.control}
              name='fullname'
              render={({ field }) => <Input className='w-full' {...field} />}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              label='Email'
              control={form.control}
              name='email'
              render={({ field }) => <Input {...field} />}
            />
            <FormField
              label='No. Telp'
              control={form.control}
              name='phone'
              render={({ field }) => <Input {...field} />}
            />
          </div>
          <Button className='w-fit'>Simpan</Button>
        </div>
      </form>
    </Form>
  )
}
