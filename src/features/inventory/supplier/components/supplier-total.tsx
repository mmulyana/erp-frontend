import { Card } from '@/shared/components/ui/card'
import { useSupplier } from '../api/use-supplier'
import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'

export default function SupplierTotal({ id }: { id?: string }) {
	const { data, isPending } = useSupplier({ id })
	return (
		<Card className='p-6'>
			<p className='text-ink-light'>Total Transaksi</p>
			<LoaderWrapper isLoading={isPending}>
				<p className='text-ink-primary text-2xl font-medium'>
					{data?.data?._count?.stockIn}
				</p>
			</LoaderWrapper>
		</Card>
	)
}
