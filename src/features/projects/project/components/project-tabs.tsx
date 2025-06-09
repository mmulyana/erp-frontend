import { useQueryState } from 'nuqs'

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs'

import ProjectStockOut from './project-stock-out'
import ProjectReport from './project-report'
import ProjectLoan from './project-loan'

export default function ProjectTabs({ id }: { id?: string }) {
	const [query, setQuery] = useQueryState('tab')

	return (
		<Tabs defaultValue={query || 'Laporan'}>
			<TabsList className='border-b w-full'>
				{['Laporan', 'Pemakaian', 'Peminjaman'].map((i) => (
					<TabsTrigger
						key={i}
						value={i}
						onClick={() => setQuery(i)}
						className='pt-0 !bg-transparent pb-3 data-[state=active]:text-ink-primary px-4 rounded-none data-[state=active]:bg-transparent relative group'
					>
						<p className='text-base'>{i}</p>
						<div className='hidden group-data-[state=active]:block w-full h-[3px] bg-brand absolute bottom-0'></div>
					</TabsTrigger>
				))}
			</TabsList>
			<TabsContent value='Laporan'>
				<ProjectReport projectId={id} variant='detail' limit={10} />
			</TabsContent>
			<TabsContent value='Pemakaian'>
				<ProjectStockOut id={id} />
			</TabsContent>
			<TabsContent value='Peminjaman'>
				<ProjectLoan id={id} />
			</TabsContent>
		</Tabs>
	)
}
