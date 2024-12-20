import { useCallback, useEffect, useMemo, useState } from 'react'
import { id as indonesia } from 'date-fns/locale'
import { format, parseISO } from 'date-fns'
import { Ellipsis } from 'lucide-react'
import { useAtomValue } from 'jotai'

import {
  useEmployee,
  useRemovePhoto,
  useUpdateEmployee,
  useUploadPhoto,
} from '@/hooks/api/use-employee'
import { permissionAtom } from '@/atom/permission'

import { MARITAL_STATUS, MARITAL_STATUS_OBJ } from '@/utils/data/marital-status'
import { EDUCATIONS, EDUCATIONS_OBJ } from '@/utils/data/educations'
import { PAY_TIPE, PAY_TIPE_OBJ } from '@/utils/data/pay-tipe'
import { GENDER, GENDER_OBJ } from '@/utils/data/gender'
import { formatToRupiah } from '@/utils/formatCurrency'
import { BASE_URL } from '@/utils/constant/_urls'
import { Employee } from '@/utils/types/api'
import { cn } from '@/utils/cn'
import {
  EMPLOYEMENT_TYPE,
  EMPLOYEMENT_TYPE_OBJ,
} from '@/utils/data/employment-type'

import PhotoProfile from '@/components/common/photo-profile'
import DataSheet from '@/components/common/data-sheet'
import Chips from '@/components/common/chips'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Editable } from '@/components/common/editable'
import { Button } from '@/components/ui/button'
import { Tab, Tabs } from '@/components/tab'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import CompetenciesEmployee from './employee/competencies-employee'
import AddressEmployee from './employee/address-employee'
import StatusEmployee from './employee/status-employee'
import CertifEmployee from './employee/certif-employee'
import JoinedEmployee from './employee/joined-employee'
import ProtectedComponent from '@/components/protected'
import PhoneEmployee from './employee/phone-employee'
import DeleteEmployee from './delete-employee'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}

export default function DetailEmployee({ open, setOpen, id }: Props) {
  const permission = useAtomValue(permissionAtom)

  const { mutate: uploadPhoto } = useUploadPhoto()
  const { mutate: removePhoto } = useRemovePhoto()
  const { mutate: update } = useUpdateEmployee()

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
      setOpenActive(false)
    }
  }, [open])
  // HANDLE EDIT

  // HANDLE ACTIVE/INACTIVE AND DExzLETE
  const [openActive, setOpenActive] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  // HANDLE ACTIVE/INACTIVE AND DELETE

  const isAllowed = permission?.includes('employee:update')

  if (!id) return null

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={false}>
      <SheetContent className='p-0 w-full'>
        <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
          <p className='text-sm text-dark'>Detail Pegawai</p>
        </div>
        <ScrollArea className='h-[calc(100vh-48px)] relative'>
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
              disabled={!isAllowed}
            />
            <div className='relative pr-7'>
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
                disabled={!isAllowed}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    className='absolute flex justify-center items-center top-1/2 -translate-y-1/2 right-0 w-6 h-6 p-0'
                  >
                    <Ellipsis size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='min-w-fit -translate-x-4'>
                  <ProtectedComponent
                    required={['employee:activate', 'employee:deactivate']}
                  >
                    <DropdownMenuItem onClick={() => setOpenActive(true)}>
                      {employee?.status ? 'Nonaktifkan' : 'Aktifkan'}
                    </DropdownMenuItem>
                  </ProtectedComponent>
                  <ProtectedComponent required={['employee:delete']}>
                    <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                      Hapus
                    </DropdownMenuItem>
                  </ProtectedComponent>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
                  disabled={!isAllowed}
                />
              </DataSheet>
              <DataSheet className={cn(isEdit == 'joined_at' && 'items-start')}>
                <p className='text-dark/50'>Bergabung sejak</p>
                <JoinedEmployee
                  id={id}
                  isEdit={isEdit}
                  onEdit={onEdit}
                  joined_at={employee.joined_at}
                  joined_type={employee.joined_type}
                  permission={permission}
                />
              </DataSheet>
              <DataSheet>
                <p className='text-dark/50'>Safety Induction</p>
                <Editable
                  isEdit={isEdit}
                  onEdit={onEdit}
                  keyData='safety_induction_date'
                  type='date'
                  defaultData={employee?.safety_induction_date}
                  customData={(val) => (
                    <p>{format(val, 'd MMMM yyyy', { locale: indonesia })}</p>
                  )}
                  onUpdate={(val) => {
                    update({
                      id,
                      payload: { safety_induction_date: new Date(val) as Date },
                    })
                  }}
                  disabled={!isAllowed}
                />
              </DataSheet>
              <DataSheet className='items-start'>
                <p className='text-dark/50'>Kompetensi</p>
                <CompetenciesEmployee
                  id={id}
                  competencies={employee?.competencies || []}
                  permission={permission}
                />
              </DataSheet>
            </div>
          </div>
          <Tabs>
            <Tab label='Umum'>
              <div className='flex flex-col gap-3 px-4 pb-10 pt-2 bg-[#FBFBFB] min-h-[calc(100vh-422px)]'>
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
                    disabled={!isAllowed}
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
                    disabled={!isAllowed}
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
                    disabled={!isAllowed}
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
                    disabled={!isAllowed}
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
                    disabled={!isAllowed}
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
                    disabled={!isAllowed}
                  />
                </DataSheet>
                <DataSheet className='items-start mt-4'>
                  <p className='text-dark/50'>Nomor Telepon</p>
                  <PhoneEmployee
                    id={id}
                    phones={employee?.phoneNumbers || []}
                    permission={permission}
                  />
                </DataSheet>
                <DataSheet className='items-start mt-4'>
                  <p className='text-dark/50'>Alamat</p>
                  <AddressEmployee
                    id={id}
                    addresses={employee?.addresses || []}
                    permission={permission}
                  />
                </DataSheet>
              </div>
            </Tab>
            <Tab
              label='Gaji'
              hidden={!permission.includes('employee:read-salary')}
            >
              <div className='flex flex-col gap-5 px-4 pb-10 pt-2 bg-[#FBFBFB] min-h-[calc(100vh-422px)]'>
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
                    disabled={!isAllowed}
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
                    disabled={!isAllowed}
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
                    disabled={!isAllowed}
                  />
                </DataSheet>
              </div>
            </Tab>
            <Tab label='Sertifikat'>
              <div className='flex flex-col gap-3 px-4 pb-10 pt-4 bg-[#FBFBFB] min-h-[calc(100vh-422px)]'>
                <CertifEmployee
                  certifications={employee?.certifications || []}
                  permission={permission}
                  id={id}
                />
              </div>
            </Tab>
          </Tabs>
          <StatusEmployee
            open={openActive}
            setOpen={setOpenActive}
            employee={{ ...employee }}
          />
          <DeleteEmployee
            open={openDelete}
            setOpen={setOpenDelete}
            id={employee.id}
          />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
