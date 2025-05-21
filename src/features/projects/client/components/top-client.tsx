import CardV1 from '@/shared/components/common/card-v1'
import { User } from 'lucide-react'
import { useClientRank } from '../api/use-client-rank'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Badge } from '@/shared/components/ui/badge'
import BaseSelect from '@/shared/components/common/select/base-select'
import { selectOption } from '@/shared/types'
import { parseAsString, useQueryStates } from 'nuqs'

const sortOptions: selectOption[] = [
	{
		label: 'Terbanyak',
		value: 'desc',
	},
	{
		label: 'Paling sedikit',
		value: 'asc',
	},
]
export default function TopClient() {
	const [query] = useQueryStates({
		sortProject: parseAsString.withDefault('desc'),
	})
	const { data } = useClientRank({ limit: '10', sortOrder: query.sortProject })
	return (
		<CardV1
			title='Klien'
			icon={<User size={20} className='text-ink-primary' />}
			action={
				<BaseSelect
					options={sortOptions}
					urlName='sortProject'
					style={{ trigger: 'w-fit gap-2 rounded-xl' }}
				/>
			}
		>
			<ScrollArea className='h-[200px]'>
				<div className='space-y-4 pt-4'>
					{data?.data?.map((i) => (
						<div className='flex justify-between items-center' key={i.id}>
							<div>
								<p className='text-ink-primary font-medium'>{i.name}</p>
								{i?.company && (
									<p className='text-ink-primary/50 text-sm'>
										{i.company.name}
									</p>
								)}
							</div>
							<Badge variant='outline'>{i._count?.project} Proyek</Badge>
						</div>
					))}
				</div>
			</ScrollArea>
		</CardV1>
	)
}
