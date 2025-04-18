import { Check, X } from 'lucide-react'

import { Pagination } from '@/shared/components/common/data-table/component'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui/table'

export default function TableReport() {
	const days = [
		{ number: 1, day: 'Sen' },
		{ number: 2, day: 'Sel' },
		{ number: 3, day: 'Rab' },
		{ number: 4, day: 'Kam' },
		{ number: 5, day: 'Jum' },
		{ number: 6, day: 'Sab' },
		{ number: 7, day: 'Min' },
		{ number: 8, day: 'Sen' },
		{ number: 9, day: 'Sel' },
		{ number: 10, day: 'Rab' },
		{ number: 11, day: 'Kam' },
		{ number: 12, day: 'Jum' },
		{ number: 13, day: 'Sab' },
		{ number: 14, day: 'Min' },
	]

	const students = [
		{
			name: 'Saepudin',
			attendance: [
				true,
				false,
				true,
				true,
				true,
				true,
				false,
				true,
				false,
				true,
				true,
				true,
				true,
				false,
			],
			present: 10,
			absent: 2,
		},
		{
			name: 'Saepudin',
			attendance: [
				true,
				true,
				true,
				false,
				true,
				true,
				false,
				true,
				true,
				true,
				false,
				true,
				true,
				false,
			],
			present: 10,
			absent: 2,
		},
		{
			name: 'Saepudin',
			attendance: [
				true,
				true,
				true,
				false,
				true,
				true,
				false,
				true,
				true,
				true,
				false,
				true,
				true,
				false,
			],
			present: 10,
			absent: 2,
		},
		{
			name: 'Saepudin',
			attendance: [
				false,
				true,
				true,
				true,
				true,
				true,
				false,
				false,
				true,
				true,
				true,
				true,
				true,
				false,
			],
			present: 10,
			absent: 2,
		},
		{
			name: 'Saepudin',
			attendance: [
				false,
				true,
				true,
				true,
				true,
				false,
				false,
				false,
				true,
				true,
				true,
				true,
				false,
				false,
			],
			present: 8,
			absent: 4,
		},
		{
			name: 'Saepudin',
			attendance: [
				false,
				true,
				true,
				true,
				true,
				true,
				false,
				false,
				true,
				true,
				true,
				true,
				true,
				false,
			],
			present: 10,
			absent: 2,
		},
		{
			name: 'Saepudin',
			attendance: [
				true,
				true,
				false,
				false,
				false,
				true,
				false,
				true,
				true,
				false,
				false,
				false,
				true,
				false,
			],
			present: 6,
			absent: 6,
		},
	]

	return (
		<div className='rounded-md border overflow-hidden'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='border-r bg-white' rowSpan={2}></TableHead>
						{days.map((day, index) => (
							<TableHead
								key={index}
								className='text-center border-r font-medium bg-gray-50'
							>
								<p>{day.day}</p>
								<p>{day.number}</p>
							</TableHead>
						))}
						<TableHead className='text-center border-r bg-white' rowSpan={2}>
							<Check className='mx-auto h-5 w-5 text-success' />
						</TableHead>
						<TableHead className='text-center bg-white' rowSpan={2}>
							<X className='mx-auto h-5 w-5 text-error' />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{students.map((student, studentIndex) => (
						<TableRow
							key={studentIndex}
							className={studentIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
						>
							<TableCell className='font-medium border-r'>
								{student.name}
							</TableCell>
							{student.attendance.map((isPresent, dayIndex) => (
								<TableCell
									key={dayIndex}
									className='text-center p-0 border-r h-10'
								>
									{isPresent ? (
										<div className='flex items-center justify-center h-full'>
											<div className='bg-success rounded-full p-1 w-6 h-6 flex items-center justify-center'>
												<Check className='h-5 w-5 text-white' />
											</div>
										</div>
									) : (
										<div className='flex items-center justify-center h-full'>
											<div className='rounded-full p-1 w-6 h-6 flex items-center justify-center'>
												<X className='h-5 w-5 text-error' />
											</div>
										</div>
									)}
								</TableCell>
							))}
							<TableCell className='text-center font-medium border-r text-ink-secondary'>
								{student.present}
							</TableCell>
							<TableCell className='text-center font-medium text-ink-secondary'>
								{student.absent}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className='border-t border-border bg-surface'>
				<Pagination totalItems={10} totalPages={10} />
			</div>
		</div>
	)
}
