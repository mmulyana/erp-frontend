import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import { Card } from '@/shared/components/ui/card'
import { useSupplier } from '../api/use-supplier'

export default function SupplierDetail({ id }: { id?: string }) {
	const { data, isPending } = useSupplier({ id })

	return (
		<Card className='p-6 flex flex-col gap-4'>
			<p className='text-ink-primary font-medium'>Detail</p>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>No. Telp</p>
				<LoaderWrapper isLoading={isPending}>
					<p className='text-ink-secondary'>{data?.data?.phone}</p>
				</LoaderWrapper>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Email</p>
				<LoaderWrapper isLoading={isPending}>
					<p className='text-ink-secondary'>{data?.data?.email}</p>
				</LoaderWrapper>
			</div>
		</Card>
	)
}
