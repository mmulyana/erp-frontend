import React, { Children, Fragment, ReactElement } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { atom, useAtom, useAtomValue } from 'jotai'

export const stepperAtom = atom<number>(0)

export type navigationParams = {
  setStep: (val: number) => void
  step: number
  nextStep: () => void
  prevStep: () => void
  totalSteps: number
}
type StepperProps = {
  children: React.ReactNode
  hideStepper?: boolean
  navigation?: (params: navigationParams) => React.ReactNode
}

type StepperItemProps = {
  label: string
  children: React.ReactNode
}

export const Stepper = ({
  children,
  navigation,
  hideStepper,
}: StepperProps) => {
  const [currentStep, setCurrentStep] = useAtom(stepperAtom)

  const steps = Children.toArray(children) as ReactElement<StepperItemProps>[]

  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStep(index)
    }
  }

  const nextStep = () => goToStep(currentStep + 1)
  const prevStep = () => goToStep(currentStep - 1)

  return (
    <div className='w-full max-w-2xl mx-auto'>
      {!hideStepper && (
        <div className='flex justify-between items-center px-4 pt-4'>
          {steps.map((step, index) => (
            <Fragment key={index}>
              <StepIndicator
                label={step.props.label}
                stepIndex={index}
                onClick={() => goToStep(index)}
              />
              {index < steps.length - 1 && (
                <Connector completed={index < currentStep} />
              )}
            </Fragment>
          ))}
        </div>
      )}
      {steps[currentStep]}
      {navigation ? (
        navigation({
          setStep: setCurrentStep,
          nextStep,
          prevStep,
          step: currentStep,
          totalSteps: steps.length - 1,
        })
      ) : (
        <div
          className={cn(
            'mt-4 flex justify-between items-center',
            currentStep === 0 && 'justify-end'
          )}
        >
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className='py-2 px-3 h-fit border border-line text-dark rounded-lg text-sm bg-white'
            >
              Sebelumnya
            </button>
          )}
          <button
            onClick={nextStep}
            className='py-2 px-3 h-fit border border-blue-darker text-white bg-blue-primary rounded-lg text-sm'
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  )
}

type StepIndicatorProps = {
  label: string
  stepIndex: number
  onClick: () => void
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  label,
  stepIndex,
  onClick,
}) => {
  const currentStep = useAtomValue(stepperAtom)
  const completed = stepIndex < currentStep
  const active = stepIndex === currentStep

  return (
    <div
      className='flex flex-col items-center cursor-pointer'
      onClick={onClick}
    >
      <div
        className={cn(
          'w-fit h-fit rounded-full flex items-center justify-center gap-1 p-1 pr-2',
          completed
            ? 'border-[1.5px] border-[#5463E8]'
            : active
            ? 'border-[1.5px] border-[#5463E8] text-dark'
            : 'border-[1.5px] border-line text-dark/70'
        )}
      >
        <div
          className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center border',
            completed
              ? 'bg-green-primary border-green-primary'
              : active
              ? 'bg-[#5463E8] border-[#5463E8]'
              : 'border-line'
          )}
        >
          {completed ? (
            <Check className='text-white w-4 h-4 font-bold stroke-[3px]' />
          ) : (
            <p
              className={cn(
                'text-sm leading-none pb-0.5',
                active ? 'text-white' : 'text-dark/70'
              )}
            >
              {stepIndex + 1}
            </p>
          )}
        </div>
        <span className={cn('text-sm')}>{label}</span>
      </div>
    </div>
  )
}

type ConnectorProps = {
  completed: boolean
}

export const Connector = ({ completed }: ConnectorProps) => (
  <div
    className={cn(
      'flex-1 h-[1.5px]',
      completed ? 'bg-[#5463E8]' : 'bg-gray-300'
    )}
  />
)

export const StepperItem = ({ children }: StepperItemProps) => {
  return <div>{children}</div>
}
