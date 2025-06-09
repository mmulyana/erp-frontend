import { UseFormReturn } from 'react-hook-form'
import { X, Search } from 'lucide-react'
import { useState } from 'react'

import { useEmployees } from '@/features/hris/employee/api/use-employees'

import PhotoUrl from '@/shared/components/common/photo-url'
import { Input } from '@/shared/components/ui/input'
import { ProjectForm } from '../../types'

type Employee = {
	id: string
	fullname: string
	photoUrl: string | null
	position?: string
}

export default function AssignedEmployeeProject({
	form,
}: {
	form: UseFormReturn<ProjectForm>
}) {
	const [selected, setSelected] = useState<Employee[]>([])
	const [searchQuery, setSearchQuery] = useState('')

	const { data } = useEmployees({
		search: searchQuery,
		limit: '20',
	})

	const toggleEmployee = (emp: Employee) => {
		setSelected((prev) =>
			prev.some((e) => e.id === emp.id)
				? prev.filter((e) => e.id !== emp.id)
				: [...prev, emp]
		)
		handleForm()
	}

	const removeEmployee = (id: string) => {
		setSelected((prev) => prev.filter((e) => e.id !== id))
		handleForm()
	}

	const handleForm = () => {
		const ids = selected.map((i) => i.id)
		form.setValue('employeeIds', ids)
	}

	const clearAll = () => {
		setSelected([])
		handleForm()
	}

	const clearSearch = () => setSearchQuery('')

	const filteredResults =
		data?.data?.data.filter((emp) => !selected.some((s) => s.id === emp.id)) ||
		[]

	return (
		<div className='w-full mx-auto space-y-6'>
			<div className='space-y-2'>
				<h2 className='text-xl font-medium text-ink-primary'>Pegawai</h2>
				<p className='text-ink-primary/50'>
					Silahkan pilih pegawai yang ditugaskan di proyek ini
				</p>
			</div>

			<div className='space-y-3'>
				<div className='relative'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
					<Input
						type='text'
						placeholder='Cari'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='w-full pl-10 pr-10 py-2 border border-border rounded-full bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
					/>
					{searchQuery && (
						<button
							onClick={clearSearch}
							className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
						>
							<X className='h-4 w-4' />
						</button>
					)}
				</div>
			</div>

			<div className='flex flex-wrap gap-2'>
				{filteredResults.map((emp) => (
					<button
						key={emp.id}
						type='button'
						onClick={() =>
							toggleEmployee({
								id: emp.id,
								fullname: emp.fullname,
								photoUrl: emp.photoUrl,
								position: emp.position,
							})
						}
						className='flex items-center pl-1 pr-4 py-1 rounded-full text-sm transition-all duration-200 ease-in-out border cursor-pointer hover:scale-105 active:scale-95 bg-background text-foreground border-border gap-2'
					>
						<PhotoUrl url={emp.photoUrl || ''} style={{ img: 'h-10 w-10' }} />
						<div className='text-left'>
							<p className='text-sm text-ink-primary font-medium'>
								{emp.fullname}
							</p>
							<p className='text-sm text-ink-primary/50 font-normal'>
								{emp.position}
							</p>
						</div>
					</button>
				))}
			</div>

			{selected.length > 0 && filteredResults.length > 0 && (
				<hr className='w-full h-1' />
			)}
			{selected.length > 0 && (
				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						<h3 className='text-sm font-medium'>
							Jumlah pegawai ({selected.length}):
						</h3>
						<button
							onClick={clearAll}
							className='text-sm text-error font-medium'
						>
							Hapus
						</button>
					</div>
					<div className='flex flex-wrap gap-2'>
						{selected.map((emp) => (
							<div
								key={emp.id}
								className='flex items-center pl-1 pr-2 py-1 rounded-full text-sm transition-all duration-200 ease-in-out border cursor-pointer hover:scale-105 active:scale-95 bg-background text-foreground border-border gap-2'
							>
								<PhotoUrl
									url={emp.photoUrl || ''}
									style={{ img: 'h-10 w-10' }}
								/>
								<div className='text-left'>
									<p className='text-sm text-ink-primary font-medium'>
										{emp.fullname}
									</p>
									<p className='text-sm text-ink-primary/50 font-normal'>
										{emp.position}
									</p>
								</div>
								<button
									onClick={() => removeEmployee(emp.id)}
									className='ml-2 rounded-full p-0.5 transition-colors'
								>
									<X size={20} />
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
