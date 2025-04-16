import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Plus } from 'lucide-react'

export default function ModalAddCashAdvance() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5'>Tambah Kasbon</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<p>T</p>
			</DialogContent>
		</Dialog>
	)
}
