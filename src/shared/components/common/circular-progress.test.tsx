import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import CircularProgress from './circular-progress'

describe('<CircularProgress />', () => {
	it('renders with default props and shows 40%', () => {
		render(<CircularProgress progress={40} />)
		expect(screen.getByText('40%')).toBeInTheDocument()
	})

	it('renders with custom progress and shows correct percentage', () => {
		render(<CircularProgress progress={75} />)
		expect(screen.getByText('75%')).toBeInTheDocument()
	})

	it('renders SVG with correct size', () => {
		const { container } = render(<CircularProgress progress={50} size={32} />)
		const svg = container.querySelector('svg')
		expect(svg).toHaveAttribute('width', '32')
		expect(svg).toHaveAttribute('height', '32')
	})

	it('applies correct stroke colors', () => {
		const circleColor = '#CCCCCC'
		const progressColor = '#00FF00'
		const { container } = render(
			<CircularProgress
				progress={50}
				circleColor={circleColor}
				progressColor={progressColor}
			/>
		)
		const circles = container.querySelectorAll('circle')
		expect(circles[0]).toHaveAttribute('stroke', circleColor)
		expect(circles[1]).toHaveAttribute('stroke', progressColor)
	})

	it('calculates correct strokeDashoffset', () => {
		const progress = 25
		const size = 100
		const strokeWidth = 10
		const radius = (size - strokeWidth) / 2
		const circumference = 2 * Math.PI * radius
		const expectedOffset = circumference - (progress / 100) * circumference

		const { container } = render(
			<CircularProgress
				progress={progress}
				size={size}
				strokeWidth={strokeWidth}
			/>
		)

		const progressCircle = container.querySelectorAll('circle')[1]
		expect(progressCircle).toHaveAttribute(
			'stroke-dashoffset',
			expectedOffset.toString()
		)
	})
})
