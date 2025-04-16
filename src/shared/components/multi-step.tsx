import { Check } from 'lucide-react'
import { ReactNode } from 'react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'

import { useIsMobile } from '../hooks/use-mobile'

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
	const isMobile = useIsMobile()

	return (
		<div className='max-w-[720px] mx-auto rounded-2xl relative bg-white border border-border'>
			<div
				className={cn(
					'absolute -left-[calc(312px+24px)] w-[312px] bg-white p-6 rounded-2xl border border-border',
					isMobile
						? 'relative left-0 border-none flex w-full items-center justify-between'
						: 'space-y-4'
				)}
			>
				{steps.map((i, index) => (
					<div
						key={index}
						className={cn(
							'grid grid-cols-[32px_1fr] gap-4 items-center',
							isMobile && index !== currentStep && 'hidden'
						)}
					>
						<div
							className={cn(
								'w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center relative shadow text-ink-light',
								!isMobile &&
									index === currentStep &&
									'bg-brand text-white border-brand',
								!isMobile &&
									index < currentStep &&
									'bg-success border-success text-white pt-0.5',
								isMobile && 'shadow-none'
							)}
						>
							{index < currentStep ? (
								<Check size={16} strokeWidth={3} />
							) : (
								i.icon || index + 1
							)}
							{!isMobile && index < steps.length - 1 && (
								<div className='absolute h-8 border border-ink-light/40 border-dashed top-full' />
							)}
						</div>
						<p
							className={cn(
								!isMobile && index === currentStep
									? 'text-brand'
									: 'text-ink-secondary'
							)}
						>
							{i.title}
						</p>
					</div>
				))}
				{isMobile && (
					<p className='font-semibold text-ink-primary text-lg'>
						{currentStep + 1}
						<span className='font-normal text-ink-light text-sm'>
							/{steps.length}
						</span>
					</p>
				)}
			</div>

			<div key={currentStep}>{steps[currentStep].content}</div>

			<div className='flex justify-end gap-4 p-4 bg-surface-secondary border-t border-border rounded-b-2xl'>
				<Button onClick={onBack} disabled={currentStep === 0}>
					Back
				</Button>
				<Button onClick={isLastStep ? onFinish : onNext}>
					{isLastStep ? 'Finish' : 'Next'}
				</Button>
			</div>
		</div>
	)
}
