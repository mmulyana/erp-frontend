import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from '@/shared/components/ui/dialog'
import { atom, useAtom } from 'jotai'
import { useCertificate } from '../../api/use-certificate'
import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import { format } from 'date-fns'
import { convertUTCToWIB } from '@/shared/utils'
import { id as ind } from 'date-fns/locale'
import { Button, buttonVariants } from '@/shared/components/ui/button'
import { Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { baseUrl } from '@/shared/constants/urls'
import ModalEditCertificate from './modal-edit-certificate'
import ModalDeleteCertificate from './modal-delete-certificate'
import { useState } from 'react'

export default function ModalDetailCertificate({
	id,
	open,
	setOpen,
}: {
	id?: string
	open: boolean
	setOpen: (val: boolean) => void
}) {
	const { data, isPending } = useCertificate(open ? id : '')

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='p-6'>
				<DialogTitle className='text-center'>Sertifikasi</DialogTitle>
				<DialogDescription className='text-center'>
					Lihat detail informasi sertifikasi karyawan
				</DialogDescription>
				<div className='flex flex-col gap-6'>
					<div>
						<p className='text-ink-light'>Nama</p>
						<LoaderWrapper isLoading={isPending}>
							<div className='flex gap-2 items-center'>
								<p className='text-ink-secondary font-medium'>{data?.name}</p>
								<Link
									className={buttonVariants({
										variant: 'outline',
										className: 'gap-1',
									})}
									to={`${baseUrl}/${data?.fileUrl}`}
									target='_blank'
								>
									<Eye size={20} className='text-ink-light' />
									<span className='px-0.5'>Lihat</span>
								</Link>
							</div>
						</LoaderWrapper>
					</div>
					<div className='flex justify-between items-center'>
						<p className='text-ink-light'>Organisasi Penerbit</p>
						<LoaderWrapper isLoading={isPending}>
							<p className='text-ink-secondary font-medium'>
								{data?.publisher ?? '-'}
							</p>
						</LoaderWrapper>
					</div>
					<div className='flex justify-between items-center'>
						<p className='text-ink-light'>Tanggal terbit</p>
						<LoaderWrapper isLoading={isPending}>
							{data?.issueDate && (
								<p className='text-ink-secondary font-medium'>
									{format(convertUTCToWIB(new Date(data.issueDate)), 'PPP', {
										locale: ind,
									})}
								</p>
							)}
						</LoaderWrapper>
					</div>
					<div className='flex justify-between items-center'>
						<p className='text-ink-light'>Tanggal kadaluwarsa</p>
						<LoaderWrapper isLoading={isPending}>
							{data?.expiryDate && (
								<p className='text-ink-secondary font-medium'>
									{format(convertUTCToWIB(new Date(data.expiryDate)), 'PPP', {
										locale: ind,
									})}
								</p>
							)}
						</LoaderWrapper>
					</div>
				</div>
				<DialogFooter className=''>
					<div className='flex justify-between items-center pt-6 w-full'>
						<ModalDeleteCertificate id={id} />
						<ModalEditCertificate />
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
