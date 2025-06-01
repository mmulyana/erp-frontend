import { useState, useEffect } from 'react'
import ToggleSwitch from '@/shared/components/common/toggle-switch'

type Permission = {
	key: string
	name: string
	description: string
}

type PermissionGroup = {
	name: string
	permissions: Permission[]
}

type Props = {
	data: PermissionGroup[]
	value: string[]
	onChange?: (val: string[]) => void
}

export default function PermissionList({ data, value, onChange }: Props) {
	const [selected, setSelected] = useState<string[]>([])

	useEffect(() => {
		setSelected(value)
	}, [value])

	const togglePermission = (key: string) => {
		let updated: string[]
		if (selected.includes(key)) {
			updated = selected.filter((k) => k !== key)
		} else {
			updated = [...selected, key]
		}

		setSelected(updated)
		onChange?.(updated)
	}

	return (
		<div className='space-y-6'>
			{data.map((group) => (
				<div key={group.name}>
					<div className='border-y border-border px-4 py-2 bg-surface'>
						<p className='text-ink-primary font-medium'>{group.name}</p>
					</div>
					<div className='px-4 pt-2 space-y-4'>
						{group.permissions.map((permission) => (
							<div key={permission.key} className='flex gap-4 items-center'>
								<ToggleSwitch
									value={selected.includes(permission.key)}
									onCheck={() => togglePermission(permission.key)}
								/>
								<div>
									<p className='text-ink-primary'>{permission.name}</p>
									<p className='text-sm text-ink-primary/50'>
										{permission.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
