export default class fetchOptions {
  public data: any

  constructor(method: string, body: any, type: string = 'application/json') {
    this.data = {
      method: method || 'GET',
      headers: {
        'Content-type': type,
      },
      body: body,
    }
  }

  addToken(token: string) {
    this.data.headers.Authorization = 'Bearer ' + token
  }
}
