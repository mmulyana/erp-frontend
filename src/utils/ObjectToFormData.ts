export function objectToFormData(
  obj: Record<string, string | File | string[] | number | null>
) {
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]) => {
    if (value != null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item != null) {
            formData.append(key, item)
          }
        })
      } else {
        formData.append(key, String(value))
      }
    }
  })

  return formData
}
