import { atom, useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

import { useCreateTour } from '../api/use-create-tour'
import { userAtom } from '@/shared/store/auth'

export const startTourAtom = atom(false)

export default function useTour(key: string) {
	const { mutate } = useCreateTour()

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

	const onTourEnd = (type?: 'skip' | 'end') => {
		if (!user?.id) return
		if (type === 'skip') {
			setStart(false)
			return
		}

		if (!user?.tours?.includes(key)) {
			mutate({
				id: user?.id,
				key: key,
			})
		}
		setStart(false)
	}

	return { start, onTourEnd }
}
