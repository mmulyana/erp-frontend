import { Toaster } from '@/components/ui/sonner'

export default function NotificationWrapper({
	children,
}: React.PropsWithChildren) {
	return (
		<>
			{children}
			<Toaster richColors position='bottom-right' duration={1500} />
		</>
	)
}
