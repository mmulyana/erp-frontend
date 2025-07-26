import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '.env.local') })

export default defineConfig({
	testDir: 'e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: 1,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:5173',
		trace: 'on',
		ignoreHTTPSErrors: true,
		testIdAttribute: 'data-testid',
	},
	timeout: 60 * 1000,

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],

	expect: {
		timeout: 10 * 1000,
	},

	webServer: {
		command: 'pnpm dev',
		url: 'http://localhost:5173',
		timeout: 120000,
		reuseExistingServer: !process.env.CI,
	},
})
