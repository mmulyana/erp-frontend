import Chips from '@/components/common/chips'
import DataSheet from '@/components/common/data-sheet'
import { Editable } from '@/components/common/editable'
import Label from '@/components/common/label'
import PhotoProfile from '@/components/common/photo-profile'
import { Tab, Tabs } from '@/components/tab'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import {
  useEmployee,
  useRemovePhoto,
  useUpdateEmployee,
  useUploadPhoto,
} from '@/hooks/api/use-employee'
import { BASE_URL } from '@/utils/constant/_urls'
import { EDUCATIONS, EDUCATIONS_OBJ } from '@/utils/data/educations'
import {
  EMPLOYEMENT_TYPE,
  EMPLOYEMENT_TYPE_OBJ,
} from '@/utils/data/employment-type'
import { GENDER, GENDER_OBJ } from '@/utils/data/gender'
import { MARITAL_STATUS, MARITAL_STATUS_OBJ } from '@/utils/data/marital-status'
import { Employee } from '@/utils/types/api'
import { format, parseISO } from 'date-fns'
import { id as indonesia } from 'date-fns/locale'
import { File, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PhoneEmployee from './phone-employee'
import AddressEmployee from './address-employee'
import { PAY_TIPE, PAY_TIPE_OBJ } from '@/utils/data/pay-tipe'
import { formatToRupiah } from '@/utils/formatCurrency'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}

