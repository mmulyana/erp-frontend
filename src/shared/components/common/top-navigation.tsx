import { cn } from '@/shared/utils/cn'
import { paths } from '@/shared/constants/paths'
import { HardHat, Package2, Users } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const tabs = [
	{
		to: paths.hris,
		icon: <Users size={18} />,
		label: 'HRIS',
	},
	{
		to: paths.project,
		icon: <HardHat size={18} />,
		label: 'Project',
	},
	{
		to: paths.inventory,
		icon: <Package2 size={18} />,
		label: 'Inventory',
	},
]

export default function TopNavigation() {
	const { pathname } = useLocation()

	return (
		<div className='flex gap-4'>
			{tabs.map(({ to, icon, label }) => {
				const isActive = pathname.includes(to)

				return (
					<Link
						key={label}
						to={to}
						className={cn(
							'relative px-3 h-fit py-1.5 flex gap-2 items-center justify-center font-semibold text-sm text-ink-primary/80 rounded-md',
							isActive && 'text-brand bg-brand/5'
						)}
					>
						{icon}
						{label}
					</Link>
				)
			})}
		</div>
	)
}
