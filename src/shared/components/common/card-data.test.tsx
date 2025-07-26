import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CardData from './card-data'

describe('<CardData />', () => {
	it('renders title and value correctly', () => {
		render(<CardData title='Total Users' value={42} />)
		expect(screen.getByText('Total Users')).toBeInTheDocument()
		expect(screen.getByText('42')).toBeInTheDocument()
	})

	it('renders title even if value is undefined', () => {
		render(<CardData title='No Value' />)
		expect(screen.getByText('No Value')).toBeInTheDocument()
	})

	it('applies custom classNames from style prop', () => {
		render(
			<CardData
				title='Styled'
				value='123'
				style={{
					wrapper: 'bg-red-100',
					title: 'text-blue-500',
					value: 'text-green-700',
				}}
			/>
		)

		const wrapper = screen.getByText('Styled').closest('div')
		expect(wrapper).toHaveClass('bg-red-100')

		expect(screen.getByText('Styled')).toHaveClass('text-blue-500')
		expect(screen.getByText('123')).toHaveClass('text-green-700')
	})
})
