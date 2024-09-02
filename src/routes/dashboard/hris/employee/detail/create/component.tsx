import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import useUrlState from '@ahooksjs/use-url-state'
import { Check, ChevronLeft } from 'lucide-react'
import { Fragment, ReactElement, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type FormStep = {
  title: string
  children: ReactNode
}
type StepperWrapper = {
  children: ReactElement<FormStep>[]
}

export function StepperItem({ children }: FormStep) {
  return <div>{children}</div>
}

export function StepperWrapper({ children }: StepperWrapper) {
  const navigate = useNavigate()
  const [url] = useUrlState({ path: '' })
  const [currentStep, setCurrentStep] = useState(0)

  const totalSteps = children.length
  const anySteps = currentStep < totalSteps - 1

  const handleNext = () => {
    if (anySteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <>
      <div className='fixed top-0 flex justify-center items-center w-full gap-2 h-20 bg-white border-b'>
        {children.map((child, index) => (
          <Fragment key={index}>
            <div className='flex gap-2'>
              <div
                className={cn(
                  'h-6 w-6 rounded-full border flex justify-center items-center text-white text-xs',
                  index == currentStep && 'bg-[#5463E8] border-[#5463E8]',
                  index > currentStep && 'border-gray-200 text-gray-400',
                  index < currentStep && 'bg-teal-500 border-teal-500'
                )}
              >
                {index < currentStep ? (
                  <Check className='w-4 h-4' />
                ) : (
                  index + 1
                )}
              </div>
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  index == currentStep ? 'text-gray-800' : 'text-gray-400'
                )}
              >
                {child.props.title}
              </button>
            </div>
            {index !== totalSteps - 1 && (
              <div className='w-4 h-[1px] bg-gray-200' />
            )}
          </Fragment>
        ))}
      </div>
      <div className='h-20 fixed flex justify-center items-center pl-4'>
        <Button
          variant='ghost'
          className='flex gap-1 items-center hover:bg-gray-200 rounded-md pl-1 pr-4'
          onClick={() => {
            navigate(url.path)
          }}
        >
          <ChevronLeft className='w-5 h-5 text-gray-400' />
          <p className='text-sm text-gray-500'>Kembali</p>
        </Button>
      </div>
      <div className='max-w-3xl mx-auto rounded-xl h-fit pt-24'>
        <div className='rounded-xl p-4'>{children[currentStep]}</div>
        <div className='h-fit w-full flex justify-end py-4 gap-4 px-4'>
          {anySteps ? (
            <>
              <Button
                type='submit'
                variant='outline'
                className='bg-transparent border-[#5463E8] text-[#5463E8]'
              >
                Simpan
              </Button>
              <hr className='min-h-10 bg-gray-200 w-[1px]' />
              <div className='flex gap-4 items-center'>
                <Button
                  type='button'
                  variant='outline'
                  className='bg-transparent border-[#5463E8] text-[#5463E8]'
                  onClick={handlePrevious}
                  size='sm'
                >
                  Kembali
                </Button>
                <Button type='button' onClick={handleNext} size='sm'>
                  Selanjutnya
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                type='button'
                variant='outline'
                className='bg-transparent border-[#5463E8] text-[#5463E8]'
                onClick={handlePrevious}
                size='sm'
              >
                Kembali
              </Button>
              <Button type='submit' size='sm'>
                Simpan
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
