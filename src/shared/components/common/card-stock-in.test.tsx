import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import CardStockIn from './card-stock-in'

const mockData = {
	id: 'abc123',
	supplierId: 'supplier-1',
	createdBy: 'user-1',
	referenceNumber: 'REF-001',
	note: '',
	date: new Date('2024-04-10'),
	totalPrice: 100000,
	photoUrl: 'uploads/foto.jpg',
	createdAt: '',
	updatedAt: '',
	_count: {
		items: 5,
	},
	user: {
		id: 'user-1',
		username: 'John Doe',
		photoUrl: 'users/john.jpg',
		email: 'john@example.com',
	},
	supplier: undefined,
	items: [{ id: 'item-1' }, { id: 'item-2' }, { id: 'item-3' }],
}

describe('<CardStockIn />', () => {
	it('renders formatted date', () => {
		render(<CardStockIn data={mockData as any} />, { wrapper: MemoryRouter })
		expect(screen.getByText(/10 April 2024/i)).toBeInTheDocument()
	})

	it('renders reference number', () => {
		render(<CardStockIn data={mockData as any} />, { wrapper: MemoryRouter })
		expect(screen.getByText('REF-001')).toBeInTheDocument()
	})

	it('renders total items count', () => {
		render(<CardStockIn data={mockData as any} />, { wrapper: MemoryRouter })
		expect(screen.getByText(String(mockData.items.length))).toBeInTheDocument()
	})

	it('renders "Lihat transaksi" link with correct URL', () => {
		render(<CardStockIn data={mockData as any} />, { wrapper: MemoryRouter })
		const link = screen.getByRole('link', { name: /lihat transaksi/i })
		expect(link).toHaveAttribute('href', `/inventory/stock-in/${mockData.id}`)
	})

	it('renders photo link when photoUrl is provided', () => {
		render(<CardStockIn data={mockData as any} />, { wrapper: MemoryRouter })
		const photoLink = screen.getByRole('link', { name: /lihat foto/i })
		expect(photoLink).toHaveAttribute(
			'href',
			expect.stringContaining(mockData.photoUrl!)
		)
	})

	it('renders user information', () => {
		render(<CardStockIn data={mockData as any} />, { wrapper: MemoryRouter })
		expect(screen.getByText('John Doe')).toBeInTheDocument()
	})
})
