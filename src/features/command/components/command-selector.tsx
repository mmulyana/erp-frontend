import { cn } from '@/shared/utils/cn'

const chipOptions = [
	{ id: 'employee', label: 'Pegawai' },
	{ id: 'payrollPeriod', label: 'Periode Gaji' },
	{ id: 'project', label: 'Proyek' },
	{ id: 'client', label: 'Klien' },
	{ id: 'companyClient', label: 'Perusahaan klien' },
	{ id: 'inventory', label: 'Barang' },
	{ id: 'supplier', label: 'Supplier' },
	{ id: 'warehouse', label: 'Gudang' },
	{ id: 'projectAttachment', label: 'Lampiran proyek' },
]

interface Props {
	selectedChips: string[]
	setSelectedChips: (chips: string[]) => void
}

export default function CommandSelector({
	selectedChips,
	setSelectedChips,
}: Props) {
	const toggleChip = (chipId: string) => {
		setSelectedChips(
			selectedChips.includes(chipId)
				? selectedChips.filter((id) => id !== chipId)
				: [...selectedChips, chipId]
		)
	}

	return (
		<div className='flex flex-wrap gap-2 p-4'>
			{chipOptions.map((option) => {
				const isSelected = selectedChips.includes(option.id)
				return (
					<button
						key={option.id}
						onClick={() => toggleChip(option.id)}
						className={cn(
							'inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium transition-all duration-200 ease-in-out border cursor-pointer',
							isSelected
								? 'bg-brand text-white border-brand'
								: 'bg-background text-foreground border-border hover:border-primary/50 hover:bg-accent'
						)}
					>
						{option.label}
					</button>
				)
			})}
		</div>
	)
}
