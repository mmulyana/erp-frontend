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
		permission: [
			permissions.pages_hris_dashboard,
			permissions.pages_hris_employee,
			permissions.pages_hris_attendance,
			permissions.pages_hris_overtime,
			permissions.pages_hris_cash_advance,
			permissions.pages_hris_payroll,
			permissions.pages_hris_slip_gaji,
		],
	},
	{
		to: paths.project,
		match: '/project',
		icon: <HardHat size={18} />,
		label: 'Project',
		permission: [
			permissions.pages_project_dashboard,
			permissions.pages_project_list,
			permissions.pages_project_client,
			permissions.pages_project_client_company,
		],
	},
	{
		to: paths.inventory,
		match: '/inventory',
		icon: <Package2 size={18} />,
		label: 'Inventory',
		permission: [
			permissions.pages_inventory_dashboard,
			permissions.pages_inventory_item,
			permissions.pages_inventory_warehouse,
			permissions.pages_inventory_brand,
			permissions.pages_inventory_supplier,
			permissions.pages_inventory_stock_in,
			permissions.pages_inventory_stock_out,
			permissions.pages_inventory_stock_borrow,
		],
	},
	{
		to: paths.adminUser,
		match: '/admin',
		icon: <UserCircle2 size={18} />,
		label: 'Admin',
		permission: [permissions.pages_admin_user, permissions.pages_admin_role],
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
