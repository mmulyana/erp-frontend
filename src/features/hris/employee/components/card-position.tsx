import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'

export default function CardPosition() {
	return (
		<Card className='p-6'>
			<CardTitle className='text-base text-ink-primary'>Jabatan</CardTitle>
			<CardContent className='mt-4 p-0 grid grid-cols-1 md:grid-cols-[1fr_342px] gap-6 md:gap-0'>
				<div>
					<p className='text-2xl text-ink-secondary'>Staff</p>
					<p className='text-ink-light text-base'>
						Bergabung sejak{' '}
						<span className='text-ink-secondary font-medium'>8 tahun</span> lalu
					</p>
				</div>
				<div className='gap-6 flex justify-between'>
					<div className='border-l border-border flex flex-col pl-2 justify-center'>
						<p className='text-ink-light text-sm'>
							Gaji pokok <span className='text-ink-primary'>(per hari)</span>
						</p>
						<p className='text-ink-secondary font-medium'>Rp 120,000</p>
					</div>
					<div className='border-l border-border flex flex-col pl-2 justify-center'>
						<p className='text-ink-light text-sm'>
							Gaji lemburan <span className='text-ink-primary'>(per jam)</span>
						</p>
						<p className='text-ink-secondary font-medium'>Rp 20,000</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
