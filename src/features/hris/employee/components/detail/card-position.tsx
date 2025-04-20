import { differenceInMonths, differenceInYears } from 'date-fns'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'

import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'
import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import { formatToRupiah } from '@/shared/utils/formatCurrency'
import CardData from '@/shared/components/common/card-data'

import { useEmployee } from '../../api/use-employee'
import ModalEditPosition from './modal-edit-position'

export default function CardPosition() {
	const { id } = useParams()
	const { data, isPending } = useEmployee(id)

	const yoe = useMemo(() => {
		if (!data?.joinedAt) return { years: 0, months: 1 }

		const now = new Date()
		const joinedAt = new Date(data.joinedAt)

		const years = differenceInYears(now, joinedAt)
		const totalMonths = differenceInMonths(now, joinedAt)
		const months = totalMonths - years * 12

		return { years, months }
	}, [data])

	return (
		<Card className='p-6'>
			<div className='flex justify-between items-center'>
				<CardTitle className='text-base text-ink-primary'>Jabatan</CardTitle>
				<ModalEditPosition />
			</div>
			<CardContent className='mt-4 p-0 grid grid-cols-1 md:grid-cols-[1fr_342px] gap-6 md:gap-0'>
				<div className='flex flex-col items-start justify-center'>
					<LoaderWrapper isLoading={isPending}>
						<p className='text-2xl text-ink-secondary'>Staff</p>
					</LoaderWrapper>

					<LoaderWrapper isLoading={isPending}>
						{yoe.years || yoe.months ? (
							<p className='text-ink-light text-base'>
								Bergabung sejak{' '}
								{!!yoe.years && (
									<span className='text-ink-secondary font-medium'>
										{yoe.years} tahun
									</span>
								)}{' '}
								{!!yoe.months && (
									<span className='text-ink-secondary font-medium'>
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
							title='Gaji pokok (per hari)'
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
			</CardContent>
		</Card>
	)
}
