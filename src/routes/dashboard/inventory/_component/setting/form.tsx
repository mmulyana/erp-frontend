import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateBrand } from '@/hooks/api/use-brand'
import { useCreateCategory } from '@/hooks/api/use-category'
import { useCreateLocation } from '@/hooks/api/use-location'
import { useCreateMeasurement } from '@/hooks/api/use-measurement'
import { useCreateTag } from '@/hooks/api/use-tag'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  onClose: (val: boolean) => void
}

export function FormBrand({ onClose }: Props) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const { mutate } = useCreateBrand()

  const form = useForm({
    defaultValues: {
      name: '',
      photo: null as File | null,
    },
  })

  const onSubmit = async (data: any) => {
    mutate(
      {
        payload: {
          name: data.name,
          photo: data.photo,
        },
      },
      {
        onSuccess: () => {
          onClose(false)
          form.reset()
        },
      }
    )
  }

  const validateFileSize = (file: File | null) => {
    if (!file) return true // Allow empty file input
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    return file.size <= maxSize || 'File size must be less than 5MB'
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      form.setValue('photo', file)
    } else {
      setPhotoPreview(null)
      form.setValue('photo', null)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='px-4 py-4 space-y-4'>
          <p>Merek</p>
          <FormField
            label='Nama'
            control={form.control}
            name='name'
            render={({ field }) => <Input {...field} />}
          />
          <FormField
            label='Photo'
            control={form.control}
            name='photo'
            rules={{ validate: validateFileSize }}
            render={({
              field: { value, onChange, ...field },
              fieldState: { error },
            }) => (
              <div>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    handlePhotoChange(e)
                    onChange(e.target.files?.[0] || null)
                  }}
                  {...field}
                />
                {error && (
                  <p className='text-red-500 text-sm mt-1'>{error.message}</p>
                )}
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt='Preview'
                    className='mt-2 max-w-xs max-h-40 object-contain'
                  />
                )}
              </div>
            )}
          />
        </div>
        <div className='rounded-b-md px-4 py-4 bg-[#F4F4F7] border-t border-[#EFF0F2] flex justify-end gap-2 items-center'>
          <Button
            type='button'
            variant='secondary'
            onClick={() => onClose(false)}
          >
            Batal
          </Button>
          <Button type='submit'>Simpan</Button>
        </div>
      </form>
    </Form>
  )
}
export function FormCategory({ onClose }: Props) {
  const { mutate } = useCreateCategory()

  const form = useForm({
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: any) => {
    mutate(
      {
        payload: {
          name: data.name,
        },
      },
      {
        onSuccess: () => {
          onClose(false)
          form.reset()
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='px-4 py-4 space-y-4'>
          <p>Kategori</p>

          <FormField
            label='Nama'
            control={form.control}
            name='name'
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div className='rounded-b-md px-4 py-4 bg-[#F4F4F7] border-t border-[#EFF0F2] flex justify-end gap-2 items-center'>
          <Button
            type='button'
            variant='secondary'
            onClick={() => onClose(false)}
          >
            Batal
          </Button>
          <Button>Simpan</Button>
        </div>
      </form>
    </Form>
  )
}
export function FormLocation({ onClose }: Props) {
  const { mutate } = useCreateLocation()

  const form = useForm({
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: any) => {
    mutate(
      {
        payload: {
          name: data.name,
        },
      },
      {
        onSuccess: () => {
          onClose(false)
          form.reset()
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='px-4 py-4 space-y-4'>
          <p>Kategori</p>

          <FormField
            label='Nama'
            control={form.control}
            name='name'
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div className='rounded-b-md px-4 py-4 bg-[#F4F4F7] border-t border-[#EFF0F2] flex justify-end gap-2 items-center'>
          <Button
            type='button'
            variant='secondary'
            onClick={() => onClose(false)}
          >
            Batal
          </Button>
          <Button>Simpan</Button>
        </div>
      </form>
    </Form>
  )
}
export function FormMeasurement({ onClose }: Props) {
  const { mutate } = useCreateMeasurement()

  const form = useForm({
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: any) => {
    mutate(
      {
        payload: {
          name: data.name,
        },
      },
      {
        onSuccess: () => {
          onClose(false)
          form.reset()
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='px-4 py-4 space-y-4'>
          <p>Ukuran</p>

          <FormField
            label='Nama'
            control={form.control}
            name='name'
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div className='rounded-b-md px-4 py-4 bg-[#F4F4F7] border-t border-[#EFF0F2] flex justify-end gap-2 items-center'>
          <Button
            type='button'
            variant='secondary'
            onClick={() => onClose(false)}
          >
            Batal
          </Button>
          <Button>Simpan</Button>
        </div>
      </form>
    </Form>
  )
}
export function FormTag({ onClose }: Props) {
  const { mutate } = useCreateTag()

  const form = useForm({
    defaultValues: {
      name: '',
      color: '',
    },
  })

  const onSubmit = async (data: any) => {
    mutate(
      {
        payload: data,
      },
      {
        onSuccess: () => {
          onClose(false)
          form.reset()
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='px-4 py-4 space-y-4'>
          <p>Tags</p>
          <FormField
            label='Nama'
            control={form.control}
            name='name'
            render={({ field }) => <Input {...field} />}
          />
          <FormField
            label='Warna'
            control={form.control}
            name='color'
            render={({ field }) => <Input type='color' {...field} />}
          />
        </div>
        <div className='rounded-b-md px-4 py-4 bg-[#F4F4F7] border-t border-[#EFF0F2] flex justify-end gap-2 items-center'>
          <Button
            type='button'
            variant='secondary'
            onClick={() => onClose(false)}
          >
            Batal
          </Button>
          <Button>Simpan</Button>
        </div>
      </form>
    </Form>
  )
}
