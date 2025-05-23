import { Button } from '@/shared/components/ui/button'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs'
import { Filter } from 'lucide-react'
import ItemTransactionDetail from './item-transaction-detail'

type props = {
	id?: string
}
export default function ItemTabs({ id }: props) {
	return (
		<Tabs defaultValue='Stok masuk'>
			<TabsList className='border-b w-full'>
				{['Stok masuk', 'Stok keluar', 'Peminjaman'].map((i) => (
					<TabsTrigger
						value={i}
						key={i}
						className='!bg-transparent pt-0 pb-3 data-[state=active]:text-ink-primary px-4 rounded-none data-[state=active]:bg-transparent relative group'
					>
						<p className='text-base'>{i}</p>
						<div className='hidden group-data-[state=active]:block w-full h-[3px] bg-brand absolute bottom-0'></div>
					</TabsTrigger>
				))}
			</TabsList>
			<TabsContent value='Stok masuk'>
				<div className='pt-6'>
					<div className='flex justify-between items-start md:items-center'>
						<div className='flex gap-2 items-center'>
							<p className='text-ink-secondary font-medium'>Stok Masuk</p>
							<div className='bg-[#e3e3e3] rounded-md px-2 py-0.5'>
								<p className='text-xs text-brand font-medium'>10</p>
							</div>
						</div>

						<div className='flex gap-2 items-center flex-wrap justify-end md:justify-between'>
							<Button variant='outline' className='gap-1 bg-transparent'>
								<Filter size={14} className='text-ink-light' />
								<span className='px-0.5 text-ink-secondary'>Filter</span>
							</Button>
						</div>
					</div>
					<ScrollArea className='max-h-[400px]'>
						{[
							{
								user: {
									photoUrl: '',
									username: 'Muhamad Mulyana',
								},
								qty: 12,
							},
						].map((data, index) => (
							<ItemTransactionDetail key={index} {...data} />
						))}
					</ScrollArea>
				</div>
			</TabsContent>
			<TabsContent value='Stok keluar'>
				<div className='p-6'></div>
			</TabsContent>
		</Tabs>
	)
}
