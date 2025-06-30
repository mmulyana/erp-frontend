export const loginFixtures = {
	validPhone: '087871233321',
	validPassword: 'validPassword123',
	invalidPhone: '087871233322',
	invalidPassword: 'wrongPassword123',
	invalidCredentialsResponse: {
		code: 'INVALID_CREDENTIALS',
		message: 'Kredensial salah',
		status: 400,
	},
	token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwMmE0NDkwLTY3YTAtNDU2Mi1iMTZhLTY4YmMwMjFiZjY1YyIsImlhdCI6MTc1MzIzNzIwN30.7sgjC5dHXHGm4WBLMFho-tlMaFIW5AgqJJgy2DwAlFo',
}
