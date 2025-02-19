import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { useApiData } from '@/hooks/use-api-data'
import { useRoles } from '@/features/role/api/use-roles'
import { cn } from '@/utils/cn'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useAssignRole } from '../api/use-assign-role'

type Props = {
	id?: string
	roleId?: string | null
	permission?: string[]
}
export default function AddUserRole({ id, roleId, permission }: Props) {
	const [openPopover, setOpenPopover] = useState(false)

	const { mutate: assign } = useAssignRole()

	const { data } = useApiData(useRoles())

	const isAllowed = permission?.includes('user:change-role')

	return (
		<Popover modal={false} open={openPopover} onOpenChange={setOpenPopover}>
			<PopoverTrigger asChild>
				<Button
					variant={isAllowed ? 'outline' : 'ghost'}
					className={cn(
						'pr-2 pl-2.5 gap-2 min-w-[104px] justify-between',
						!roleId && !isAllowed && 'hidden',
						roleId && !isAllowed && 'px-0'
					)}
					disabled={!isAllowed}
				>
					{roleId
						? data?.data?.find((item) => item.id === roleId)?.name
						: 'Tambah role'}
					{isAllowed && <ChevronsUpDown size={16} />}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='p-0'
				style={{
					width: 'var(--radix-popover-trigger-width)',
				}}
			>
				<Command shouldFilter>
					<CommandInput placeholder='Cari peran' />
					<CommandList>
						<CommandEmpty>Peran tidak ditemukan</CommandEmpty>
						<CommandGroup>
							{data?.data
								?.filter((item) => item.name !== 'Superadmin')
								.map((item) => (
									<CommandItem
										key={item.id}
										value={String(item.name)}
										onSelect={() => {
											id && assign({ id, roleId: item.id })
											setOpenPopover(false)
										}}
										className='flex justify-between items-center gap-1'
									>
										<span>{item.name}</span>
										{item.id === roleId && (
											<div className='flex-shrink-0 h-5 w-5 rounded-full flex justify-center items-center bg-green-primary text-white'>
												<Check size={14} strokeWidth={2.9} />
											</div>
										)}
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
