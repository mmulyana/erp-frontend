import { FileText, FileBadgeIcon } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { useParams } from 'react-router-dom'
import { useSetAtom } from 'jotai'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import SearchV3 from '@/shared/components/common/search-v3'

import { useCertificates } from '../../api/use-certificates'
import ModalAddCertificate from './modal-add-certificate'
import ModalDetailCertificate, {
	atomModalCertificate,
} from './modal-detail-certificate'

export default function EmployeeCertificate() {
	const { limit, page, q } = usePagination()
	const { id } = useParams()

	const setModal = useSetAtom(atomModalCertificate)

	const { data, isLoading } = useCertificates({
		id,
		limit,
		page,
		search: q,
	})

	const columns: ColumnDef<any>[] = [
		{
			id: 'name',
			header: 'Nama',
			cell: ({ row }) => (
				<div className='flex justify-between items-center'>
					<div className='flex gap-4 items-center'>
						<FileText size={24} className='text-ink-light' />
						<p className='text-ink-secondary'>{row.original.name}</p>
					</div>
				</div>
			),
		},
	]
	return (
		<div className='px-6 space-y-6 pt-6'>
			<div className='flex gap-2 items-center'>
				<FileBadgeIcon className='text-ink-secondary' />
				<p className='text-ink-secondary font-medium'>Sertifikasi</p>
			</div>
			<div className='flex justify-between items-center gap-4'>
				<SearchV3 />
				<ModalAddCertificate />
			</div>
			<DataTable
				data={data?.data.data || []}
				columns={columns}
				totalPages={data?.data.total_pages}
				totalItems={data?.data.total}
				withPagination
				nonClickableColumns={[]}
				isLoading={isLoading}
				autoRedirect
				onCellClick={(e) => {
					setModal({
						id: e.id,
						open: true,
					})
				}}
			/>
			<ModalDetailCertificate />
		</div>
	)
}
