import { CookieKeys, CookieStorage } from './cookie'

export default class fetchOptions {
  public data: any

  constructor(method: string, body?: any, type: string = 'application/json') {
    this.data = {
      method: method || 'GET',
      headers: {
        'Content-type': type,
      },
      body: body,
    }
  }

  addToken() {
    const token = CookieStorage.get(CookieKeys.AuthToken)
    this.data.headers.Authorization = 'Bearer ' + token
  }
}
