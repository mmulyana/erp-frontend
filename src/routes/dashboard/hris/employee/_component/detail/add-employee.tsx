import { Stepper, StepperItem } from '@/components/common/stepper-v1'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { cn } from '@/utils/cn'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function AddEmployee({ open, setOpen }: Props) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='max-w-[512px] p-0'>
        <div className='h-12 w-full flex gap-2 items-center border-b border-line'></div>
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
                    step === totalSteps && 'bg-blue-primary border-blue-darker text-white'
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
            <p>Test 1</p>
          </StepperItem>
          <StepperItem label='Gaji'>
            <p>Test 2</p>
          </StepperItem>
          <StepperItem label='Sertifikat'>
            <p>Test 3</p>
          </StepperItem>
        </Stepper>
      </SheetContent>
    </Sheet>
  )
}
