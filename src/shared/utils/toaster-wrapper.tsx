import { Toaster } from '../components/ui/sonner'

export default function ToasterWrapper({ children }: React.PropsWithChildren) {
	return (
		<>
			{children}
			<Toaster
				richColors
				theme='light'
				position='bottom-right'
				duration={1500}
			/>
		</>
	)
}
