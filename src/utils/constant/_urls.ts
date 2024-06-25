const BASE_URL = import.meta.env.VITE_BASE_URL
const V1 = BASE_URL + '/api/v1'

export const URLS = {
  LOGIN: V1 + '/auth/login',
  REGISTER: V1 + '/auth/register',
  CHECK_EMAIL: V1 + '/auth/check/email',
  CHECK_NAME: V1 + '/auth/check/name',
  ACCOUNT: V1 + '/account',
}
