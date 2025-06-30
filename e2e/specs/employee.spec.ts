import { test, expect } from '@playwright/test'

import errorResponse from '../mocks/employee/error.json' assert { type: 'json' }
import successResponse from '../mocks/employee/success.json' assert { type: 'json' }
import meResponse from '../mocks/me/index.json' assert { type: 'json' }

import { testIds } from '@/shared/constants/testId'
import { loginFixtures } from 'e2e/fixtures/login'

test.describe('create new employee', () => {
	test.beforeEach(async ({ page }) => {
		await page.context().addCookies([
			{
				name: 'authToken',
				value: loginFixtures.token,
				domain: 'localhost',
				path: '/',
			},
		])

		await page.route('**/api/auth/me', async (route) => {
			await route.fulfill({
				status: 200,
				body: JSON.stringify(meResponse),
			})
		})
	})

	test('should navigate to new employee form', async ({ page }) => {
		await page.goto('/hris/masterdata/employee')

		const actionButton = page.getByRole('link', { name: /Tambah/i })
		await expect(actionButton).toBeVisible()
		await actionButton.click()

		await expect(page).toHaveURL('/hris/masterdata/new-employee')
	})

	test('should show validation error if name not filled', async ({ page }) => {
		await page.goto('/hris/masterdata/new-employee')

		const saveButton = page.getByRole('button', { name: /Simpan/i })
		await expect(saveButton).toBeVisible()
		await saveButton.click()

		await page.route('**/api/employee', async (route) => {
			await route.fulfill({
				status: 400,
				body: JSON.stringify(errorResponse),
			})
		})

		const errorMessage = page
			.getByText('Nama pegawai tidak boleh kosong')
			.first()
		await expect(errorMessage).toBeVisible()
	})

	test('should successfully fill and submit employee name', async ({
		page,
	}) => {
		await page.goto('/hris/masterdata/new-employee')

		const nameInput = page.getByTestId(testIds.inputNameEmployee)
		const saveButton = page.getByRole('button', { name: /Simpan/i })

		await page.route('**/api/employee', async (route) => {
			await route.fulfill({
				status: 200,
				body: JSON.stringify(successResponse),
			})
		})

		await expect(nameInput).toBeVisible()
		await nameInput.fill('mulmul')

		await saveButton.click()

		await expect(page.getByText('pegawai berhasil ditambahkan')).toBeVisible()
	})

	test.afterEach(async ({ page }) => {
		await page.unroute('**/api/auth/login')
	})
})
