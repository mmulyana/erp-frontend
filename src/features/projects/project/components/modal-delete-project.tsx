import { AlertConfirm } from '@/shared/components/common/alert-confirm'
import { useDeleteProject } from '../api/use-delete-project'
import { useNavigate } from 'react-router-dom'
import { paths } from '@/shared/constants/paths'

export default function ModalDeleteProject({
	id,
	onClose,
}: {
	id?: string
	onClose?: () => void
}) {
	const { mutate } = useDeleteProject()
	const navigate = useNavigate()

	return (
		<AlertConfirm
			triggerLabel='Hapus'
			triggerClassName='w-full px-4 justify-start rounded'
			title='Yakin ingin menghapus proyek ini?'
			description='Tindakan ini tidak dapat dibatalkan. Hubungi admin jika tidak sengaja terhapus.'
			variant='error'
			onConfirm={() => {
				if (id) {
					mutate(
						{ id },
						{
							onSuccess: () => {
								onClose?.()
								navigate(paths.projectMasterdataProjects)
							},
						}
					)
				}
			}}
		/>
	)
}
