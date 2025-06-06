type props = {
	deletedAt?: string | null
	children: React.ReactNode
}

export default function Visible({ deletedAt, children }: props) {
	if (deletedAt) return null
	return <>{children}</>
}
