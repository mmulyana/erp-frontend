import { useParams } from 'react-router-dom'

import { useEmployee } from '../api/use-employee'

export const useDetailEmployee = () => {
	const { id } = useParams()
	const data = useEmployee(id)
	return data
}
