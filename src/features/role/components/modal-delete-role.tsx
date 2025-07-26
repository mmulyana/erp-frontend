import { useNavigate } from 'react-router-dom'

import { AlertConfirm } from '@/shared/components/common/alert-confirm'
import { paths } from '@/shared/constants/paths'

import { useDeleteRole } from '../api/use-delete-role'

export default function ModalDeleteRole({
	id,
	onClose,
}: {
	id?: string
	onClose?: () => void
}) {
	const navigate = useNavigate()
	const { mutate } = useDeleteRole()

	return (
		<AlertConfirm
			triggerLabel='Hapus Role'
			title='Yakin ingin menghapus role ini?'
			description='Tindakan ini tidak dapat dibatalkan. Hubungi admin jika tidak sengaja terhapus.'
			variant='error'
			onConfirm={() => {
				if (id) {
					mutate(
						{ id },
						{
							onSuccess: () => {
								onClose?.()
								navigate(paths.adminRole, {
									replace: true,
								})
							},
						}
					)
				}
			}}
		/>
	)
}
