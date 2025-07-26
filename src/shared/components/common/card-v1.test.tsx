import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import CardV1 from './card-v1'

describe('<CardV1 />', () => {
	it('renders title', () => {
		render(<CardV1 title='Dashboard' />)
		expect(screen.getByText('Dashboard')).toBeInTheDocument()
	})

	it('renders icon if provided', () => {
		render(
			<CardV1 title='With Icon' icon={<span data-testid='icon'>🔥</span>} />
		)
		expect(screen.getByTestId('icon')).toBeInTheDocument()
	})

	it('renders count if provided', () => {
		render(<CardV1 title='Notifications' count={5} />)
		expect(screen.getByText('5')).toBeInTheDocument()
	})

	it('renders children content', () => {
		render(<CardV1 title='Content' children={<div>Body Content</div>} />)
		expect(screen.getByText('Body Content')).toBeInTheDocument()
	})

	it('renders footer if provided', () => {
		render(<CardV1 title='Card' footer={<div>Footer Section</div>} />)
		expect(screen.getByText('Footer Section')).toBeInTheDocument()
	})

	it('renders action if provided', () => {
		render(<CardV1 title='Card' action={<button>Click</button>} />)
		expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument()
	})

	it('applies custom styles from props', () => {
		render(
			<CardV1
				dataTestId='card-v1'
				title='Styled'
				style={{ card: 'bg-red-100' }}
			>
				<div>Content</div>
			</CardV1>
		)

		const card = screen.getByTestId('card-v1')
		expect(card).toHaveClass('bg-red-100')
	})
})
