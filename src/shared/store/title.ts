import { atom, useSetAtom } from 'jotai'
import { Title } from '../types'
import { useEffect } from 'react'

export const titleAtom = atom<Title[]>([])
export const useTitle = (title: Title[]) => {
	const setTitle = useSetAtom(titleAtom)

	useEffect(() => {
		setTitle(title)
	}, [title])
}
