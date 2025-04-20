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
		<>
			<div className='flex gap-2 items-center p-6'>
				<FileBadgeIcon className='text-ink-secondary' />
				<p className='text-ink-secondary font-medium'>Sertifikasi</p>
			</div>
			<div className='px-4 py-3 bg-surface flex justify-between items-center border-t border-border gap-4'>
				<SearchV3 />
				<ModalAddCertificate />
			</div>
			<DataTable
				style={{
					footer: 'bg-white',
					header: 'bg-white',
					stripRowColor: 'bg-white',
				}}
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
		</>
	)
}
