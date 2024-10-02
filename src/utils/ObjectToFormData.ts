export function objectToFormData(
  obj: Record<string, string | File | string[] | null>
) {
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]) => {
    if (value != null) {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item != null) {
            formData.append(`${key}[${index}]`, item)
          }
        })
      } else {
        formData.append(key, value)
      }
    }
  })

  return formData
}
