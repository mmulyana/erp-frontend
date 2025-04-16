import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'

export default function CardInformation() {
	return (
		<Card className='p-6'>
			<CardTitle className='text-ink-secondary text-base'>
				Informasi Pegawai
			</CardTitle>
			<CardContent className='p-0 space-y-4 pt-4'>
				<div className='w-[88px] h-[88px] rounded-full bg-gray-300'></div>
				<div className='flex justify-between items-center'>
					<p className='text-ink-secondary'>Nama lengkap</p>
					<p className='text-ink-primary'>Muhamad Mulyana</p>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-ink-secondary'>Usia</p>
					<p className='text-ink-primary'>20 tahun</p>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-ink-secondary'>Pendidikan terakhir</p>
					<p className='text-ink-primary'>SMA</p>
				</div>
			</CardContent>
		</Card>
	)
}
