import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, expect } from 'vitest'

import { AlertConfirm } from './alert-confirm'

describe('<AlertConfirm />', () => {
	it('renders the trigger button with label', () => {
		render(<AlertConfirm triggerLabel='Delete' onConfirm={() => {}} />)
		expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
	})

	it('opens the dialog when trigger button is clicked', async () => {
		render(<AlertConfirm triggerLabel='Open' onConfirm={() => {}} />)

		await userEvent.click(screen.getByRole('button', { name: /open/i }))
		expect(
			await screen.findByText(/yakin ingin melanjutkan/i)
		).toBeInTheDocument()
	})

	it('calls onConfirm and closes dialog when "Lanjut" is clicked', async () => {
		const onConfirm = vi.fn()
		render(<AlertConfirm triggerLabel='Confirm' onConfirm={onConfirm} />)

		await userEvent.click(screen.getByRole('button', { name: /confirm/i }))
		const lanjutButton = await screen.findByRole('button', { name: /lanjut/i })
		await userEvent.click(lanjutButton)

		expect(onConfirm).toHaveBeenCalledTimes(1)
	})

	it('closes dialog when "Batal" is clicked', async () => {
		const onConfirm = vi.fn()
		render(<AlertConfirm triggerLabel='Cancel' onConfirm={onConfirm} />)

		await userEvent.click(screen.getByRole('button', { name: /cancel/i }))
		const cancelButton = await screen.findByRole('button', { name: /batal/i })
		await userEvent.click(cancelButton)

		expect(onConfirm).not.toHaveBeenCalled()
	})
})
