import { useNavigate } from 'react-router-dom'

import Header from '@/shared/components/common/header'
import { Button } from '@/shared/components/ui/button'

export default function AccessDenied() {
	const navigate = useNavigate()
	const queryParams = new URLSearchParams(location.search)
	const pagesName = queryParams.get('pagesName') || 'halaman ini'
  
	return (
		<>
			<Header />
			<div className='min-h-screen flex items-center justify-center max-w-xl mx-auto px-4'>
				<div className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
					<h1 className='text-4xl font-bold mb-4'>Akses Ditolak</h1>
					<p className='text-lg text-gray-700 mb-6'>
						Anda tidak memiliki izin untuk mengakses {pagesName}.
					</p>
					<Button
						onClick={() => navigate(-1)}
						className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
					>
						Kembali
					</Button>
				</div>
			</div>
		</>
	)
}
