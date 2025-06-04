import useProtected from '@/features/auth/hooks/use-protected'
import LoginForm from '@/features/auth/component/login-form'
import { useSearchParams } from 'react-router-dom'

export default function LoginPage() {
	useProtected()

	const [searchParams] = useSearchParams()

	const mode = searchParams.get('mode')
	const guestMode = mode === 'GUEST'

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
				<div className='h-full w-full flex justify-center items-center'>
					<LoginForm guestMode={guestMode} />
				</div>
				<div className='h-full w-full justify-center items-center bg-[#475DEF] hidden md:flex'>
					<div className='flex flex-col gap-[120px] items-center justify-center'>
						<img
							src='/images/login-illustration.png'
							className='w-[401px] h-auto'
						/>
						<div className='flex flex-col gap-6 items-center justify-center'>
							<div className='flex items-center gap-2'>
								<img src='/images/logo.png' className='w-10 h-10' />
								<p className='text-white text-lg font-medium'>Barokah ERP</p>
							</div>
							<p className='text-white font-light max-w-[280px] mx-auto text-center'>
								Atur semuanya dengan mudah hanya dalam satu platform
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
