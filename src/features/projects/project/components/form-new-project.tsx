import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { EditorDescription } from '@/shared/components/common/tiptap/editor-description'
import EmployeeCombobox from '@/shared/components/combobox/employee-combobox'
import { MultiStep } from '@/shared/components/common/multi-step'
import { Input } from '@/shared/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import { useSetAtom } from 'jotai'
import { atomProgress } from '@/shared/store/progress'
import ClientCombobox from '../../client/components/client-combobox'

export default function FormNewProject() {
	const [step, setStep] = useState(0)

	const setProgress = useSetAtom(atomProgress)
	useEffect(() => {
		const initialProgress = ((step + 1) / steps.length) * 100
		setProgress(initialProgress)

		return () => setProgress(0)
	}, [])

	const handleNext = () => {
		setStep((prev) => {
			const nextStep = prev + 1
			const percent = ((nextStep + 1) / steps.length) * 100
			setProgress(percent)
			return nextStep
		})
	}

	const handleBack = () => {
		setStep((prev) => {
			const prevStep = prev - 1
			const percent = ((prevStep + 1) / steps.length) * 100
			setProgress(percent)
			return prevStep
		})
	}

	const form = useForm()

	const steps = [
		{
			title: 'Info',
			// icon: <User2 size={16} />,
			content: (
				<>
					<FormField
						name='name'
						control={form.control}
						render={({ field }) => (
							<FormItem className='border-b border-border p-10 flex justify-between items-start flex-col md:flex-row gap-2 md:gap-0'>
								<div>
									<FormLabel className='text-ink-primary text-base font-normal'>
										Nama Proyek<span className='text-error'>*</span>
									</FormLabel>
								</div>
								<div className='w-full md:w-1/2'>
									<FormControl>
										<Input
											{...field}
											className='bg-surface-secondary w-full'
											placeholder='Nama'
										/>
									</FormControl>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						name='description'
						control={form.control}
						render={({ field }) => (
							<FormItem className='border-b border-border p-10 flex justify-between items-start flex-col gap-2 md:gap-0'>
								<div>
									<FormLabel className='text-ink-primary text-base font-normal'>
										Deskripsi
									</FormLabel>
								</div>
								<div className='w-full '>
									<FormControl>
										<EditorDescription
											content={field.value}
											onChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-10'>
						<FormField
							name='leadId'
							control={form.control}
							render={({ field }) => (
								<FormItem className=''>
									<FormLabel className='text-ink-primary text-base font-normal'>
										Penanggung Jawab Lapangan
									</FormLabel>
									<FormControl>
										<EmployeeCombobox onSelect={field.onChange} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='clientId'
							control={form.control}
							render={({ field }) => (
								<FormItem className=''>
									<FormLabel className='text-ink-primary text-base font-normal'>
										User/klien
									</FormLabel>
									<FormControl>
										<ClientCombobox onSelect={field.onChange} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</>
			),
		},
		{
			title: 'Pegawai',
			content: (
				<>
					<div className='p-10'></div>
				</>
			),
		},
	]

	return (
		<div className='p-6'>
			<Form {...form}>
				<MultiStep
					steps={steps}
					currentStep={step}
					onNext={handleNext}
					onBack={handleBack}
					// onFinish={() => form.handleSubmit(onCreate)()}
				/>
			</Form>
		</div>
	)
}
