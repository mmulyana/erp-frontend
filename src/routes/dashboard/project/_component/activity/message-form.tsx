import { useForm } from 'react-hook-form'
import { useAtomValue } from 'jotai'
import { useRef } from 'react'

import { useCreateActivity } from '@/hooks/api/use-activity'
import { Form, FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { userAtom } from '@/atom/auth'
import { PreviewPhoto } from './preview-photo'

import { Camera, SendHorizonal } from 'lucide-react'

type MessageProps = {
  type: 'textarea' | 'input'
  id?: number | null
  projectId?: number | null
}

interface FormInputs {
  comment: string
  photos: File[]
}

export default function MessageForm({ type, id, projectId }: MessageProps) {
  const user = useAtomValue(userAtom)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // HANDLE FORM
  const { mutate } = useCreateActivity()

  const form = useForm<FormInputs>({
    defaultValues: {
      comment: '',
      photos: [],
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const currentPhotos = form.getValues('photos') || []
    form.setValue('photos', [...currentPhotos, ...files])
  }

  const removeFile = (index: number) => {
    const currentPhotos = form.getValues('photos')
    form.setValue(
      'photos',
      currentPhotos.filter((_, i) => i !== index)
    )
  }

  const submit = async (data: any) => {
    if (!user || !projectId) return

    mutate(
      {
        projectId,
        comment: data.comment,
        userId: user?.id,
        replyId: id ?? null,
        type: id ? 'detail' : 'project',
        photos: data.photos,
      },
      {
        onSuccess: () => {
          form.reset({ comment: '', photos: [] })
        },
      }
    )
  }

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  if (type == 'textarea') {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className='w-full relative'>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='comment'
                render={({ field }) => (
                  <Textarea className='rounded-xl w-full' {...field} />
                )}
              />
              <FormField
                control={form.control}
                name='photos'
                render={({ field }) => (
                  <>
                    {field.value?.length > 0 && (
                      <div className='flex gap-2 mt-2 flex-wrap'>
                        {field.value.map((file, index) => (
                          <PreviewPhoto
                            key={index}
                            photo={file}
                            onRemove={() => removeFile(index)}
                          />
                        ))}
                      </div>
                    )}
                    <input
                      type='file'
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      multiple
                      accept='image/*'
                      className='hidden'
                      name={field.name}
                    />
                  </>
                )}
              />
            </div>
            <div className='flex justify-end items-center gap-2 mt-2'>
              <button
                type='button'
                onClick={handleCameraClick}
                className='hover:bg-gray-100 px-2 rounded-md text-gray-400 h-8'
              >
                <Camera size={20} />
              </button>
              <Button
                type='submit'
                className='p-0 w-fit px-2 pl-3 gap-1 h-8 rounded-full'
              >
                Kirim
                <SendHorizonal size={16} />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className='w-full relative'>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='comment'
              render={({ field }) => (
                <div className='relative'>
                  <Input
                    className='rounded-full'
                    placeholder='tulis pesan disini'
                    {...field}
                  />
                  <FormField
                    control={form.control}
                    name='photos'
                    render={({ field }) => (
                      <>
                        {field.value?.length > 0 && (
                          <div className='flex gap-2 mt-2 flex-wrap'>
                            {field.value.map((file, index) => (
                              <PreviewPhoto
                                key={index}
                                photo={file}
                                onRemove={() => removeFile(index)}
                              />
                            ))}
                          </div>
                        )}
                        <input
                          type='file'
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          multiple
                          accept='image/*'
                          className='hidden'
                          name={field.name}
                        />
                      </>
                    )}
                  />
                  <div className='flex justify-between items-center gap-2 absolute top-1/2 -translate-y-1/2 right-1'>
                    <button
                      type='button'
                      onClick={handleCameraClick}
                      className='hover:bg-gray-100 px-2 rounded-md text-gray-400 h-8'
                    >
                      <Camera size={20} />
                    </button>
                    <Button
                      type='submit'
                      className='p-0 w-fit px-2 gap-1 h-8 rounded-full'
                    >
                      <SendHorizonal size={16} />
                    </Button>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}
