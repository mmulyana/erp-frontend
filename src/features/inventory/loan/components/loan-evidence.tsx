import { DownloadIcon, Image } from 'lucide-react'
import { Link } from 'react-router-dom'

import EmptyState from '@/shared/components/common/empty-state'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'
import { baseUrl } from '@/shared/constants/urls'

import { useLoan } from '../api/use-loan'

export default function LoanEvidence({ id }: { id?: string }) {
	const { data } = useLoan({ id })

	const photoUrlIn = data?.data?.photoUrlIn

	return (
		<CardV1
			title='Foto'
			icon={<Image size={20} className='text-ink-primary' />}
			style={{ content: 'space-y-6 pt-4' }}
		>
			<div>
				<p className='text-ink-primary mb-2 font-medium'>Bukti barang keluar</p>
				<div className='space-y-4'>
					{photoUrlIn ? (
						<div className='flex justify-between items-center'>
							<div className='flex gap-2 items-center'>
								<PhotoUrl
									url={photoUrlIn}
									style={{ img: 'h-16 w-16 rounded-md' }}
								/>
								<p>{photoUrlIn}</p>
							</div>
							<Link
								to={`${baseUrl}/${photoUrlIn}`}
								download
								target='_blank'
								className='flex gap-2 items-center'
							>
								<span className='px-0.5'>Unduh</span>
								<DownloadIcon />
							</Link>
						</div>
					) : (
						<EmptyState />
					)}
				</div>
			</div>
		</CardV1>
	)
}
