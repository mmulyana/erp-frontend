import { AlertConfirm } from '@/shared/components/common/alert-confirm'
import { useDeleteAttachment } from '../api/attachment/use-delete-attachment'

export default function ModalDeleteAttachment({
	id,
	onClose,
}: {
	id?: string
	onClose?: () => void
}) {
	const { mutate } = useDeleteAttachment()

	return (
		<AlertConfirm
			triggerLabel='Hapus'
			triggerClassName='w-full px-4 justify-start rounded'
			title='Yakin ingin menghapus lampiran ini?'
			description='Tindakan ini tidak dapat dibatalkan. Hubungi admin jika tidak sengaja terhapus.'
			variant='error'
			onConfirm={() => {
				if (id) {
					mutate(
						{ id },
						{
							onSuccess: () => {
								onClose?.()
							},
						}
					)
				}
			}}
		/>
	)
}
