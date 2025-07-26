import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { CalendarV2 } from './calendar-v2'

describe('<CalendarV2 />', () => {
	it('renders month name correctly', () => {
		render(<CalendarV2 monthIndex={0} />)
		expect(screen.getByText(/januari/i)).toBeInTheDocument()
	})

	it('renders days of the week in Indonesian', () => {
		render(<CalendarV2 monthIndex={0} />)
		const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
		days.forEach((day) => {
			expect(screen.getByText(day)).toBeInTheDocument()
		})
	})

	it('renders correct number of days for February 2024 (leap year)', () => {
		render(<CalendarV2 monthIndex={1} year={2024} />)
		const buttons = screen.getAllByRole('button')
		expect(buttons.length).toBe(29)
	})

	it('highlights presenceDates correctly', () => {
		render(<CalendarV2 monthIndex={0} presenceDates={[1, 5, 10]} />)

		const date5 = screen.getByRole('button', { name: '5' })
		expect(date5).toHaveClass('bg-success')
	})

	it('highlights absentDates correctly', () => {
		render(<CalendarV2 monthIndex={0} absentDates={[2, 6]} />)

		const date6 = screen.getByRole('button', { name: '6' })
		expect(date6).toHaveClass('bg-error')
	})
})
