import { RadioV1 } from '@/components/common/radio-v1'
import {
  navigationParams,
  Stepper,
  StepperItem,
} from '@/components/common/stepper-v1'
import UploadProfile from '@/components/common/upload-profile'
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
import { useCreateEmployee } from '@/hooks/api/use-employee'
import { cn } from '@/utils/cn'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: string
}
export default function AddEmployee({ open, setOpen, id }: Props) {
  const [preview, setPreview] = useState<string | null>(null)

  // HANDLE FORM
  const { mutate } = useCreateEmployee()
  const [newUser, setNewUser] = useState<any>(null)

  const form = useForm({
    defaultValues: {
      photo: null as File | null,
      fullname: '',
      joined_at: '',
      joined_type: 'date',
      employment_type: 'permanent',
      last_education: '',
      gender: '',
      place_of_birth: '',
      birth_date: '',
      marital_status: '',
      religion: '',
      basic_salary: '',
      pay_type: 'daily',
      overtime_salary: '',
      positionId: id,
    },
  })
  console.log(newUser)

  const onSubmit = async (data: any) => {
    mutate({ data }, { onSuccess: (data) => setNewUser(data.data.data) })
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
                  <ScrollArea className='h-[calc(100vh-244px)] border px-2'>
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
                              <SelectValue placeholder='Pilih pend. terakhir' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='SD'>SD</SelectItem>
                              <SelectItem value='SMP'>SMP</SelectItem>
                              <SelectItem value='SMA/SMK'>SMA/SMK</SelectItem>
                              <SelectItem value='D1'>Diploma 1</SelectItem>
                              <SelectItem value='D2'>Diploma 2</SelectItem>
                              <SelectItem value='D3'>Diploma 3</SelectItem>
                              <SelectItem value='D4/S1'>
                                Diploma 4/Strata 1
                              </SelectItem>
                              <SelectItem value='S2'>Strata 2</SelectItem>
                              <SelectItem value='S3'>Strata 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <FormField
                          control={form.control}
                          name='gender'
                          label='Jenis kelamin'
                          render={({ field }) => (
                            <Input type='text' {...field} />
                          )}
                        />
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
                    </div>
                  </ScrollArea>
                </div>
              </StepperItem>
              <StepperItem label='Gaji'>
                <div>
                  <StepHeader step={1} title='Gaji' />
                  <ScrollArea className='h-[56vh] px-2'>
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
            type='button'
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
