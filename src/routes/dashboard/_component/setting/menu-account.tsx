import { userAtom } from '@/atom/auth'
import PhotoProfile from '@/components/common/photo-profile'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpdateAccount } from '@/hooks/api/use-account'
import { User } from '@/utils/types/api'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function MenuAccount() {
  const user = useAtomValue(userAtom)

  const { mutate: update } = useUpdateAccount()

  const form = useForm<User>({
    defaultValues: {
      email: '',
      name: '',
      phoneNumber: '',
      photo: '',
    },
  })

  const submit = (data: Partial<User>) => {
    if (!user?.id) return
    update({ id: user?.id, payload: data })
  }

  useEffect(() => {
    if (!!user) {
      form.reset({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photo: user.photo,
      })
    }
  }, [user])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className='flex flex-col gap-6 max-w-sm p-6'>
          <div>
            <Label className='mb-3 block font-normal text-dark/80'>Photo</Label>
            <PhotoProfile defaultPreview={null} size={64} />
          </div>
          <div>
            <FormField
              label='Nama'
              control={form.control}
              name='name'
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
              name='phoneNumber'
              render={({ field }) => <Input {...field} />}
            />
          </div>
          <Button className='w-fit'>Simpan</Button>
        </div>
      </form>
    </Form>
  )
}
