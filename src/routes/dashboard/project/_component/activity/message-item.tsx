import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import DropdownEdit from '@/components/common/dropdown-edit'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Camera, MessageCircle, SendHorizonal, ThumbsUp, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Activity } from '@/utils/types/api'
import MessageForm from './message-form'
import { userAtom } from '@/atom/auth'
import { atom, useAtom, useAtomValue } from 'jotai'
import { format } from 'date-fns'
import { cn } from '@/utils/cn'
import { BASE_URL } from '@/utils/constant/_urls'
import { useMemo, useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { PreviewPhoto } from './preview-photo'

const editAtom = atom<number | null>(null)

type MessageContentProps = Activity & {
  isOwnMessage: boolean
  onSelectActivity?: (val: Partial<Activity> & { open: boolean }) => void
  onDelete?: (val: number) => void
  onToggle?: (userId: number, activityId: number) => void
  showReplyButton?: boolean
}

function MessageContent({
  onSelectActivity,
  isOwnMessage,
  onDelete,
  userId,
  onToggle,
  showReplyButton = true,
  ...props
}: MessageContentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  const [edit, setEdit] = useAtom(editAtom)

  const existingPhotos = useMemo(
    () =>
      props.attachments?.map((item) => ({
        attachment: item.attachment,
        id: item.id,
      })),
    [props.attachments]
  )

  const form = useForm({
    defaultValues: {
      comment: props.comment,
      existingPhotos,
      deletedPhotos: [],
      photos: [] as File[],
    },
  })

  const existPhotos = useFieldArray({
    control: form.control,
    name: 'existingPhotos',
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

  const onUpdate = (data: any) => {
    console.log(data)
  }

  if (edit == props.id) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)}>
          <div className='w-full relative'>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='comment'
                render={({ field }) => (
                  <Textarea className='rounded-xl w-full' {...field} />
                )}
              />
              <div className='flex gap-2 mt-2 flex-wrap'>
                {existPhotos.fields.map((item, index) => {
                  return (
                    <div className='relative' key={`exist-photo-` + index}>
                      <img
                        src={BASE_URL + '/img/' + item.attachment}
                        className='w-20 h-20 object-cover rounded-lg'
                      />
                      <button
                        type='button'
                        className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                        onClick={() => {
                          const deletedValues = form.getValues('deletedPhotos')
                          form.setValue('deletedPhotos', [
                            ...deletedValues,
                            item.id,
                          ])
                          existPhotos.remove(index)
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )
                })}
                <FormField
                  control={form.control}
                  name='photos'
                  render={({ field }) => (
                    <>
                      {field.value?.length > 0 &&
                        field.value.map((file, index) => (
                          <PreviewPhoto
                            key={index}
                            photo={file}
                            onRemove={() => removeFile(index)}
                          />
                        ))}
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
            </div>
            <div className='flex justify-between items-center border mt-2.5'>
              <Button
                className='p-0 w-fit px-2 gap-1 h-8 rounded-full'
                variant='secondary'
                onClick={() => setEdit(null)}
              >
                Batal
              </Button>
              <div className='flex items-center gap-2'>
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
          </div>
        </form>
      </Form>
    )
  }

  return (
    <div className='flex flex-col gap-0.5'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-1'>
          <p className={isOwnMessage ? 'text-dark/80' : 'text-dark/50 text-sm'}>
            {props?.user?.name}
          </p>
          <p className='text-sm text-dark/50'>
            {format(
              new Date(props.updated_at ?? props.created_at),
              'dd MMM yyyy, HH:mm'
            )}
          </p>
        </div>
        {isOwnMessage && (
          <DropdownEdit>
            {isOwnMessage && (
              <DropdownMenuItem
                className='text-sm'
                onClick={() => {
                  setEdit(props.id)
                }}
              >
                Edit
              </DropdownMenuItem>
            )}
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
        className={`text-dark ${isOwnMessage ? 'mt-1' : 'text-lg'}`}
        onClick={() => {
          onSelectActivity?.({ id: props.id, open: true })
        }}
      >
        {props.comment}
      </p>

      {!!props.attachments?.length && (
        <div className='flex gap-1.5 items-center mt-1'>
          {props?.attachments.slice(0, 2).map((item) => (
            <img
              className='w-14 h-14 rounded-lg object-cover object-center'
              src={BASE_URL + '/img/' + item.attachment}
            />
          ))}
          {props.attachments.length > 2 && (
            <div className='w-14 h-14 rounded-lg bg-gray-100 flex justify-center items-center'>
              <p className='text-dark font-medium'>
                {props.attachments.length - 2}+
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
              if (!userId) return
              onToggle?.(userId, props.id)
            }}
          >
            <ThumbsUp size={15} strokeWidth={2} />
            {!!props.likes?.length && (
              <p className='text-dark leading-none'>{props.likes.length}</p>
            )}
          </Button>
          {showReplyButton && (
            <Button
              className='px-2 gap-1.5 border-dark/10 rounded h-fit py-1 bg-transparent text-dark'
              variant='outline'
              onClick={() => {
                onSelectActivity?.({ id: props.id, open: true })
              }}
            >
              <MessageCircle size={15} strokeWidth={2} />
              {!!props.replies?.length && (
                <p className='text-dark leading-none'>{props.replies.length}</p>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

type MessageItemProps = Activity & {
  onSelectActivity?: (val: Partial<Activity> & { open: boolean }) => void
  onToggle?: (userId: number, activityId: number) => void
  onDelete?: (val: number) => void
  withReplies?: boolean
}

export default function MessageItem({
  onSelectActivity,
  withReplies = false,
  onDelete,
  onToggle,
  ...props
}: MessageItemProps) {
  const currentUser = useAtomValue(userAtom)
  const isOwnMessage = currentUser?.id === props.user?.id

  return (
    <div>
      <div
        className={cn(
          'grid grid-cols-[28px_1fr] gap-2',
          withReplies && 'p-2.5'
        )}
      >
        <div className='w-7 h-7 rounded-full bg-gray-200'></div>
        <MessageContent
          {...props}
          isOwnMessage={isOwnMessage}
          onSelectActivity={onSelectActivity}
          onDelete={onDelete}
          onToggle={onToggle}
          showReplyButton={!props?.replyId}
        />
      </div>

      {withReplies && (
        <ScrollArea className='h-56 px-4 bg-[#F5F5F5] relative'>
          <div className='absolute top-0 left-0 w-full px-4 pt-2'>
            <MessageForm
              type='input'
              id={props.id}
              projectId={props.projectId}
            />
          </div>
          <div className='w-full flex flex-col gap-4 pt-16 pb-10'>
            {props.replies?.map((reply) => (
              <MessageItem
                onSelectActivity={onSelectActivity}
                key={`reply-${reply.id}`}
                withReplies={false}
                onDelete={onDelete}
                onToggle={onToggle}
                {...reply}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
