import { useParams } from 'react-router-dom'
import { useState } from 'react'

import { DashboardLayout } from '@/shared/component/layout'

import Tour from '@/components/common/tour'

import { useDetailName } from '@/shared/hooks/use-detail-name'
import { PATH } from '@/utils/constant/_paths'

import DetailEmployee from '@/features/hris/employee/component/detail-employee'
import DeleteEmployee from '@/features/hris/employee/component/delete-employee'
import TableEmployee from '@/features/hris/employee/component/table-employee'
import ExpireCertif from '@/features/hris/employee/component/expire-certif'
import ExpireSafety from '@/features/hris/employee/component/expire-safety'
import AddEmployee from '@/features/hris/employee/component/add-employee'
import { tourDetail } from '@/features/hris/employee/component/tour-detail'
import { links } from '@/features/hris/employee/component/links'
import { useTitle } from '@/shared/store/title'
import { Title } from '@/shared/types'

export type DialogEmployee = {
	add: boolean
	delete: boolean
	detail: boolean
}
export default function Detail() {
	const { detail } = useParams()
	const { link } = useDetailName(PATH.EMPLOYEE_DETAIL, detail)
	useTitle([...links, link as Title])

	const positionId = detail?.split('-').pop()

	// HANDLE DRAWER
	const [dialog, setDialog] = useState<DialogEmployee>({
		add: false,
		delete: false,
		detail: false,
	})
	const [selectedId, setSelectedId] = useState<null | number>(null)
	const handleDialog = (type: keyof DialogEmployee, val?: boolean) => {
		setDialog((prev) => ({ ...prev, [type]: val || false }))
		if (!val && selectedId !== null) {
			setSelectedId(null)
		}
	}
	// HANDLE TOUR

	return (
		<DashboardLayout>
			<div className='grid grid-cols-1 md:grid-cols-[1fr_340px]'>
				<div className='overflow-hidden'>
					<TableEmployee
						positionId={positionId}
						name={link?.name}
						onSelect={setSelectedId}
						onAddEmployee={() => handleDialog('add', true)}
						onDetailEmployee={(val) => handleDialog('detail', val)}
						onDeleteEmployee={(val) => handleDialog('delete', val)}
					/>
				</div>
				<div className='h-[calc(100vh-48px)] border-l border-line px-4 py-2 space-y-4'>
					<ExpireCertif positionId={positionId} />
					<ExpireSafety positionId={positionId} />
				</div>
			</div>
			<AddEmployee
				open={dialog.add}
				setOpen={() => handleDialog('add')}
				id={positionId}
			/>
			<DetailEmployee
				open={dialog.detail}
				setOpen={() => handleDialog('detail')}
				id={selectedId}
			/>
			<DeleteEmployee
				open={dialog.delete}
				setOpen={() => handleDialog('delete')}
				id={selectedId}
			/>

			<Tour steps={tourDetail(link?.name || '')} name='employee' />
		</DashboardLayout>
	)
}
