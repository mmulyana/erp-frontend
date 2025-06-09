import { TooltipProps } from 'recharts'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

export function CustomTooltip({ active, payload, label }: TooltipProps<any, any>) {
	if (!active || !payload?.length) return null

	const date = parseISO(label)
	const formattedDate = format(date, 'EEEE dd/MM/yyyy', { locale: id })

	return (
		<div className='rounded-md border bg-white p-2 shadow-sm text-sm'>
			<div className='font-semibold mb-1'>{formattedDate}</div>
			{payload.map((entry, i) => (
				<div
					key={i}
					className='flex justify-between gap-2 text-muted-foreground'
				>
					<span>{entry.name}</span>
					<span>{entry.value}</span>
				</div>
			))}
		</div>
	)
}
