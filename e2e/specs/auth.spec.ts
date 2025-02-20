import { test, expect } from '@playwright/test'

import { loginFixtures } from 'e2e/fixtures/login'
import { testIds } from '@/utils/constant/_testId'

import invalidCredential from '../mocks/login/invalidCredential.json' assert { type: 'json' }
import accountNotExist from '../mocks/login/accountNotExist.json' assert { type: 'json' }
import successLogin from '../mocks/login/successLogin.json' assert { type: 'json' }
import invalidLogin from '../mocks/login/invalid.json' assert { type: 'json' }

test.describe('authentication', () => {
	let submitBtn: any
	let phoneInput: any
	let passwordInput: any

	test.beforeEach(async ({ page }) => {
		await page.goto('/')

		submitBtn = page.getByTestId(testIds.loginButtonSubmit)
		phoneInput = page.getByTestId(testIds.loginInputPhone)
		passwordInput = page.getByTestId(testIds.loginInputPassword)
	})

	test('should show error if required fields is empty', async ({ page }) => {
		await page.route('**/api/auth/login', async (route) => {
			await route.fulfill({
				status: 400,
				body: JSON.stringify(invalidLogin),
			})
		})

		await submitBtn.click()

		await expect(page.getByText('Password harus diisi')).toBeVisible()
		await passwordInput.fill(loginFixtures.invalidPassword)
		await expect(page.getByText('Password harus diisi')).toBeHidden()

		await submitBtn.click()

		await expect(page.getByText('Minimal isi salah satu')).toBeVisible()
	})

	test('should show error if invalid credentials', async ({ page }) => {
		await page.route('**/api/auth/login', async (route) => {
			await route.fulfill({
				status: 400,
				body: JSON.stringify(invalidCredential),
			})
		})

		await phoneInput.fill(loginFixtures.validPhone)
		await passwordInput.fill(loginFixtures.invalidPassword)

		await submitBtn.click()
		await expect(page.getByText('Kredensial salah')).toBeVisible()
	})

	test('should show error if not registered', async ({ page }) => {
		await page.route('**/api/auth/login', async (route) => {
			await route.fulfill({
				status: 400,
				body: JSON.stringify(accountNotExist),
			})
		})

		await phoneInput.fill(loginFixtures.invalidPhone)
		await passwordInput.fill(loginFixtures.invalidPassword)

		await submitBtn.click()
		await expect(page.getByText('akun tidak ada')).toBeVisible()
	})

	test('should show success when fields is filled and registered', async ({
		page,
	}) => {
		await page.route('**/api/auth/login', async (route) => {
			await route.fulfill({
				status: 200,
				body: JSON.stringify(successLogin),
			})
		})

		await phoneInput.fill(loginFixtures.validPhone)
		await passwordInput.fill(loginFixtures.validPassword)

		await submitBtn.click()
		await expect(
			page.getByText('Selamat datang kembali', { exact: true })
		).toBeVisible()
	})

	test.afterEach(async ({ page }) => {
		await page.unroute('**/api/auth/login')
	})
})
