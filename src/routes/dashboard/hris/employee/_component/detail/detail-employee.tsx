import Chips from '@/components/common/chips'
import { Editable } from '@/components/common/editable'
import Label from '@/components/common/label'
import PhotoProfile from '@/components/common/photo-profile'
import { Tab, Tabs } from '@/components/tab'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useEmployee, useUpdateEmployee } from '@/hooks/api/use-employee'
import { BASE_URL } from '@/utils/constant/_urls'
import { format, parseISO } from 'date-fns'
import { id as indonesia } from 'date-fns/locale'
import { File, Paperclip, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}

const MARITAL_STATUS = {
  single: 'Belum menikah',
  married: 'Menikah',
  divorced: 'Cerai',
}

type TMaritalStatus = 'single' | 'married' | 'divorced'

export default function DetailEmployee({ open, setOpen, id }: Props) {
  const { mutate: update } = useUpdateEmployee()
  const { data, isLoading, isFetching } = useEmployee(id)
  const employee = useMemo(
    () => data?.data.data || {},
    [data, isLoading, isFetching]
  )

  const [edit, setEdit] = useState<string | null>('')
  const isEdit = useMemo(() => edit, [edit])
  const onEdit = useCallback(
    (val: string | null) => {
      setEdit(val)
    },
    [edit]
  )

  useEffect(() => {
    if(!open) {
      setEdit(null)
    }
  }, [open])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='p-0'>
        <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
          <p className='text-sm text-dark'>Detail Pegawai</p>
        </div>
        <ScrollArea className='h-[calc(100vh-48px)]'>
          <div className='mt-4 px-4'>
            <PhotoProfile
              defaultPreview={
                employee?.photo ? BASE_URL + '/img/' + employee?.photo : null
              }
            />
            <Editable
              isEdit={isEdit}
              keyData='fullname'
              onEdit={onEdit}
              defaultData={employee?.fullname}
              className='text-lg font-medium text-dark mt-4 py-1 px-1'
              classNameInput='text-lg font-medium text-dark mt-4 py-1 px-1'
              onUpdate={(val) => {
                if (!id) return
                update({ id, payload: { fullname: val as string } })
              }}
            />
            <div className='grid grid-cols-[140px_1fr] gap-4 mt-2 gap-y-3'>
              <p className='text-dark/50'>Status</p>
              <Chips
                status={employee?.status ?? false}
                className='rounded-full'
              />
              <p className='text-dark/50'>Tipe</p>
              <Editable
                isEdit={isEdit}
                onEdit={onEdit}
                keyData='employment_type'
                type='select'
                defaultData={employee?.employment_type}
                className='capitalize'
                options={[
                  { label: 'Tetap', value: 'permanent' },
                  { value: 'contract', label: 'Kontrak' },
                  { value: 'partime', label: 'Partime' },
                ]}
                onUpdate={(val) => {
                  if (!id) return
                  update({ id, payload: { employment_type: val as string } })
                }}
              />
              <p className='text-dark/50'>Bergabung sejak</p>
              <Editable
                isEdit={isEdit}
                keyData='joined_at'
                defaultData={employee?.joined_at}
                className='capitalize'
                customData={(val) => {
                  if (typeof val == 'string') {
                    return (
                      <p>
                        {format(parseISO(val), 'EEEE, MMMM d yyyy', {
                          locale: indonesia,
                        })}
                      </p>
                    )
                  }
                }}
              />

              <p className='text-dark/50'>Kompetensi</p>
              <div className='flex gap-1 flex-wrap'>
                {employee?.competencies &&
                  !!employee?.competencies.length &&
                  employee?.competencies.map((item: any, index: number) => (
                    <Label
                      color={item.competency.color}
                      name={item.competency.name}
                      key={`label-${index}`}
                    />
                  ))}
              </div>
            </div>
            <div className='mt-6 mb-8'>
              <div className='flex gap-2 items-center '>
                <Paperclip className='w-3.5 h-3.5 text-dark/50' />
                <p className='text-dark text-sm'>Lampiran</p>
                {employee?._count?.certifications && (
                  <p className='text-dark font-medium text-sm'>
                    ({employee?._count?.certifications})
                  </p>
                )}
              </div>
            </div>
          </div>
          <Tabs>
            <Tab label='Umum'>
              <div className='grid grid-cols-[140px_1fr] gap-4 mt-2 gap-y-3 px-4 pb-5'>
                <p className='text-dark/50'>Pend. Terakhir</p>
                <Editable
                  isEdit={isEdit}
                  keyData='last_education'
                  defaultData={employee?.last_education}
                  className='capitalize'
                />
                <p className='text-dark/50'>Tempat lahir</p>
                <Editable
                  isEdit={isEdit}
                  keyData='place_of_birth'
                  defaultData={employee?.place_of_birth}
                  className='capitalize'
                />
                <p className='text-dark/50'>Tanggal lahir</p>
                <Editable
                  isEdit={isEdit}
                  keyData='birth_date'
                  defaultData={employee?.birth_date}
                  className='capitalize'
                  customData={(val) => {
                    if (typeof val == 'string') {
                      return (
                        <p>
                          {format(parseISO(val), 'EEEE, MMMM d yyyy', {
                            locale: indonesia,
                          })}
                        </p>
                      )
                    }
                  }}
                />
                <p className='text-dark/50'>Jenis kelamin</p>
                <Editable
                  isEdit={isEdit}
                  keyData='gender'
                  defaultData={employee?.gender}
                  className='capitalize'
                  customData={(val) => {
                    if (typeof val == 'string') {
                      return <p>{val == 'male' ? 'Laki-laki' : 'Perempuan'}</p>
                    }
                  }}
                />
                <p className='text-dark/50'>Status pernikahan</p>
                <Editable
                  isEdit={isEdit}
                  keyData='marital_status'
                  defaultData={employee?.marital_status}
                  className='capitalize'
                  customData={(val: any) => {
                    if (typeof val == 'string') {
                      return <p>{MARITAL_STATUS[val as TMaritalStatus]}</p>
                    }
                  }}
                />
                <p className='text-dark/50'>Agama</p>
                <Editable
                  isEdit={isEdit}
                  keyData='religion'
                  defaultData={employee?.religion}
                  className='capitalize'
                />
              </div>
            </Tab>
            <Tab label='Sertifikat'>
              <div className='px-4 pb-5 space-y-2 mt-2'>
                {employee.certifications &&
                  !!employee.certifications.length &&
                  employee.certifications.map((item: any, index: number) => {
                    return (
                      <div
                        key={`certifications+${index}`}
                        className='relative w-full border p-4 rounded-md overflow-hidden'
                      >
                        <p className='text-dark font-medium'>
                          {item.certif_name}
                        </p>
                        <p className='text-dark/70'>
                          {item?.issuing_organization}
                        </p>
                        {(item.issue_month || item.issue_year) && (
                          <p className='text-sm text-dark/70'>
                            Terbit sejak{' '}
                            <span className='text-dark'>
                              {item.issue_month} {item.issue_year}
                            </span>{' '}
                            sampai{' '}
                            <span className='text-dark'>
                              {item.expiry_month} {item.expiry_year}
                            </span>
                          </p>
                        )}
                        {item.competencyId && (
                          <div className='space-y-1 mt-2'>
                            <p className='text-dark/70'>Terkait dengan</p>
                            <Label
                              name={item.competency.name}
                              color={item.competency.color}
                            />
                          </div>
                        )}
                        <div className='flex gap-2 items-center mt-3'>
                          <File className='w-5 h-5 text-dark/40' />
                          <Link
                            to={`${BASE_URL}/files/${item.certif_file}`}
                            target='_blank'
                          >
                            Lihat sertifikat
                          </Link>
                        </div>
                        <button className='absolute top-0 right-0 bg-line h-7 w-7 flex justify-center items-center'>
                          <X className='w-5 h-5 text-dark' />
                        </button>
                      </div>
                    )
                  })}
              </div>
            </Tab>
          </Tabs>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
