import { HardHat, Package2, UserCircle2, Users } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { useHasPermission } from '@/shared/hooks/use-has-permission'
import { permissions } from '@/shared/constants/permissions'
import { paths } from '@/shared/constants/paths'
import { cn } from '@/shared/utils/cn'

const tabs = [
	{
		to: paths.hris,
		match: '/hris',
		icon: <Users size={18} />,
		label: 'HRIS',
		permission: [],
	},
	{
		to: paths.project,
		match: '/project',
		icon: <HardHat size={18} />,
		label: 'Project',
		permission: [],
	},
	{
		to: paths.inventory,
		match: '/inventory',
		icon: <Package2 size={18} />,
		label: 'Inventory',
		permission: [],
	},
	{
		to: paths.adminUser,
		match: '/admin',
		icon: <UserCircle2 size={18} />,
		label: 'Admin',
		permission: [
			permissions.user_create,
			permissions.user_delete,
			permissions.user_update,
			permissions.user_view,
			permissions.role_create,
			permissions.role_delete,
			permissions.role_update,
			permissions.role_view,
		],
	},
]

export default function TopNavigation() {
	const { pathname } = useLocation()

	return (
		<div className='flex gap-4'>
			{tabs.map(({ to, icon, label, match, permission }) => {
				const isActive = pathname.startsWith(match)
				const canView = useHasPermission(permission)

				if (!canView) return null

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
