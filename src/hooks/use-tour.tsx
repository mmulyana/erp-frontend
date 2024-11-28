import { userAtom } from '@/atom/auth'
import { atom, useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { useCreateTourAccount } from './api/use-account'

export const startTourAtom = atom(false)

export default function useTour(key: string) {
  const { mutate } = useCreateTourAccount()

  const [start, setStart] = useAtom(startTourAtom)
  const user = useAtomValue(userAtom)

  const [isFirst, setIsFirst] = useState(true)
  useEffect(() => {
    if (!isFirst || !user?.tours) return

    if (user.tours.length === 0) {
      setStart(true)
    }
    if (!user?.tours.includes(key)) {
      setStart(true)
    }
    setIsFirst(false)

    return () => {
      setStart(false)
      setIsFirst(true)
    }
  }, [user?.tours])

  const onTourEnd = () => {
    if (!user?.id) return
    mutate({
      id: user?.id,
      name: key,
    })
  }

  return { start, onTourEnd }
}
