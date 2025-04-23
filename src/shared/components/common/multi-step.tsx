import { ReactNode } from 'react'

import { Button } from '@/shared/components/ui/button'

import { useIsMobile } from '../../hooks/use-mobile'

type Step = {
	title: string
	content: ReactNode
	icon?: ReactNode
}

type MultiStepProps = {
	steps: Step[]
	currentStep: number
	onNext: () => void
	onBack: () => void
	onFinish?: () => void
}

export function MultiStep({
	steps,
	currentStep,
	onNext,
	onBack,
	onFinish,
}: MultiStepProps) {
	const isLastStep = currentStep === steps.length - 1

	return (
		<div className='max-w-[800px] mx-auto rounded-2xl relative bg-white border border-border'>
			<div key={currentStep}>{steps[currentStep].content}</div>

			<div className='flex gap-4 p-4 bg-surface-secondary border-t border-border rounded-b-2xl'>
				{currentStep > 0 && (
					<Button
						onClick={onBack}
						disabled={currentStep === 0}
						variant='outline'
						type='button'
					>
						Kembali
					</Button>
				)}
				<div className='ml-auto gap-4 flex'>
					<Button type='button' onClick={isLastStep ? onFinish : onNext}>
						{isLastStep ? 'Simpan' : 'Selanjutnya'}
					</Button>
				</div>
			</div>
		</div>
	)
}
