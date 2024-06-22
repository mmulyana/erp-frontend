export default class fetchOptions {
  public data

  constructor(method: string, body: any, type: string = 'application/json') {
    this.data = {
      method: method || 'GET',
      headers: {
        'Content-type': type,
      },
      body: body,
    }
  }
}
