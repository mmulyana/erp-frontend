import { Button } from '@/shared/components/ui/button'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs'
import { Filter } from 'lucide-react'

export default function ProjectTabs({ id }: { id?: string }) {
	return (
		<Tabs defaultValue='tab-1'>
			<TabsList className='border-b w-full'>
				<TabsTrigger
					value='tab-1'
					className='bg-muted data-[state=active]:text-ink-primary px-4 rounded-none data-[state=active]:bg-transparent relative group'
				>
					<p>Laporan</p>
					<div className='hidden group-data-[state=active]:block w-full h-[3px] bg-brand absolute bottom-0'></div>
				</TabsTrigger>
				<TabsTrigger
					value='tab-2'
					className='bg-muted data-[state=active]:text-ink-primary px-4 rounded-none data-[state=active]:bg-transparent relative group'
				>
					<p>Pemakaian</p>
					<div className='hidden group-data-[state=active]:block w-full h-[3px] bg-brand absolute bottom-0'></div>
				</TabsTrigger>
				<TabsTrigger
					value='tab-3'
					className='bg-muted data-[state=active]:text-ink-primary px-4 rounded-none data-[state=active]:bg-transparent relative group'
				>
					<p>Pemakaian</p>
					<div className='hidden group-data-[state=active]:block w-full h-[3px] bg-brand absolute bottom-0'></div>
				</TabsTrigger>
			</TabsList>
			<TabsContent value='tab-1'>
				<div className='pt-6'>
					<div className='flex justify-between items-start md:items-center'>
						<div className='flex gap-2 items-center'>
							<p className='text-ink-secondary font-medium'>Laporan</p>
							<div className='bg-[#e3e3e3] rounded-md px-2 py-0.5'>
								<p className='text-xs text-brand font-medium'>10</p>
							</div>
						</div>

						<div className='flex gap-2 items-center flex-wrap justify-end md:justify-between'>
							<Button variant='outline' className='gap-1 bg-transparent'>
								<Filter size={14} className='text-ink-light' />
								<span className='px-0.5 text-ink-secondary'>Filter</span>
							</Button>
							<Button className='gap-1'>
								<span className='px-0.5'>Buat Laporan</span>
							</Button>
						</div>
					</div>
					<ScrollArea className='max-h-[400px]'></ScrollArea>
				</div>
			</TabsContent>
			<TabsContent value='tab-2'>
				<div className='p-6'></div>
			</TabsContent>
		</Tabs>
	)
}
