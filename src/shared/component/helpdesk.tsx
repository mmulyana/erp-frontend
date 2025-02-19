import {
  Bug,
  Headset,
  MessageSquarePlus,
  ArrowLeft,
  SendHorizonal,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { userAtom } from '@/shared/store/auth'
import { useCreateHelpdesk } from '@/hooks/api/use-helpdesk'

export default function Helpdesk() {
  const user = useAtomValue(userAtom)

  const [isOpen, setIsOpen] = useState(false)
  const [activeView, setActiveView] = useState('main')
  const [type, setType] = useState<'bug' | 'feature'>('bug')

  const { mutate } = useCreateHelpdesk()

  const form = useForm({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit = (data: any) => {
    if (!user?.id) return
    console.log(data)
    mutate(
      { type, message: data.message, userId: user?.id },
      {
        onSuccess: () => {
          form.reset()
          setActiveView('main')
        },
      }
    )
  }

  const handleTypeSelect = (selectedType: 'bug' | 'feature') => {
    setType(selectedType)
    setActiveView('form')
  }

  const handleBack = () => {
    form.reset()
    setActiveView('main')
  }

  return (
    <div className='fixed bottom-6 right-6'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-10 h-10 rounded-full bg-brand-blue text-white shadow-lg transition-transform duration-300 ease-in-out flex justify-center items-center shadow-brand-blue/50'
      >
        <Headset size={20} />
      </button>

      {isOpen && (
        <div className='absolute bottom-12 right-0 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-2 bg-white shadow-lg shadow-gray-400/20 rounded-md h-fit w-[220px] md:w-[240px] overflow-hidden'>
          <div className='h-10 w-full bg-brand-blue flex items-center px-4 text-white gap-1.5'>
            {activeView === 'form' && (
              <button onClick={handleBack} className='mr-2'>
                <ArrowLeft size={18} />
              </button>
            )}
            <Headset size={18} />
            <span className='text-sm'>Helpdesk</span>
          </div>

          {activeView === 'main' ? (
            <div>
              <button
                onClick={() => handleTypeSelect('feature')}
                className='w-full hover:bg-accent flex items-center gap-2 py-4 border-b px-4'
              >
                <MessageSquarePlus className='text-gray-400' size={18} />
                <p className='text-dark text-sm'>Buat Fitur Baru</p>
              </button>
              <button
                onClick={() => handleTypeSelect('bug')}
                className='w-full hover:bg-accent flex items-center gap-2 py-4 px-4'
              >
                <Bug className='text-gray-400' size={18} />
                <p className='text-dark text-sm'>Lapor Kendala atau bug</p>
              </button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='p-4'>
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder={
                            type === 'feature'
                              ? 'Jelaskan fitur yang diinginkan'
                              : 'Jelaskan kendala atau bug yang dialami'
                          }
                          className='resize-none h-28'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <button
                  type='submit'
                  className='w-fit ml-auto mt-4 px-4 rounded-full gap-2 py-2 bg-brand-blue text-white hover:bg-brand-blue/90 flex justify-center items-center'
                >
                  Kirim
                  <SendHorizonal size={20} />
                </button>
              </form>
            </Form>
          )}
        </div>
      )}
    </div>
  )
}
