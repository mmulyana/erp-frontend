import useProtected from '@/features/auth/hooks/use-protected'
import LoginForm from '@/features/auth/components/login-form'
import Layout from '@/features/auth/components/layout'

import bg from '/public/images/dave-hoefler-vHgAy9pOs9I-unsplash.jpg'

export default function LoginPage() {
	useProtected()

	return (
		<>
			<Layout>
				<LoginForm />
			</Layout>
			<img src={bg} className='fixed -z-10 w-screen h-[100vh] object-cover' />
		</>
	)
}