export default function DetailEmployee({ open, setOpen, id }: Props) {
  const { mutate: update } = useUpdateEmployee()
  const { mutate: uploadPhoto } = useUploadPhoto()
  const { mutate: removePhoto } = useRemovePhoto()

  // HANDLE DATA DETAIL
  const { data, isLoading, isFetching } = useEmployee(id)
  const employee: Employee = useMemo(
    () => data?.data.data || {},
    [data, isLoading, isFetching]
  )
  // HANDLE DATA DETAIL

  // HANDLE EDIT
  const [edit, setEdit] = useState<string | null>('')
  const isEdit = useMemo(() => edit, [edit])
  const onEdit = useCallback(
    (val: string | null) => {
      setEdit(val)
    },
    [edit]
  )

  useEffect(() => {
    if (!open) {
      setEdit(null)
    }
  }, [open])
  // HANDLE EDIT

  if (!id) return null

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='p-0 min-w-[400px] max-w-full'>
        <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
          <p className='text-sm text-dark'>Detail Pegawai</p>
        </div>
        <ScrollArea className='h-[calc(100vh-48px)]'>
          <div className='mt-4 px-4 mb-8'>
            <PhotoProfile
              defaultPreview={
                employee?.photo ? BASE_URL + '/img/' + employee?.photo : null
              }
              onUpdate={(photo) => {
                uploadPhoto({ id, photo })
              }}
              onRemove={() => {
                removePhoto({ id })
              }}
            />
            <Editable
              isEdit={isEdit}
              keyData='fullname'
              onEdit={onEdit}
              defaultData={employee?.fullname}
              className='text-lg font-medium text-dark mt-4 py-1 px-1'
              classNameInput='text-lg font-medium text-dark mt-4 py-1 px-1'
              onUpdate={(val) => {
                update({ id, payload: { fullname: val as string } })
              }}
            />
            <div className='flex flex-col gap-4 w-fit mt-2'>
              <DataSheet>
                <p className='text-dark/50'>Status</p>
                <Chips
                  status={employee?.status ?? false}
                  className='rounded-full'
                />
              </DataSheet>
              <DataSheet>
                <p className='text-dark/50'>Tipe</p>
                <Editable
                  isEdit={isEdit}
                  onEdit={onEdit}
                  keyData='employment_type'
                  type='select'
                  defaultData={employee?.employment_type}
                  className='capitalize'
                  options={EMPLOYEMENT_TYPE}
                  customData={(val) => <p>{EMPLOYEMENT_TYPE_OBJ[val]}</p>}
                  onUpdate={(val) => {
                    update({
                      id,
                      payload: { employment_type: val as string },
                    })
                  }}
                />
              </DataSheet>
              <DataSheet>
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
              </DataSheet>
              <DataSheet>
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
              </DataSheet>
            </div>
          </div>
          <Tabs>
            <Tab label='Umum'>
              <div className='flex flex-col gap-3 px-4 pb-10 pt-2 bg-[#FBFBFB] h-[calc(100vh-422px)]'>
                <DataSheet>
                  <p className='text-dark/50'>Pend. Terakhir</p>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='last_education'
                    defaultData={employee?.last_education}
                    type='select'
                    options={EDUCATIONS}
                    customData={(val) => <p>{EDUCATIONS_OBJ[val]}</p>}
                    onUpdate={(val) => {
                      update({ id, payload: { last_education: val as string } })
                    }}
                  />
                </DataSheet>
                <DataSheet>
                  <p className='text-dark/50'>Tempat lahir</p>
                  <Editable
                    isEdit={isEdit}
                    keyData='place_of_birth'
                    defaultData={employee?.place_of_birth}
                    onEdit={onEdit}
                    onUpdate={(val) => {
                      update({ id, payload: { place_of_birth: val as string } })
                    }}
                  />
                </DataSheet>
                <DataSheet>
                  <p className='text-dark/50'>Tanggal lahir</p>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='birth_date'
                    defaultData={employee?.birth_date}
                    className='capitalize'
                    customData={(val) => {
                      if (typeof val == 'string') {
                        return (
                          <p>
                            {format(parseISO(val), 'd/MM/yyyy', {
                              locale: indonesia,
                            })}
                          </p>
                        )
                      }
                    }}
                    type='date'
                    onUpdate={(val) => {
                      if (!id) return
                      update({ id, payload: { birth_date: val as string } })
                    }}
                  />
                </DataSheet>
                <DataSheet>
                  <p className='text-dark/50'>Jenis kelamin</p>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='gender'
                    defaultData={employee?.gender}
                    customData={(val) => <p>{GENDER_OBJ[val]}</p>}
                    options={GENDER}
                    type='select'
                    onUpdate={(val) => {
                      update({ id, payload: { gender: val as string } })
                    }}
                  />
                </DataSheet>
                <DataSheet>
                  <p className='text-dark/50'>Status pernikahan</p>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='marital_status'
                    defaultData={employee?.marital_status}
                    className='capitalize'
                    customData={(val) => <p>{MARITAL_STATUS_OBJ[val]}</p>}
                    type='select'
                    options={MARITAL_STATUS}
                    onUpdate={(val) => {
                      update({ id, payload: { marital_status: val as string } })
                    }}
                  />
                </DataSheet>
                <DataSheet>
                  <p className='text-dark/50'>Agama</p>
                  <Editable
                    isEdit={isEdit}
                    keyData='religion'
                    defaultData={employee?.religion}
                    className='capitalize'
                    onEdit={onEdit}
                    onUpdate={(val) => {
                      update({ id, payload: { religion: val as string } })
                    }}
                  />
                </DataSheet>
                <DataSheet>
                  <p className='text-dark/50'>Email</p>
                  <Editable
                    isEdit={isEdit}
                    keyData='email'
                    defaultData={employee?.email}
                    className='text-dark'
                    onEdit={onEdit}
                    onUpdate={(val) => {
                      update({ id, payload: { email: val as string } })
                    }}
                  />
                </DataSheet>
                <DataSheet className='items-start mt-4'>
                  <p className='text-dark/50'>Nomor Telepon</p>
                  <PhoneEmployee
                    id={id}
                    phones={employee?.phoneNumbers || []}
                  />
                </DataSheet>
                <DataSheet className='items-start mt-4'>
                  <p className='text-dark/50'>Alamat</p>
                  <AddressEmployee
                    id={id}
                    addresses={employee?.addresses || []}
                  />
                </DataSheet>
              </div>
            </Tab>
            <Tab label='Gaji'>
              <div className='flex flex-col gap-3 px-4 pb-10 pt-2 bg-[#FBFBFB] h-[calc(100vh-422px)]'>
                <DataSheet>
                  <p className='text-dark/50'>Gaji Pokok</p>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='basic_salary'
                    defaultData={employee?.basic_salary}
                    customData={(val) => <p>{formatToRupiah(val as number)}</p>}
                    onUpdate={(val) => {
                      update({ id, payload: { basic_salary: val as string } })
                    }}
                  />
                </DataSheet>
                <DataSheet>
                  <p className='text-dark/50'>Tipe gaji</p>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='pay_type'
                    type='select'
                    defaultData={employee?.pay_type}
                    className='capitalize'
                    options={PAY_TIPE}
                    customData={(val) => <p>{PAY_TIPE_OBJ[val]}</p>}
                    onUpdate={(val) => {
                      update({
                        id,
                        payload: { pay_type: val as string },
                      })
                    }}
                  />
                </DataSheet>
                <DataSheet>
                  <p className='text-dark/50'>Gaji Overtime</p>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='overtime_salary'
                    defaultData={employee?.overtime_salary}
                    customData={(val) => <p>{formatToRupiah(val as number)}</p>}
                    onUpdate={(val) => {
                      update({
                        id,
                        payload: { overtime_salary: val as string },
                      })
                    }}
                  />
                </DataSheet>
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
