import { Title, useTitle } from '@/routes/dashboard/_component/header'
import { DashboardLayout } from '@/routes/dashboard/_component/layout'
import DetailEmployee from './_component/detail/detail-employee'
import DeleteEmployee from './_component/detail/delete-employee'
import TableEmployee from './_component/detail/table-employee'
import AddEmployee from './_component/detail/add-employee'
import { useDetailName } from '@/hooks/use-detail-name'
import { PATH } from '@/utils/constant/_paths'
import { useParams } from 'react-router-dom'
import { links } from './_component/links'
import { useEffect, useState } from 'react'
import ExpireCertif from './_component/detail/expire-certif'
import ExpireSafety from './_component/detail/expire-safety'
import Tour from '@/components/common/tour'
import { generateStep } from './_component/tour-detail'

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
  const [start, setStart] = useState(true)

  useEffect(() => {
    return () => setStart(false)
  }, [start])

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

      <Tour start={start} steps={generateStep(link?.name || '')}  />
    </DashboardLayout>
  )
}
