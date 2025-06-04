import { differenceInMonths, differenceInYears } from 'date-fns'
import { BriefcaseBusiness } from 'lucide-react'
import { useMemo } from 'react'

import CardData from '@/shared/components/common/card-data'
import CardV1 from '@/shared/components/common/card-v1'
import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import { formatToRupiah } from '@/shared/utils'
import { PayType } from '@/shared/types/api'

import { useDetailEmployee } from '../../hooks/use-detail-employee'
import ModalEditPosition from './modal-edit-position'

export default function CardPosition() {
	const { data, isPending } = useDetailEmployee()

	const yoe = useMemo(() => {
		if (!data?.joinedAt) return { years: 0, months: 1 }

		const now = new Date()
		const joinedAt = new Date(data.joinedAt)

		const years = differenceInYears(now, joinedAt)
		const totalMonths = differenceInMonths(now, joinedAt)
		const months = totalMonths - years * 12

		return { years, months }
	}, [data])

	const isDaily = data?.payType === PayType.DAILY

	return (
		<>
			<CardV1
				title='Jabatan'
				style={{
					content:
						'pt-4 grid grid-cols-1 md:grid-cols-[1fr_342px] gap-6 md:gap-0',
				}}
				icon={<BriefcaseBusiness size={20} className='text-ink-primary' />}
				action={<ModalEditPosition />}
			>
				<div className='flex flex-col items-start justify-center'>
					<LoaderWrapper isLoading={isPending}>
						<p className='text-2xl text-ink-primary'>{data?.position}</p>
					</LoaderWrapper>

					<LoaderWrapper isLoading={isPending}>
						{yoe.years || yoe.months ? (
							<p className='text-ink-primary/50 text-sm'>
								Bergabung sejak{' '}
								{!!yoe.years && (
									<span className='text-ink-primary font-medium'>
										{yoe.years} tahun
									</span>
								)}{' '}
								{!!yoe.months && (
									<span className='text-ink-primary font-medium'>
										{yoe.months} bulan
									</span>
								)}
								{' lalu'}
							</p>
						) : null}
					</LoaderWrapper>
				</div>
				<div className='gap-6 flex justify-between'>
					<LoaderWrapper isLoading={isPending}>
						<CardData
							title={
								isDaily ? 'Gaji pokok (per hari)' : 'Gaji pokok (per bulan)'
							}
							value={
								data?.salary
									? data?.salary > 0
										? formatToRupiah(data.salary)
										: 0
									: 0
							}
						/>
					</LoaderWrapper>
					<LoaderWrapper isLoading={isPending}>
						<CardData
							title='Gaji lemburan (per jam)'
							value={
								data?.overtimeSalary
									? data?.overtimeSalary > 0
										? formatToRupiah(data.overtimeSalary)
										: 0
									: 0
							}
						/>
					</LoaderWrapper>
				</div>
			</CardV1>
		</>
	)
}
