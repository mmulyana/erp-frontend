export function formatPhone(number: string) {
  const cleanNumber = number.replace(/\D/g, '')

  if (cleanNumber.length === 11) {
    return cleanNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  } else if (cleanNumber.length === 12) {
    return cleanNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')
  } else if (cleanNumber.length === 13) {
    return cleanNumber.replace(/(\d{4})(\d{4})(\d{5})/, '$1-$2-$3')
  } else {
    return cleanNumber.match(/.{1,4}/g)?.join('-') || cleanNumber
  }
}
