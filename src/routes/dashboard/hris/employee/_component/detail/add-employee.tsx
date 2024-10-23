import InputV1 from '@/components/common/input-v1'
import Label from '@/components/common/label'
import { RadioV1 } from '@/components/common/radio-v1'
import MultiSelect from '@/components/common/select/multi-select-v1'
import {
  navigationParams,
  Stepper,
  stepperAtom,
  StepperItem,
} from '@/components/common/stepper-v1'
import UploadProfile from '@/components/common/upload-profile'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useCompetency } from '@/hooks/api/use-competency'
import {
  useCreateEmployee,
  useCreateMultipleCertif,
  useUploadPhoto,
} from '@/hooks/api/use-employee'
import { cn } from '@/utils/cn'
import { months } from '@/utils/constant/months'
import { EDUCATIONS } from '@/utils/data/educations'
import { EMPLOYEMENT_TYPE } from '@/utils/data/employment-type'
import { GENDER } from '@/utils/data/gender'
import { MARITAL_STATUS } from '@/utils/data/marital-status'
import {
  createEmployee,
  payloadCreateEmployee,
  createCertif as createCertifType,
} from '@/utils/types/form'
import { useSetAtom } from 'jotai'
import { File, Mail, Phone, Plus, Trash, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: string
}

export default function AddEmployee({ open, setOpen, id }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const setCurrentStep = useSetAtom(stepperAtom)

  const { data, isLoading } = useCompetency()
  const labels = useMemo(
    () =>
      data?.data.data?.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.id,
      })) || [],
    [isLoading]
  )

  // HANDLE FORM
  const { mutate: createEmployee } = useCreateEmployee()
  const { mutate: createCertif } = useCreateMultipleCertif()
  const { mutate: uploadPhoto } = useUploadPhoto()

  const [newUser, setNewUser] = useState<any>(null)

  const form = useForm<createEmployee>({
    defaultValues: {
      photo: null as File | null,
      fullname: '',
      joined_at: '',
      joined_type: 'date',
      employment_type: 'permanent',
      last_education: '',
      gender: 'male',
      place_of_birth: '',
      marital_status: undefined,
      birth_date: '',
      religion: '',
      basic_salary: undefined,
      pay_type: 'daily',
      overtime_salary: undefined,
      positionId: id,
      email: '',
      competencies: [],
      addresses: [
        {
          type: 'domicile',
          value: '',
        },
        {
          type: 'origin',
          value: '',
        },
      ],
      phoneNumbers: [
        {
          value: '',
        },
      ],

      certif_file: null,
      certif_name: '',
      issuing_organization: '',
      issue_year: '',
      issue_month: '',
      expiry_year: '',
      expiry_month: '',
      competencyId: '',

      certifications: [],
    },
  })

  // HANDLE CERTIFICATION
  const [openNew, setOpenNew] = useState(false)

  const onCloseAddCertif = () => {
    form.resetField('certif_file')
    form.resetField('certif_name')
    form.resetField('issuing_organization')
    form.resetField('issue_month')
    form.resetField('issue_year')
    form.resetField('expiry_month')
    form.resetField('expiry_year')
    form.resetField('competencyId')
    setOpenNew(false)
  }

  const certifFields = useFieldArray({
    control: form.control,
    name: 'certifications',
  })
  // HANDLE CERTIFICATION

  // HANDLE ADDRESS
  const addressField = useFieldArray({
    control: form.control,
    name: 'addresses',
  })
  const addressess = form.watch('addresses')
  // HANDLE ADDRESS

  // HANDLE ADDRESS
  const phoneField = useFieldArray({
    control: form.control,
    name: 'phoneNumbers',
  })
  // HANDLE ADDRESS

  const photo = form.watch('photo')

  const onSubmit = async (data: createEmployee) => {
    if (newUser) {
      const payload = data.certifications.map((item) => ({ ...item }))
      createCertif(
        {
          data: payload as createCertifType[],
          employeeId: newUser.id,
        },
        {
          onSuccess: () => {
            setOpen(false)
            form.reset()
            setCurrentStep(0)
          },
        }
      )
      return
    }
    console.log(data)
    createEmployee(data as payloadCreateEmployee, {
      onSuccess: (data) => {
        setNewUser(data.data.data)
        if (data.data.data?.id && photo) {
          uploadPhoto({ id: data.data.data.id, photo })
        }
      },
    })
  }

  const handleCompetencies = (ids: any) => {
    const selected = ids.map((item: any) => item.toString())
    form.setValue('competencies', selected)
  }

  useEffect(() => {
    if (!open) {
      form.reset()
      setNewUser(null)
      setCurrentStep(0)
    }
  }, [open])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='w-[512px] max-w-full p-0'>
        <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
          <p className='text-sm text-dark'>Pegawai baru</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stepper navigation={(params) => <Navigation {...params} />}>
              <StepperItem label='Umum'>
                <div>
                  <StepHeader step={1} title='Umum' />
                  <ScrollArea className='h-[calc(100vh-244px)] px-2'>
                    <div className='flex flex-col gap-4 pt-4 mb-4 px-2'>
                      <UploadProfile
                        name='photo'
                        preview={preview}
                        setPreview={setPreview}
                      />
                      <FormField
                        label='Nama Lengkap'
                        control={form.control}
                        name='fullname'
                        render={({ field }) => <Input {...field} />}
                      />
                      <Tabs defaultValue='date'>
                        <TabsList>
                          <TabsTrigger value='date'>Tanggal</TabsTrigger>
                          <TabsTrigger value='year'>Tahun</TabsTrigger>
                        </TabsList>
                        <TabsContent value='date'>
                          <FormField
                            control={form.control}
                            name='joined_at'
                            label='Tanggal bergabung'
                            render={({ field }) => (
                              <Input
                                className='block'
                                onFocus={() => {
                                  form.setValue('joined_type', 'date')
                                }}
                                type='date'
                                {...field}
                              />
                            )}
                          />
                        </TabsContent>
                        <TabsContent value='year'>
                          <FormField
                            control={form.control}
                            name='joined_at'
                            label='Tahun bergabung'
                            render={({ field }) => (
                              <Input
                                type='number'
                                onFocus={() => {
                                  form.setValue('joined_type', 'year')
                                }}
                                {...field}
                              />
                            )}
                          />
                        </TabsContent>
                      </Tabs>
                      <Controller
                        name='employment_type'
                        control={form.control}
                        render={({ field }) => (
                          <div className='space-y-2'>
                            <FormLabel>Status Pegawai</FormLabel>
                            <div className='flex justify-between gap-4'>
                              {EMPLOYEMENT_TYPE.map((item) => (
                                <RadioV1
                                  key={item.value}
                                  {...field}
                                  value={item.value}
                                  checked={field.value === item.value}
                                >
                                  {item.name}
                                </RadioV1>
                              ))}
                            </div>
                          </div>
                        )}
                      />
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <FormLabel>Pend. Terakhir</FormLabel>
                          <Select
                            onValueChange={(val) =>
                              form.setValue('last_education', val)
                            }
                          >
                            <SelectTrigger className='w-full h-10 rounded-xl shadow-sm'>
                              <SelectValue placeholder='Pilih' />
                            </SelectTrigger>
                            <SelectContent>
                              {EDUCATIONS.map((item) => (
                                <SelectItem value={item.value} key={item.value}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className='space-y-2'>
                          <FormLabel>Jenis kelamin</FormLabel>
                          <Select
                            onValueChange={(val) =>
                              form.setValue('gender', val)
                            }
                            defaultValue={form.getValues('gender')}
                          >
                            <SelectTrigger className='w-full h-10 rounded-xl shadow-sm'>
                              <SelectValue placeholder='Pilih' />
                            </SelectTrigger>
                            <SelectContent>
                              {GENDER.map((item) => (
                                <SelectItem value={item.value} key={item.value}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='place_of_birth'
                          label='Tempat lahir'
                          render={({ field }) => (
                            <Input type='text' {...field} />
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='birth_date'
                          label='Tanggal lahir'
                          render={({ field }) => (
                            <Input type='date' className='block' {...field} />
                          )}
                        />
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <FormLabel>Status Pernikahan</FormLabel>
                          <Select
                            onValueChange={(val) =>
                              form.setValue('marital_status', val)
                            }
                            defaultValue={form.getValues('marital_status')}
                          >
                            <SelectTrigger className='w-full h-10 rounded-xl shadow-sm'>
                              <SelectValue placeholder='Pilih status' />
                            </SelectTrigger>
                            <SelectContent>
                              {MARITAL_STATUS.map((item) => (
                                <SelectItem value={item.value} key={item.value}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormField
                          control={form.control}
                          name='religion'
                          label='Agama'
                          render={({ field }) => (
                            <Input type='text' {...field} />
                          )}
                        />
                      </div>
                      <div className='space-y-2'>
                        <FormLabel>Kompetensi</FormLabel>
                        <MultiSelect
                          options={labels}
                          onChange={handleCompetencies}
                          placeholder='Pilih Kompetensi'
                        />
                      </div>
                      <div className='space-y-3'>
                        {phoneField.fields.map((_, index) => (
                          <div key={index} className='pr-9 relative'>
                            <InputV1
                              name={`phoneNumbers.${index}.value`}
                              label={
                                index > 0
                                  ? 'Nomor Telepon alternatif'
                                  : 'Nomor Telepon'
                              }
                              suffix={
                                <Phone
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden='true'
                                />
                              }
                            />
                            {index > 0 && (
                              <button
                                type='button'
                                className='absolute top-[72%] -translate-y-1/2 right-0 text-dark/80 hover:bg-dark/10 h-8 w-8 flex justify-center items-center rounded'
                                onClick={() => {
                                  phoneField.remove(index)
                                }}
                              >
                                <Trash size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant='ghost'
                          type='button'
                          className='text-blue-500 pl-2 pr-3.5 hover:bg-blue-500/10 text-sm hover:text-blue-500 font-normal gap-1'
                          onClick={() => {
                            phoneField.append({ value: '' })
                          }}
                        >
                          <Plus size={16} strokeWidth={3} />
                          Tambah No. Telp
                        </Button>
                      </div>
                      <InputV1
                        name='email'
                        label='Email'
                        suffix={
                          <Mail size={16} strokeWidth={2} aria-hidden='true' />
                        }
                      />
                      <div className='space-y-5'>
                        {addressField.fields.map((_, index) => (
                          <FormField
                            key={index}
                            control={form.control}
                            label={
                              index > 1
                                ? 'Alamat alternatife'
                                : index > 0
                                ? 'Alamat asal'
                                : 'Alamat domisili'
                            }
                            name={`addresses.${index}.value`}
                            render={({ field }) => (
                              <div className='relative'>
                                <Textarea {...field} />
                                {index > 0 && (
                                  <button
                                    type='button'
                                    className='absolute -top-5 -translate-y-1/2 right-0 text-dark/80 hover:bg-dark/10 h-8 w-8 flex justify-center items-center rounded'
                                    onClick={() => {
                                      addressField.remove(index)
                                    }}
                                  >
                                    <Trash size={16} />
                                  </button>
                                )}
                              </div>
                            )}
                          />
                        ))}
                        <Button
                          variant='ghost'
                          type='button'
                          className='text-blue-500 pl-2 pr-3.5 hover:bg-blue-500/10 text-sm hover:text-blue-500 font-normal gap-1'
                          onClick={() => {
                            if (addressess && addressess?.length > 1) {
                              addressField.append({
                                value: '',
                                type: 'alternative',
                              })
                              return
                            } else if (addressess && addressess?.length > 0) {
                              addressField.append({ value: '', type: 'origin' })
                            }
                          }}
                        >
                          <Plus size={16} strokeWidth={3} />
                          {addressess
                            ? addressess?.length > 1
                              ? 'Tambah alamat alternatif'
                              : addressess?.length > 0
                              ? 'Tambah alamat asal'
                              : null
                            : null}
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </StepperItem>
              <StepperItem label='Gaji'>
                <div>
                  <StepHeader step={1} title='Gaji' />
                  <ScrollArea className='h-[calc(100vh-244px)] px-2'>
                    <div className='flex flex-col gap-4 pt-4 mb-4 px-2'>
                      <FormField
                        control={form.control}
                        name='basic_salary'
                        label='Gaji pokok'
                        render={({ field }) => <Input type='text' {...field} />}
                      />
                      <Controller
                        name='pay_type'
                        control={form.control}
                        rules={{ required: 'Pilih salah satu' }}
                        render={({ field }) => (
                          <div className='space-y-2'>
                            <FormLabel>Tipe gaji</FormLabel>
                            <div className='flex justify-between gap-4'>
                              <RadioV1
                                {...field}
                                value='daily'
                                checked={field.value === 'daily'}
                              >
                                Harian
                              </RadioV1>
                              <RadioV1
                                {...field}
                                value='monthly'
                                checked={field.value === 'monthly'}
                              >
                                Bulanan
                              </RadioV1>
                            </div>
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='overtime_salary'
                        label='Overtime'
                        render={({ field }) => <Input type='text' {...field} />}
                      />
                    </div>
                  </ScrollArea>
                </div>
              </StepperItem>
              <StepperItem label='Sertifikat'>
                <div className='flex flex-col'>
                  <StepHeader step={3} title='Sertifikat' />
                  <ScrollArea className='h-[calc(100vh-244px)] px-2'>
                    {openNew ? (
                      <div className='flex flex-col gap-4 pt-4 mb-4 px-2'>
                        <Controller
                          control={form.control}
                          name='certif_file'
                          render={({ field }) => (
                            <div className='space-y-2'>
                              <FormLabel>Upload sertifikat</FormLabel>
                              <Input
                                type='file'
                                ref={inputRef}
                                className='file:absolute relative file:left-0 file:h-10 file:top-0 file:bg-line pl-28 file:border-0 file:px-3  file:text-dark text-gray-600 h-10 w-full rounded-xl border border-[#DEE0E3] shadow-none'
                                onChange={(e) => {
                                  field.onChange(e.target.files?.[0] || null)
                                }}
                              />
                            </div>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='certif_name'
                          label='Nama'
                          render={({ field }) => <Input {...field} />}
                        />
                        <FormField
                          control={form.control}
                          name='issuing_organization'
                          label='Penyelenggara/penerbit'
                          render={({ field }) => <Input {...field} />}
                        />
                        <div>
                          <p className='mb-2 text-sm text-dark/80'>
                            Tanggal Terbit
                          </p>
                          <div className='grid grid-cols-2 gap-4'>
                            <FormField
                              control={form.control}
                              name='issue_month'
                              render={({ field }) => (
                                <Select
                                  onValueChange={(val) => field.onChange(val)}
                                  value={field.value}
                                >
                                  <SelectTrigger className='w-full h-10 rounded-xl shadow-sm'>
                                    <SelectValue placeholder='Pilih bulan' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {months.map((item) => (
                                      <SelectItem
                                        key={`month-${item.value}`}
                                        value={item.name}
                                      >
                                        {item.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='issue_year'
                              render={({ field }) => (
                                <Input placeholder='tahun' {...field} />
                              )}
                            />
                          </div>
                        </div>
                        <div>
                          <p className='mb-2 text-sm text-dark/80'>
                            Tanggal kadaluwarsa
                          </p>
                          <div className='grid grid-cols-2 gap-4'>
                            <FormField
                              control={form.control}
                              name='expiry_month'
                              render={({ field }) => (
                                <Select
                                  onValueChange={(val) => field.onChange(val)}
                                  value={field.value}
                                >
                                  <SelectTrigger className='w-full h-10 rounded-xl shadow-sm'>
                                    <SelectValue placeholder='Pilih bulan' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {months.map((item) => (
                                      <SelectItem
                                        key={`month-${item.value}`}
                                        value={item.name}
                                      >
                                        {item.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='expiry_year'
                              render={({ field }) => (
                                <Input
                                  placeholder='tahun'
                                  type='text'
                                  {...field}
                                />
                              )}
                            />
                          </div>
                        </div>
                        {newUser && !!newUser.competencies.length && (
                          <div className='space-y-2'>
                            <FormLabel>Kompetensi terkait</FormLabel>
                            <Select
                              onValueChange={(val) =>
                                form.setValue('competencyId', val)
                              }
                            >
                              <SelectTrigger className='w-full h-10 rounded-xl shadow-sm'>
                                <SelectValue placeholder='Pilih' />
                              </SelectTrigger>
                              <SelectContent>
                                {newUser.competencies.map(
                                  (item: any, index: number) => (
                                    <SelectItem
                                      key={`user-competency-` + index}
                                      value={item.competency.id.toString()}
                                    >
                                      {item.competency.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        <div className='flex justify-end gap-4'>
                          <Button variant='outline' onClick={onCloseAddCertif}>
                            Batal
                          </Button>
                          <Button
                            variant='secondary'
                            onClick={() => {
                              certifFields.append({
                                certif_file: form.getValues('certif_file'),
                                certif_name: form.getValues('certif_name'),
                                issuing_organization: form.getValues(
                                  'issuing_organization'
                                ),
                                issue_year: form.getValues('issue_year'),
                                issue_month: form.getValues('issue_month'),
                                expiry_year: form.getValues('expiry_year'),
                                expiry_month: form.getValues('expiry_month'),
                                competencyId: form.getValues('competencyId'),
                              })
                              onCloseAddCertif()
                            }}
                          >
                            Tambah
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className='px-2 mt-2'>
                        {certifFields.fields.map((item, index) => {
                          const label = labels.filter(
                            (t: any) => t.id === Number(item.competencyId)
                          )

                          return (
                            <div
                              key={`certifications+${index}`}
                              className='relative w-full border p-2'
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
                                    name={label[0].name}
                                    color={label[0].color}
                                  />
                                </div>
                              )}
                              <div className='flex gap-2 items-center mt-3'>
                                <File className='w-4 h-4 text-dark/40' />
                                <p className='text-sm text-dark/80'>
                                  {item.certif_file?.name}
                                </p>
                              </div>
                              <button
                                onClick={() => certifFields.remove(index)}
                                className='absolute top-0 right-0 bg-line h-7 w-7 flex justify-center items-center'
                              >
                                <X className='w-5 h-5 text-dark' />
                              </button>
                            </div>
                          )
                        })}
                        <Button
                          variant='secondary'
                          onClick={() => setOpenNew(true)}
                          className='flex mx-auto mt-4'
                        >
                          <Plus className='w-4 h-4' />
                          Tambah sertifikasi
                        </Button>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </StepperItem>
            </Stepper>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

function StepHeader({ step, title }: { step: number; title: string }) {
  return (
    <div className='mt-4 px-4'>
      <div className='pb-1.5 border-b border-line'>
        <p className='text-sm text-dark/50'>Tahap {step}</p>
        <p className='text-dark font-semibold mt-2'>{title}</p>
      </div>
    </div>
  )
}

function Navigation({
  nextStep,
  prevStep,
  step,
  totalSteps,
}: navigationParams) {
  return (
    <div
      className={cn(
        'mt-4 flex justify-between items-center px-4 absolute bottom-0 left-0 w-full py-4 border-t border-line',
        step === 0 && 'justify-end'
      )}
    >
      {step > 0 && (
        <button
          type='button'
          onClick={prevStep}
          disabled={step === 0}
          className='py-2 px-3 h-fit border border-line text-dark rounded-lg text-sm bg-white'
        >
          Sebelumnya
        </button>
      )}
      <div className='flex gap-2 items-center justify-end'>
        {step === 0 && (
          <button
            type='submit'
            onClick={nextStep}
            className='py-2 px-3 h-fit border border-blue-darker text-white bg-blue-primary rounded-lg text-sm'
          >
            Selanjutnya
          </button>
        )}
        {step > 0 && (
          <button
            type='submit'
            onClick={nextStep}
            className='py-2 px-3 h-fit border border-blue-darker text-white bg-blue-primary rounded-lg text-sm'
          >
            {step !== totalSteps ? 'Selanjutnya' : 'Simpan'}
          </button>
        )}
      </div>
    </div>
  )
}
