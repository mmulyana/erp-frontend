import { useMediaQuery } from '@uidotdev/usehooks'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useAccount } from '@/utils/api/use-account'
import { useForm } from 'react-hook-form'
import { userSchema } from '../schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const text = {
  title: 'Edit Account',
  body: 'Edit the details of this account.',
}

type Props = {
  id?: number
}
export default function Edit(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const isSmall = useMediaQuery('only screen and (max-width : 768px)')
  const { isLoading, data } = useAccount(props.id)

  useEffect(() => {
    if (!isLoading) {
      form.setValue('name', data.name)
      form.setValue('email', data.email)
    }
  }, [isLoading, data])

  const onSubmit = (data: z.infer<typeof userSchema>) => {
    console.log(data)
  }

  if (isSmall) {
    return (
      <>
        <Button
          variant='ghost'
          className='text-gray-400 hover:text-gray-800'
          onClick={() => setIsOpen(!isOpen)}
        >
          <Pencil className='h-4 w-4' />
        </Button>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{text.title}</DrawerTitle>
              <DrawerDescription>{text.body}</DrawerDescription>
            </DrawerHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full flex flex-col gap-4 px-4'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <div className='relative'>
                        <FormControl>
                          <Input placeholder='Name' {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className='relative'>
                        <FormControl>
                          <Input
                            placeholder='Email'
                            {...field}
                            autoComplete='none'
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DrawerFooter className='grid grid-cols-2 px-0 gap-4'>
                  <Button
                    type='button'
                    onClick={() => setIsOpen(false)}
                    variant='outline'
                    className='w-full'
                  >
                    Cancel
                  </Button>
                  <Button type='submit'>Save changes</Button>
                </DrawerFooter>
              </form>
            </Form>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant='ghost'
        className='text-gray-400 hover:text-gray-800'
      >
        <Pencil className='h-4 w-4' />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='sm:max-w-[480px]'>
          <DialogHeader>
            <DialogTitle>{text.title}</DialogTitle>
            <DialogDescription>{text.body}</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full flex flex-col gap-4'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <div className='relative'>
                      <FormControl>
                        <Input placeholder='Name' {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className='relative'>
                      <FormControl>
                        <Input
                          placeholder='Email'
                          {...field}
                          autoComplete='none'
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type='submit'>Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
