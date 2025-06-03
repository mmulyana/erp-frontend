import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { loadEnv } from 'vite'

const env = loadEnv(process.env.MODE || '', process.cwd(), '')

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './test/vitest.setup.ts',
		include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
		exclude: ['node_modules', 'e2e'],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	define: {
		'import.meta.env': env,
	},
})
