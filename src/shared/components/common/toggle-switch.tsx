import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

type Props = {
	label?: {
		true: string
		false: string
	}
	value?: boolean
	onCheck?: (val: boolean) => void
	disabled?: boolean
}
export default function ToggleSwitch({
	label,
	value = false,
	onCheck,
	disabled,
}: Props) {
	return (
		<div className='flex items-center space-x-2'>
			<Switch
				checked={value}
				onCheckedChange={(val) => onCheck?.(val)}
				disabled={disabled}
				className='data-[state=checked]:bg-success data-[state=checked]:border-success'
			/>
			{label && (
				<Label className='text-ink-primary/70 text-sm font-normal'>
					{value ? label.true || 'Active' : label.false || 'Inactive'}
				</Label>
			)}
		</div>
	)
}
