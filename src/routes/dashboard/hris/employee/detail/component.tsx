import Search from '@/components/common/search'
import Modal from '@/components/modal-v2'
import { Button } from '@/components/ui/button'
import { useEmployees } from '@/hooks/use-employee'
import { EmployeeStatus } from '@/utils/enum/common'
import useUrlState from '@ahooksjs/use-url-state'
import { isString } from 'lodash'
import { UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'

type TableEmployeeProps = {
  status?: EmployeeStatus
  positionId?: string
}
export function TableEmployee({ status, positionId }: TableEmployeeProps) {
  const [url] = useUrlState({ name: '' })
  const {} = useEmployees({
    ...(!!status ? { status } : undefined),
    ...(isString(url.name) ? { name: url.name } : undefined),
    ...(!!positionId ? { positionId } : undefined),
  })

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex gap-16'>
          <div className='max-w-[180px]'>
            <Search />
          </div>
        </div>
        <ModalAdd />
      </div>
    </>
  )
}

function ModalAdd() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Tambah Pegawai</Button>
      <Modal
        open={open}
        setOpen={setOpen}
        title='Tambah Pegawai Baru'
        subtitle='Silahkan masukkan data yang dibutuhkan'
        icon={
          <div className='h-8 w-8 rounded-[8px] bg-[#5463E8] border border-[#4752BE] flex items-center justify-center shadow-md shadow-[#5463E8]/50'>
            <UserRoundPlus className='w-5 h-5 text-white' />
          </div>
        }
      >
        <div className='pb-8'></div>
      </Modal>
    </>
  )
}

const employeeSchema = z.object({
  fullname: z.string(),
  nickname: z.string().optional(),
  hireDate: z.string().optional(),
  salary_per_month: z.number().optional(),
  salary_per_day: z.number().optional(),
  salary_per_hour: z.number().optional(),
  status: z.enum(['active', 'nonactive']),
  place_of_birth: z.string().optional(),
  birthdate: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  marital_status: z
    .enum(['single', 'married', 'divorced', 'widowed'])
    .optional(),
  nik: z.string().optional(),
  kk: z.string().optional(),
  religion: z.string().optional(),
  positionId: z.number().optional(),
})

type EmployeeSchema = z.infer<typeof employeeSchema>
