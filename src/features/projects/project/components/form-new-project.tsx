import { UseFormReturn } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'

import UserCombobox from '@/features/user/components/user-combobox'

import { EditorDescription } from '@/shared/components/common/tiptap/editor-description'
import { MultiStep } from '@/shared/components/common/multi-step'
import { atomProgress } from '@/shared/store/progress'
import { Input } from '@/shared/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'

import ClientCombobox from '../../client/components/client-combobox'
import { ProjectForm } from '../types'
import AssignedEmployeeProject from './employees/assigned-employee-project'

type props = {
	form: UseFormReturn<ProjectForm>
	onSubmit: (data: ProjectForm) => void
}

export default function FormNewProject({ form, onSubmit }: props) {
	const setProgress = useSetAtom(atomProgress)
	const [step, setStep] = useState(0)

	const steps = [
		{
			title: 'Info',
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
										<UserCombobox onSelect={field.onChange} />
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
					<div className='p-10'>
						<AssignedEmployeeProject form={form} />
					</div>
				</>
			),
		},
	]

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

	return (
		<div className='p-6'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<MultiStep
						steps={steps}
						currentStep={step}
						onNext={handleNext}
						onBack={handleBack}
					/>
				</form>
			</Form>
		</div>
	)
}
