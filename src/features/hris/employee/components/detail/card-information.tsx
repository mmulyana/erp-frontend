import { differenceInYears, format } from 'date-fns'
import { SquareUserRound } from 'lucide-react'
import { id } from 'date-fns/locale'
import { useMemo } from 'react'

import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'

import { useDetailEmployee } from '../../hooks/use-detail-employee'
import ModalEditInformation from './modal-edit-information'

export default function CardInformation() {
	const { data, isPending } = useDetailEmployee()

	const age = useMemo(() => {
		if (!data || !data.birthDate) return '-'
		return differenceInYears(new Date(), new Date(data?.birthDate))
	}, [data])

	return (
		<CardV1
			title='Informasi'
			icon={<SquareUserRound size={20} className='text-ink-primary' />}
			action={<ModalEditInformation />}
			style={{ content: 'pt-4' }}
		>
			<div className='space-y-6'>
				<PhotoUrl
					url={data?.photoUrl || ''}
					style={{
						img: 'w-20 h-20 border border-dashed border-line bg-gray-50',
						icon: 'w-6 h-6',
					}}
				/>

				<div className='flex justify-between items-center'>
					<p className='text-ink-primary/50'>Nama lengkap</p>
					<LoaderWrapper isLoading={isPending}>
						<p className='text-ink-primary'>{data?.fullname}</p>
					</LoaderWrapper>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-ink-primary/50'>Pendidikan terakhir</p>
					<LoaderWrapper isLoading={isPending}>
						<p className='text-ink-primary uppercase'>{data?.lastEducation}</p>
					</LoaderWrapper>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-ink-primary/50'>Tggl lahir</p>
					<LoaderWrapper isLoading={isPending}>
						{data?.birthDate && (
							<div className='flex gap-2 items-center'>
								<p className='text-ink-primary'>
									{format(data?.birthDate, 'PPP', { locale: id })}
								</p>
								<p className='text-ink-light'>({age} tahun)</p>
							</div>
						)}
					</LoaderWrapper>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-ink-primary/50'>Tggl bergabung</p>
					<LoaderWrapper isLoading={isPending}>
						{data?.joinedAt && (
							<p className='text-ink-primary'>
								{format(data?.joinedAt, 'PPP', { locale: id })}
							</p>
						)}
					</LoaderWrapper>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-ink-primary/50'>Tggl safety induction</p>
					<LoaderWrapper isLoading={isPending}>
						{data?.safetyInductionDate && (
							<p className='text-ink-primary'>
								{format(data?.safetyInductionDate, 'PPP', { locale: id })}
							</p>
						)}
					</LoaderWrapper>
				</div>
			</div>
		</CardV1>
	)
}
