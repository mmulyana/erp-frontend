import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import ToggleSwitch from './toggle-switch'

describe('<ToggleSwitch />', () => {
	it('renders with correct label', () => {
		render(<ToggleSwitch label={{ true: 'On', false: 'Off' }} value={true} />)
		expect(screen.getByText('On')).toBeInTheDocument()
	})

	it('calls onCheck with correct value', async () => {
		const onCheck = vi.fn()
		render(<ToggleSwitch value={false} onCheck={onCheck} />)

		const toggle = screen.getByRole('switch')
		await userEvent.click(toggle)

		expect(onCheck).toHaveBeenCalledWith(true)
	})

	it('respects disabled state', async () => {
		const onCheck = vi.fn()
		render(<ToggleSwitch value={false} onCheck={onCheck} disabled />)

		const toggle = screen.getByRole('switch')
		await userEvent.click(toggle)

		expect(onCheck).not.toHaveBeenCalled()
	})
})
