import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import ButtonSubmit from './button-submit'

describe('<ButtonSubmit />', () => {
	it('shows default title when not pending', () => {
		render(<ButtonSubmit isPending={false} />)
		const button = screen.getByRole('button', { name: /simpan/i })

		expect(button).toBeInTheDocument()
		expect(button).toHaveAttribute('type', 'submit')
		expect(button).not.toBeDisabled()
	})

	it('shows custom title when not pending', () => {
		render(<ButtonSubmit isPending={false} title='Update' />)
		expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument()
	})

	it('shows loading state when pending', () => {
		render(<ButtonSubmit isPending={true} />)

		const button = screen.getByRole('button', { name: /menyimpan/i })
		expect(button).toBeDisabled()
		expect(screen.getByText(/menyimpan/i)).toBeInTheDocument()

		expect(button.querySelector('svg')).toBeTruthy()
	})
})
