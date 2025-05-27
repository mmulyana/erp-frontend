import { useQueryState } from 'nuqs'

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs'

import ItemTransaction from './item-transaction'

type props = {
	id?: string
}

const tabOptions = ['Stok masuk', 'Stok keluar', 'Peminjaman'] as const

export default function ItemTabs({ id }: props) {
	const [tab, setTab] = useQueryState('tab', {
		defaultValue: 'Stok masuk',
		history: 'replace',
	})

	return (
		<Tabs value={tab} onValueChange={(val) => setTab(val)}>
			<TabsList className='border-b w-full'>
				{tabOptions.map((i) => (
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
				<ItemTransaction id={id} variant='STOCK_IN' />
			</TabsContent>
			<TabsContent value='Stok keluar'>
				<ItemTransaction id={id} variant='STOCK_OUT' />
			</TabsContent>
			<TabsContent value='Peminjaman'>
				<ItemTransaction id={id} variant='LOAN' />
			</TabsContent>
		</Tabs>
	)
}
