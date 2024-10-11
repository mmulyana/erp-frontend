import { RadioV1 } from '@/components/common/radio-v1'
import { Stepper, StepperItem } from '@/components/common/stepper-v1'
import UploadProfile from '@/components/common/upload-profile'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs'
import { cn } from '@/utils/cn'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function AddEmployee({ open, setOpen }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const form = useForm({
    defaultValues: {
      photo: null as File | null,
      fullname: '',
      joinedAt: '',
      type: 'permanent',
    },
  })

  const onSubmit = async (data: any) => {
    console.log(data)
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='max-w-[512px] p-0'>
        <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
          <p className='text-sm text-dark'>Pegawai baru</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stepper
              navigation={({ nextStep, prevStep, step, totalSteps }) => (
                <div
                  className={cn(
                    'mt-4 flex justify-between items-center px-4',
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
              )}
            >
              <StepperItem label='Umum'>
                <div>
                  <StepHeader step={1} title='Umum' />
                  <ScrollArea className='h-[56vh] px-4'>
                    <div className='flex flex-col gap-4 pt-4'>
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
                            name='joinedAt'
                            label='Tanggal bergabung'
                            render={({ field }) => (
                              <Input className='block' type='date' {...field} />
                            )}
                          />
                        </TabsContent>
                        <TabsContent value='year'>
                          <FormField
                            control={form.control}
                            name='joinedAt'
                            label='Tahun bergabung'
                            render={({ field }) => (
                              <Input type='number' {...field} />
                            )}
                          />
                        </TabsContent>
                      </Tabs>
                      <Controller
                        name='type'
                        control={form.control}
                        rules={{ required: 'Please select a gender' }}
                        render={({ field, fieldState: { error } }) => (
                          <div className='space-y-2'>
                            <Label>Status Pegawai</Label>
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
                            {error && (
                              <p className='text-red-500 text-sm'>
                                {error.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </ScrollArea>
                </div>
              </StepperItem>
              <StepperItem label='Gaji'>
                <div className='flex flex-col'>
                  <StepHeader step={2} title='Gaji' />
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
