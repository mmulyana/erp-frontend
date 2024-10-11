import { Stepper, StepperItem } from '@/components/common/stepper-v1'
import UploadProfile from '@/components/common/upload-profile'
import { Form } from '@/components/ui/form'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/utils/cn'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function AddEmployee({ open, setOpen }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const form = useForm({
    defaultValues: {
      photo: null as File | null,
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
                    'mt-4 flex justify-between items-center',
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
                <div className='flex flex-col gap-4'>
                  <StepHeader step={1} title='Umum' />
                  <UploadProfile
                    name='photo'
                    preview={preview}
                    setPreview={setPreview}
                  />
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
    <div className='mt-8 pb-1.5 border-b border-line'>
      <p className='text-sm text-dark/50'>Tahap {step}</p>
      <p className='text-dark font-semibold mt-2'>{title}</p>
    </div>
  )
}
