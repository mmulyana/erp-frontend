import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ProgressPercentage from './progress-percentage'

describe('<ProgressPercentage />', () => {
	it('renders the correct percentage text', () => {
		render(<ProgressPercentage percentage={75} />)
		expect(screen.getByText('75%')).toBeInTheDocument()
	})

	it('applies default width correctly', () => {
		render(<ProgressPercentage percentage={50} />)
		const outerBar = screen.getByRole('progressbar-container')
		expect(outerBar).toHaveStyle('width: 120px')
	})

	it('applies custom width if given', () => {
		render(<ProgressPercentage percentage={40} width='200px' />)
		const outerBar = screen.getByRole('progressbar-container')
		expect(outerBar).toHaveStyle('width: 200px')
	})

	it('applies correct inner bar width based on percentage', () => {
		render(<ProgressPercentage percentage={30} />)
		const innerBar = screen.getByRole('progressbar-inner')
		expect(innerBar).toHaveStyle('width: 30%')
	})
})
