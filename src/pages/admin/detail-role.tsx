import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Key } from 'lucide-react'

import PermissionList from '@/features/permission/components/permission-list'
import ModalDetailRole from '@/features/role/components/modal-detail-role'
import { useUpdatePermissionRole } from '@/features/role/api/use-update-permission-role'
import { usePermissions } from '@/features/permission/api/use-permissions'
import { useRole } from '@/features/role/api/use-role'

import ProtectedComponent from '@/shared/components/common/protected'
import DetailLayout from '@/shared/layout/detail-layout'
import CardV1 from '@/shared/components/common/card-v1'
import { useHasPermission } from '@/shared/hooks/use-has-permission'
import { permissions } from '@/shared/constants/permissions'
import { useDynamicLinks } from '@/shared/utils/link'
import { paths } from '@/shared/constants/paths'
import { Link } from '@/shared/types'

const links: Link[] = [
	{
		icon: <Key size={20} />,
		name: 'Role',
		path: paths.adminRole,
		hideName: true,
	},
	{
		name: 'Detail',
		path: paths.adminRoleDetail,
	},
]
export default function DetailRole() {
	const { id } = useParams()

	const { data } = useRole({ id })
	const { data: dataPermissions } = usePermissions()

	const { mutate } = useUpdatePermissionRole()

	const [rolePermissions, setRolePermissions] = useState<string[]>(
		dataPermissions?.data ?? []
	)

	const canChangePermission = useHasPermission([
		permissions.role_permission_update,
	])

	useEffect(() => {
		setRolePermissions(data?.data?.permissions ?? [])
	}, [data])

	const dynamicLink = useDynamicLinks({
		baseLinks: links,
		replaceName: 'Detail',
		newLink: data?.data
			? {
					name: data.data.name ?? '',
					path: `${paths.adminRole}/${data.data.id}`,
			  }
			: undefined,
		condition: !!(id && data?.data),
	})

	return (
		<DetailLayout
			links={dynamicLink}
			style={{
				header: 'w-[940px]',
			}}
		>
			<div className='w-[940px] mx-auto pt-6 max-w-full px-4 md:px-0 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 items-start pb-10'>
				<CardV1
					title='Role'
					icon={<Key size={20} className='text-ink-primary' />}
					style={{
						content: 'space-y-4 pt-4',
					}}
					action={
						<ProtectedComponent required={[permissions.role_update]}>
							<ModalDetailRole />
						</ProtectedComponent>
					}
				>
					<div className='flex justify-between items-center'>
						<p className='text-ink-primary/50'>Nama</p>
						<p className='text-ink-primary'>{data?.data?.name}</p>
					</div>
					<div className='flex justify-between items-center'>
						<p className='text-ink-primary/50'>Deskripsi</p>
						<p className='text-ink-primary max-w-[200px] text-right'>
							{data?.data?.description}
						</p>
					</div>
				</CardV1>
				<CardV1
					title='Hak Akses'
					icon={<Key size={20} className='text-ink-primary' />}
					style={{ content: 'pt-4 px-0' }}
				>
					<PermissionList
						data={dataPermissions?.data || []}
						value={rolePermissions}
						onChange={(val) => {
							if (id) mutate({ id, permissions: val.join(',') })
							setRolePermissions(val)
						}}
						disabled={!canChangePermission}
					/>
				</CardV1>
			</div>
		</DetailLayout>
	)
}
