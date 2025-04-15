import { Camera, MessageCircle, SendHorizonal, ThumbsUp, X } from 'lucide-react'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'

import { BASE_URL } from '@/shared/utils/constant/_urls'
import { Activity } from '@/utils/types/api'
import { cn } from '@/shared/utils/cn'

import { userAtom } from '@/shared/store/auth'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import DropdownEdit from '@/components/common/dropdown-edit'
import { Form, FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { PreviewPhoto } from './preview-photo'
import { lightboxAtom } from '../detail-project'

const editAtom = atom<string | null>(null)

type MessageItemProps = Activity & {
  onSelectActivity?: (val: Partial<Activity> & { open: boolean }) => void
  onToggle?: (userId: number, activityId: number) => void
  onDelete?: (val: number) => void
  onUpdate?: (
    payload: Partial<Activity> & {
      photos: File[]
      deletedAttachments: string
      reset: () => void
    }
  ) => void
  nameKey: string
  hideReply?: boolean
}

export default function MessageItem2({
  onSelectActivity,
  onDelete,
  onToggle,
  onUpdate,
  nameKey,
  hideReply = false,
  ...props
}: MessageItemProps) {
  const currentUser = useAtomValue(userAtom)
  const isOwnMessage = currentUser?.id === props.user?.id
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [existingPhotos, setExistingPhotos] = useState(props.attachments || [])

  const setLightboxState = useSetAtom(lightboxAtom)
  const [edit, setEdit] = useAtom(editAtom)

  const form = useForm({
    defaultValues: {
      comment: props.comment,
      deletedPhotos: [] as number[],
      photos: [] as File[],
    },
  })

  const photos = form.watch('photos')

  useEffect(() => {
    if (!edit) {
      form.reset()
      setExistingPhotos(props.attachments || [])
    }
  }, [edit, props.attachments])

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

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

  const handleDeleteExistingPhoto = (photoId: number) => {
    const deletedValues = form.getValues('deletedPhotos')
    form.setValue('deletedPhotos', [...deletedValues, photoId])

    setExistingPhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo.id !== photoId)
    )
  }

  const handleImageClick = (index: number) => {
    const slides =
      props.attachments?.map((item) => ({
        src: BASE_URL + '/img/' + item.attachment,
      })) || []
    setLightboxState((prev) => ({
      ...prev,
      slides,
      currentIndex: index,
      isOpen: true,
    }))
  }

  const onReset = () => {
    form.reset()
    setEdit(null)
    setExistingPhotos(props.attachments || [])
  }

  const submit = (data: any) => {
    onUpdate?.({
      id: props.id,
      comment: data.comment,
      photos: data.photos as File[],
      deletedAttachments: data.deletedPhotos.join(','),
      reset: onReset,
    })
  }

  const editKey = `${nameKey}-${String(props.id)}`

  if (edit === editKey) {
    return (
      <div>
        <div className={cn('grid grid-cols-[28px_1fr] gap-2 p-2.5')}>
          {props.user.photo ? (
            <img
              src={BASE_URL + '/img/' + props.user.photo}
              className='w-7 h-7 rounded-full flex-shrink-0'
            />
          ) : (
            <div className='w-7 h-7 rounded-full flex-shrink-0 bg-blue-primary/5 flex items-center justify-center'>
              <p className='text-blue-primary leading-none uppercase font-medium'>
                {props.user.name.at(0)}
              </p>
            </div>
          )}
          <div className='flex flex-col gap-0.5'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-1'>
                <p
                  className={
                    isOwnMessage ? 'text-dark/80' : 'text-dark/50 text-sm'
                  }
                >
                  {props?.user?.name}
                </p>
              </div>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submit)} className='mt-2'>
                <div className='w-full relative'>
                  <div className='w-full'>
                    <FormField
                      control={form.control}
                      name='comment'
                      render={({ field }) => (
                        <Textarea className='rounded-xl w-full' {...field} />
                      )}
                    />
                    <div className='flex gap-2 mt-2 flex-wrap w-full flex-row'>
                      {/* Render existing photos */}
                      {existingPhotos.map((item, index) => (
                        <div
                          className='relative'
                          key={`exist-photo-${item.id}`}
                        >
                          <img
                            src={BASE_URL + '/img/' + item.attachment}
                            className='w-20 h-20 object-cover rounded-lg'
                            alt={`Attachment ${index + 1}`}
                          />
                          <button
                            type='button'
                            className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                            onClick={() => handleDeleteExistingPhoto(item.id)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      {/* Render new photos */}
                      {!!photos.length &&
                        photos.map((photo, index) => (
                          <PreviewPhoto
                            key={`new-photo-${index}`}
                            photo={photo}
                            onRemove={() => removeFile(index)}
                          />
                        ))}
                    </div>
                    <FormField
                      control={form.control}
                      name='photos'
                      render={({ field }) => (
                        <>
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
                  <div className='flex justify-between items-center mt-2.5'>
                    <Button
                      className='p-0 w-fit px-4 gap-1 h-8 rounded-full bg-gray-200'
                      variant='secondary'
                      onClick={onReset}
                      type='button'
                    >
                      Batal
                    </Button>
                    <div className='flex items-center gap-2'>
                      {existingPhotos.length + photos.length < 5 && (
                        <button
                          type='button'
                          onClick={handleCameraClick}
                          className='hover:bg-gray-100 px-2 rounded-md text-gray-600 h-8'
                        >
                          <Camera size={20} />
                        </button>
                      )}
                      <Button
                        type='submit'
                        className='p-0 w-fit px-2 pl-3 gap-1 h-8 rounded-full'
                      >
                        Perbarui
                        <SendHorizonal size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={cn('grid grid-cols-[28px_1fr] gap-2 p-2.5')}>
        {props.user.photo ? (
          <img
            src={BASE_URL + '/img/' + props.user.photo}
            className='w-7 h-7 rounded-full flex-shrink-0'
          />
        ) : (
          <div className='w-7 h-7 rounded-full flex-shrink-0 bg-blue-primary/5 flex items-center justify-center'>
            <p className='text-blue-primary leading-none uppercase font-medium'>
              {props.user.name.at(0)}
            </p>
          </div>
        )}
        <div className='flex flex-col gap-0.5'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-1'>
              <p
                className={
                  isOwnMessage ? 'text-dark/80' : 'text-dark/50 text-sm'
                }
              >
                {props?.user?.name}
              </p>
            </div>
            {isOwnMessage && (
              <DropdownEdit>
                <DropdownMenuItem
                  className='text-sm'
                  onClick={() => setEdit(editKey)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='text-sm'
                  onClick={() => onDelete?.(props.id)}
                >
                  Hapus
                </DropdownMenuItem>
              </DropdownEdit>
            )}
          </div>

          <p
            className={cn('text-dark')}
            onClick={() => {
              onSelectActivity?.({ id: props.id, open: true })
            }}
          >
            {props.comment}
          </p>

          {!!props.attachments?.length && (
            <div className='flex gap-1.5 items-center mt-1'>
              {props?.attachments.slice(0, 3).map((item, idx) => (
                <img
                  key={`attachment-${idx}`}
                  className='w-14 h-14 rounded-lg object-cover object-center cursor-pointer'
                  src={BASE_URL + '/img/' + item.attachment}
                  alt={`Attachment ${idx + 1}`}
                  onClick={() => handleImageClick(idx)}
                />
              ))}
              {props.attachments.length > 3 && (
                <div
                  className='w-14 h-14 rounded-lg bg-gray-200 flex justify-center items-center cursor-pointer hover:bg-gray-300'
                  onClick={() => handleImageClick(3)}
                >
                  <p className='text-dark font-medium'>
                    {props.attachments.length - 3}+
                  </p>
                </div>
              )}
            </div>
          )}

          <div className='flex justify-between items-start gap-2 mt-1.5'>
            <div className='flex gap-2 items-center'>
              <Button
                className='px-2 gap-1.5 border-dark/10 rounded h-fit py-1 bg-transparent text-dark'
                variant='outline'
                onClick={() => {
                  if (!currentUser?.id) return
                  onToggle?.(currentUser.id, props.id)
                }}
              >
                <ThumbsUp size={15} strokeWidth={2} />
                {!!props._count?.likes && (
                  <p className='text-dark leading-none'>
                    {props._count?.likes}
                  </p>
                )}
              </Button>
              {!hideReply && (
                <Button
                  className='px-2 gap-1.5 border-dark/10 rounded h-fit py-1 bg-transparent text-dark'
                  variant='outline'
                  onClick={() => {
                    onSelectActivity?.({ id: props.id, open: true })
                  }}
                >
                  <MessageCircle size={15} strokeWidth={2} />
                  {!!props._count?.replies && (
                    <p className='text-dark leading-none'>
                      {props._count?.replies}
                    </p>
                  )}
                </Button>
              )}
              <p className='text-sm text-dark/50'>
                {format(
                  new Date(props.updated_at ?? props.created_at),
                  'dd MMM yyyy, HH:mm'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
