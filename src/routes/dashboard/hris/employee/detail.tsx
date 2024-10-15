import { useParams } from 'react-router-dom'
import { PATH } from '@/utils/constant/_paths'
import { Title, useTitle } from '@/routes/dashboard/_component/header'
import { DashboardLayout } from '@/routes/dashboard/_component/layout'
import { useDetailName } from '@/hooks/use-detail-name'
import { Card, Cardbody, CardHead } from '@/components/common/card-v1'
import { ScrollArea } from '@/components/ui/scroll-area'
import TableEmployee from './_component/detail/table-employee'
import { links } from './_component/links'
import { useState } from 'react'
import AddEmployee from './_component/detail/add-employee'
import DetailEmployee from './_component/detail/detail-employee'

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

  return (
    <DashboardLayout>
      <div className='grid grid-cols-1 md:grid-cols-[1fr_340px]'>
        <div>
          <TableEmployee
            positionId={positionId}
            name={link?.name}
            onAddEmployee={() => handleDialog('add', true)}
            onSelect={setSelectedId}
            onDetailEmployee={(val) => handleDialog('detail', val)}
          />
        </div>
        <div className='h-[calc(100vh-48px)] border-l border-line px-4 py-2 space-y-4'>
          <Card>
            <CardHead className='px-3'>
              <p className='text-dark text-sm'>
                Tenggat Waktu Sertifikasi Pegawai
              </p>
            </CardHead>
            <Cardbody className='p-0'>
              <ScrollArea className='h-48 flex flex-col gap-4'>
                {[0, 1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className='px-3 py-3.5 grid grid-cols-[24px_1fr] gap-4 border-b border-line'
                  >
                    <div className='w-6 h-6 rounded-full bg-gray-400'></div>
                    <p className='text-sm text-dark/50'>
                      Sertifikat <span className='text-dark'>TKBT</span>{' '}
                      <span className='text-dark'>Muhamad Mulyana</span> akan
                      kedaluwarsa dalam{' '}
                      <span className='text-dark'>10 hari</span>
                    </p>
                  </div>
                ))}
              </ScrollArea>
            </Cardbody>
          </Card>
          <Card>
            <CardHead className='px-3'>
              <p className='text-dark text-sm'>Sertifikat Kadaluwarsa</p>
            </CardHead>
            <Cardbody className='p-0'>
              <ScrollArea className='h-48 flex flex-col gap-4'>
                {[0, 1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className='px-3 py-3.5 grid grid-cols-[24px_1fr] gap-4 border-b border-line'
                  >
                    <div className='w-6 h-6 rounded-full bg-gray-400'></div>
                    <p className='text-sm text-dark/50'>
                      Sertifikat <span className='text-dark'>TKBT</span>{' '}
                      <span className='text-dark'>Muhamad Mulyana</span> sudah
                      kedaluwarsa sejak{' '}
                      <span className='text-dark'>10 hari</span> lalu
                    </p>
                  </div>
                ))}
              </ScrollArea>
            </Cardbody>
          </Card>
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
    </DashboardLayout>
  )
}
