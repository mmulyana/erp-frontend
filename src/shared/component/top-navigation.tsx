import { cn } from '@/utils/cn'
import { paths } from '@/utils/constant/_paths'
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
							'relative px-4 h-12 flex gap-1.5 items-center justify-center font-semibold text-sm text-[#828599]',
							isActive && 'text-blue-primary'
						)}
					>
						{isActive && (
							<div className='absolute bottom-0 left-0 w-full h-1 bg-blue-primary rounded-t-lg' />
						)}
						{icon}
						{label}
					</Link>
				)
			})}
		</div>
	)
}
