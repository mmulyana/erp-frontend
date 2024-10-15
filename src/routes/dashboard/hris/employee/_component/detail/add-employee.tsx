import Label from '@/components/common/label'
import { RadioV1 } from '@/components/common/radio-v1'
import MultiSelect from '@/components/common/select/multi-select-v1'
import {
  navigationParams,
  Stepper,
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
import { useCompetency } from '@/hooks/api/use-competency'
import {
  useCreateCertifEmployee,
  useCreateEmployee,
} from '@/hooks/api/use-employee'
import { cn } from '@/utils/cn'
import { months } from '@/utils/constant/months'
import { File, Plus, X } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: string
}

type Certifications = {
  certif_file: File | null
  certif_name: string
  issuing_organization: string
  issue_year: string
  issue_month: string
  expiry_year: string
  expiry_month: string
  competencyId: string
}

export default function AddEmployee({ open, setOpen, id }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [openNew, setOpenNew] = useState(false)

  const { data, isLoading } = useCompetency()
  const labels = useMemo(
    () =>
      data?.data.data.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.id,
      })) || [],
    [isLoading]
  )

  // HANDLE FORM
  const { mutate: createEmployee } = useCreateEmployee()
  const { mutate: createCertif } = useCreateCertifEmployee()

  const [newUser, setNewUser] = useState<any>(null)

  const form = useForm({
    defaultValues: {
      photo: null as File | null,
      fullname: '',
      joined_at: '',
      joined_type: 'date',
      employment_type: 'permanent',
      last_education: '',
      gender: 'male',
      place_of_birth: '',
      birth_date: '',
      marital_status: '',
      religion: '',
      basic_salary: '',
      pay_type: 'daily',
      overtime_salary: '',
      positionId: id,
      competencies: [] as string[],

      certif_file: null as File | null,
      certif_name: '',
      issuing_organization: '',
      issue_year: '',
      issue_month: '',
      expiry_year: '',
      expiry_month: '',
      competencyId: '',

      certifications: [] as Certifications[],
    },
  })

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: 'certifications',
  })

  const onSubmit = async (data: any) => {
    if (newUser) {
      const payload = data.certifications
      createCertif(
        {
          data: payload,
          employeeId: newUser.id,
        },
        {
          onSuccess: () => setOpen(false),
        }
      )
      return
    }
    createEmployee(
      { data },
      { onSuccess: (data) => setNewUser(data.data.data) }
    )
  }

  const handleCompetencies = (ids: any) => {
    const selected = ids.map((item: any) => item.toString())
    form.setValue('competencies', selected)
  }
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
                              <RadioV1
                                {...field}
                                value='permanent'
                                checked={field.value === 'permanent'}
                              >
                                Tetap
                              </RadioV1>
                              <RadioV1
                                {...field}
                                value='contract'
                                checked={field.value === 'contract'}
                              >
                                Kontrak
                              </RadioV1>
                              <RadioV1
                                {...field}
                                value='partime'
                                checked={field.value === 'partime'}
                              >
                                Partime
                              </RadioV1>
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
                              <SelectItem value='SD'>SD</SelectItem>
                              <SelectItem value='SMP'>SMP</SelectItem>
                              <SelectItem value='SMA/SMK'>SMA/SMK</SelectItem>
                              <SelectItem value='D1'>Diploma 1</SelectItem>
                              <SelectItem value='D2'>Diploma 2</SelectItem>
                              <SelectItem value='D3'>Diploma 3</SelectItem>
                              <SelectItem value='D4/S1'>Diploma 4</SelectItem>
                              <SelectItem value='S1'>Strata 1</SelectItem>
                              <SelectItem value='S2'>Strata 2</SelectItem>
                              <SelectItem value='S3'>Strata 3</SelectItem>
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
                              <SelectItem value='male'>Laki-laki</SelectItem>
                              <SelectItem value='female'>Perempuan</SelectItem>
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
                              <SelectItem value='single'>
                                belum menikah
                              </SelectItem>
                              <SelectItem value='married'>menikah</SelectItem>
                              <SelectItem value='divorced'>cerai</SelectItem>
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
                      <MultiSelect
                        options={labels}
                        onChange={handleCompetencies}
                      />
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
                          <Button
                            variant='outline'
                            onClick={() => {
                              form.resetField('certif_file')
                              form.resetField('certif_name')
                              form.resetField('issuing_organization')
                              form.resetField('issue_month')
                              form.resetField('issue_year')
                              form.resetField('expiry_month')
                              form.resetField('expiry_year')
                              form.resetField('competencyId')
                              setOpenNew(false)
                            }}
                          >
                            Batal
                          </Button>
                          <Button
                            variant='secondary'
                            onClick={() => {
                              append({
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
                              form.resetField('certif_file')
                              form.resetField('certif_name')
                              form.resetField('issuing_organization')
                              form.resetField('issue_month')
                              form.resetField('issue_year')
                              form.resetField('expiry_month')
                              form.resetField('expiry_year')
                              form.resetField('competencyId')
                              setOpenNew(false)
                            }}
                          >
                            Tambah
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className='px-2 mt-2'>
                        {fields.map((item, index) => {
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
                                onClick={() => remove(index)}
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
        <button
          className={cn(
            'py-2 px-3 h-fit text-dark rounded-lg text-sm bg-dark/10 border border-transparent',
            step === totalSteps &&
              'bg-blue-primary border-blue-darker text-white'
          )}
        >
          Simpan
        </button>
        {step !== totalSteps && (
          <button
            type={step === 1 ? 'submit' : 'button'}
            onClick={nextStep}
            className='py-2 px-3 h-fit border border-blue-darker text-white bg-blue-primary rounded-lg text-sm'
          >
            Selanjutnya
          </button>
        )}
      </div>
    </div>
  )
}
