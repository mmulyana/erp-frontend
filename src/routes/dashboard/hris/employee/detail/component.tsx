import Filter from '@/components/common/filter'
import Search from '@/components/common/search'
import Modal from '@/components/modal-v2'
import { Button } from '@/components/ui/button'
import { useEmployees } from '@/hooks/use-employee'
import { EmployeeStatus } from '@/utils/enum/common'
import { Employee } from '@/utils/types/employee'
import useUrlState from '@ahooksjs/use-url-state'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInYears, parse } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { Ellipsis, UserRoundPlus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { isString } from 'lodash'
import { z } from 'zod'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/data-table'

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
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-4'>
          <div className='max-w-[180px]'>
            <Search />
          </div>
          <Filter />
        </div>
        <ModalAdd />
      </div>
      <DataTable columns={columns} data={dummyEmployees} />
    </>
  )
}

function ModalAdd() {
  const [open, setOpen] = useState(false)

  const form = useForm<EmployeeSchema>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      fullname: '',
      birthdate: '',
    },
  })

  const submit = async (data: EmployeeSchema) => {
    console.log(data)
  }

  return (
    <>
      <Button onClick={() => setOpen(!open)} className='h-8'>
        Tambah Pegawai
      </Button>
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
        <div className='pb-8'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <FormField
                name='fullname'
                label='Nama lengkap'
                render={({ field }) => <Input {...field} />}
              />
            </form>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'fullname',
    header: 'Nama',
    cell: ({ cell }) => {
      return <p>{cell.row.original.fullname}</p>
    },
  },
  {
    id: 'contact',
    header: 'Kontak',
    cell: ({ cell }) => {
      const contact = cell.row.original.contact
      const primaryIndex = useMemo(
        () => contact?.findIndex((c) => !!c.isPrimary),
        [contact]
      )

      return <p>{contact?.[primaryIndex ?? 0]?.value}</p>
    },
  },
  {
    id: 'age',
    header: 'Usia',
    cell: ({ cell }) => {
      if (!cell.row.original.birthdate) return null
      const birtdate = parse(
        cell.row.original.birthdate,
        'yyyy-MM-dd',
        new Date()
      )
      const age = differenceInYears(new Date(), birtdate)

      return <p>{age}</p>
    },
  },
  {
    accessorKey: 'last_education',
    header: 'Pendidikan terakhir',
  },
  {
    accessorKey: 'employeeCompetency',
    header: 'Kompetensi',
    cell: ({ cell }) => {
      const competencies = cell.row.original.employeeCompetency
      return (
        <p>
          {!!competencies?.length &&
            competencies?.map((item) => (
              <p key={item.id}>{item.competency.name}</p>
            ))}
        </p>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'action',
    cell: () => {
      return (
        <div className='flex justify-end w-full'>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className='border-transparent hover:border-gray-200'
            >
              <Button variant='outline' className='p-0 h-fit rounded px-0.5'>
                <Ellipsis className='w-6 h-6 text-[#313951]/70' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-full right-0'></DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

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

const dummyEmployees: Employee[] = [
  {
    id: 1,
    fullname: 'Alice Johnson',
    nickname: 'Ali',
    hireDate: new Date('2022-03-01'),
    salary_per_month: 5000,
    salary_per_day: 250,
    salary_per_hour: 31.25,
    status: EmployeeStatus.active,
    place_of_birth: 'New York',
    birthdate: '1990-05-15',
    nik: '1234567890',
    kk: '0987654321',
    religion: 'Christian',
    positionId: 1,
    position: {
      id: 1,
      name: 'Software Developer',
      description: 'Develops software applications',
    },
    attendances: [],
    cashAdvances: [],
    leaves: [],
    contact: [],
    address: [],
    statusTracks: [],
    employeeCompetency: [],
  },
  {
    id: 2,
    fullname: 'Bob Williams',
    nickname: 'Bobby',
    hireDate: new Date('2021-11-15'),
    salary_per_month: 6000,
    salary_per_day: 300,
    salary_per_hour: 37.5,
    status: EmployeeStatus.active,
    place_of_birth: 'Los Angeles',
    birthdate: '1988-09-22',
    nik: '9876543210',
    kk: '0123456789',
    religion: 'Muslim',
    positionId: 2,
    position: {
      id: 2,
      name: 'Project Manager',
      description: 'Manages software projects',
    },
    attendances: [],
    cashAdvances: [],
    leaves: [],
    contact: [],
    address: [],
    statusTracks: [],
    employeeCompetency: [],
  },
]
