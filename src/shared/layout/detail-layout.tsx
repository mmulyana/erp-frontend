import HeaderV2 from '../components/common/header-v2'

type Props = {
	children: React.ReactNode
	title: string
	back?: string
}
export default function DetailLayout({ children, title, back }: Props) {
	return (
		<>
			<HeaderV2 title={title} back={back} />
			<main className='pt-16 flex-1 min-h-screen bg-surface'>{children}</main>
		</>
	)
}
