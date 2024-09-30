import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { useDeleteAccount } from '@/hooks/api/use-account'
import { delay } from '@/utils/delay'
import ResponsiveModal from '@/components/modal-responsive'

type Props = {
  id?: number
}

let TEXT = {
  TITLE: 'Confirm Account Deletion',
  BODY: 'Are you sure you want to delete this account?',
}

export default function Delete(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isPending, setIsPending] = useState<boolean>(false)

  const { mutate } = useDeleteAccount()

  const submit = () => {
    if(!props.id) return
    mutate(
      { id: props.id },
      {
        onSuccess: () => {
          setIsPending(true)
          delay(400).then(() => {
            setIsPending(false)
          })

          delay(600).then(() => {
            setIsOpen(false)
          })
        },
      }
    )
  }

  return (
    <>
      <Button
        variant='ghost'
        className='text-gray-400 hover:text-red-400'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Trash className='h-4 w-4' />
      </Button>
      <ResponsiveModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={TEXT.TITLE}
        body={TEXT.BODY}
      >
        <div className='grid grid-cols-2 md:flex justify-end gap-4'>
          <Button
            type='button'
            onClick={() => setIsOpen(false)}
            variant='outline'
            className='w-full block md:hidden'
          >
            Cancel
          </Button>
          <Button onClick={submit} variant='destructive' className='w-1/2'>
            {isPending ? 'loading' : 'Delete'}
          </Button>
        </div>
      </ResponsiveModal>
    </>
  )
}
