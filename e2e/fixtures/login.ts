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
}
