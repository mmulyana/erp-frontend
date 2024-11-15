export function objectToFormData(
  obj: Record<string, string | File | File[] | string[] | number | number[] | null>
) {
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]) => {
    if (value != null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item instanceof File) {
            formData.append(key, item)
          } else if (item != null) {
            formData.append(key, String(item))
          }
        })
      } else if (value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, String(value))
      }
    }
  })

  return formData
}
