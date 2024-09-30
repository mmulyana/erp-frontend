import { Globe, Mail, Phone, Plus, UserIcon, X } from 'lucide-react'
import { AddressType, ContactType } from '@/utils/enum/common'
import { useFieldArray, useForm } from 'react-hook-form'
import { StepperItem, StepperWrapper } from './component'
import {
  EmployeeValidationSchema,
  EmployeeValidationType,
} from '@/utils/schema/employee.schema'
import { Form, FormField } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateEmployee } from '@/hooks/api/use-employee'
import { useNavigate } from 'react-router-dom'
import useUrlState from '@ahooksjs/use-url-state'

const labelContact = {
  [ContactType.email]: 'Email',
  [ContactType.phoneNumber]: 'Nomor telepon',
  [ContactType.socialMedia]: 'Sosial media',
}

export default function Create() {
  const { mutate } = useCreateEmployee()
  const navigate = useNavigate()
  const [url] = useUrlState({ path: '', positionId: 1 })

  const form = useForm<EmployeeValidationType>({
    resolver: zodResolver(EmployeeValidationSchema),
    defaultValues: {
      fullname: '',
      // contact: [
      //   {
      //     isPrimary: true,
      //     type: ContactType.phoneNumber,
      //     value: '',
      //   },
      // ],
      // address: [
      //   {
      //     desa: '',
      //     rt: '',
      //     rw: '',
      //     kampung: '',
      //     kecamatan: '',
      //     kabupaten: '',
      //     kodePos: undefined,
      //     provinsi: '',
      //     type: AddressType.domicile,
      //   },
      // ],
    },
  })

  const iconContact = {
    [ContactType.email]: <Mail className='w-5 h-5 text-gray-400' />,
    [ContactType.phoneNumber]: <Phone className='w-5 h-5 text-gray-400' />,
    [ContactType.socialMedia]: <Globe className='w-5 h-5 text-gray-400' />,
  }

  const onSubmit = async (data: EmployeeValidationType) => {
    mutate(
      { fullname: data.fullname, positionId: Number(url.positionId) },
      {
        onSuccess: () => {
          navigate(url.path)
        },
      }
    )
  }

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control: form.control,
    name: 'contact',
  })

  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control: form.control,
    name: 'address',
  })

  return (
    <div className='min-h-screen w-full bg-gray-50'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <StepperWrapper>
            <StepperItem title='Info umum'>
              <div className='w-full p-4 rounded border mb-4'>
                <div className='w-6 h-6 rounded bg-gray-200 flex justify-center items-center'>
                  <UserIcon className='w-4 h-4' />
                </div>
              </div>
              <div className='flex flex-col gap-4 p-4 pb-6 border bg-white rounded-xl'>
                <FormField
                  label='Nama lengkap'
                  control={form.control}
                  name='fullname'
                  render={({ field }) => <Input {...field} />}
                />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    label='Tanggal lahir'
                    control={form.control}
                    name='birthdate'
                    render={({ field }) => (
                      <Input {...field} type='date' className='block' />
                    )}
                  />
                  <FormField
                    label='Tempat lahir'
                    control={form.control}
                    name='place_of_birth'
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='gender'
                    label='Jenis kelamin'
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className='rounded-xl shadow-sm shadow-gray-950/10 border border-[#DEE0E3]'>
                          <SelectValue placeholder='Pilih jenis kelamin' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='male'>Laki-laki</SelectItem>
                          <SelectItem value='female'>Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormField
                    label='Agama'
                    control={form.control}
                    name='religion'
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    label='NIK'
                    control={form.control}
                    name='nik'
                    render={({ field }) => <Input {...field} />}
                  />
                  <FormField
                    label='Kartu keluarga'
                    control={form.control}
                    name='kk'
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
              </div>
              <div className='mt-4'>
                <p className='text-sm font-semibold text-gray-500'>Kontak</p>
                {contactFields.map((field, index) => (
                  <div
                    key={field.id}
                    className='mt-2 border p-4 rounded-lg bg-white'
                  >
                    <div className='flex justify-between items-center mb-2'>
                      <div className='flex gap-1 items-center'>
                        <FormField
                          name={`contact.${index}.type`}
                          render={({ field }) => (
                            <div className='flex items-center gap-2 border border-gray-200 pl-2 pr-1 py-0.5 rounded'>
                              {iconContact[field.value as ContactType]}
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={index === 0}
                              >
                                <SelectTrigger className='border-none px-0.5 h-6 focus:ring-transparent gap-2'>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value={ContactType.email}>
                                    Email
                                  </SelectItem>
                                  <SelectItem value={ContactType.phoneNumber}>
                                    Nomor telepon
                                  </SelectItem>
                                  <SelectItem value={ContactType.socialMedia}>
                                    Sosial media
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        />
                      </div>
                      {index > 0 && (
                        <Button
                          type='button'
                          onClick={() => removeContact(index)}
                          variant='ghost'
                          className='h-6 w-6 p-0'
                        >
                          <X className='w-4 h-4 text-red-400' />
                        </Button>
                      )}
                    </div>
                    <FormField
                      name={`contact.${index}.value`}
                      control={form.control}
                      render={({ field }) => <Input {...field} />}
                      label={labelContact[field.type]}
                    />
                  </div>
                ))}
                <Button
                  type='button'
                  className='w-full flex gap-1.5 items-center mt-4'
                  variant='secondary'
                  onClick={() =>
                    appendContact({
                      type: ContactType.phoneNumber,
                      value: '',
                      isPrimary: false,
                    })
                  }
                >
                  <Plus className='w-4 h-4 text-gray-400' />
                  <span className='text-gray-800'>
                    Tambah kontak alternatif
                  </span>
                </Button>
              </div>
              <div className='mt-4'>
                <p className='text-sm font-semibold text-gray-500'>Alamat</p>
                {addressFields.map((field, index) => (
                  <div
                    key={field.id}
                    className='mt-2 border p-4 rounded-lg bg-white'
                  >
                    <div className='flex justify-between items-center mb-2'>
                      <div className='flex gap-1 items-center'>
                        <FormField
                          name={`address.${index}.type`}
                          render={({ field }) => (
                            <div className='flex items-center gap-2 border border-gray-200 pl-2 pr-1 py-0.5 rounded'>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={index === 0}
                              >
                                <SelectTrigger className='border-none px-0.5 h-6 focus:ring-transparent gap-2'>
                                  <SelectValue placeholder='' />
                                </SelectTrigger>
                                <SelectContent>
                                  {index === 0 && (
                                    <SelectItem value={AddressType.domicile}>
                                      Domisili
                                    </SelectItem>
                                  )}
                                  <SelectItem value={AddressType.alternative}>
                                    Alternatif
                                  </SelectItem>
                                  <SelectItem value={AddressType.origin}>
                                    Asal
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        />
                      </div>
                      {index > 0 && (
                        <Button
                          type='button'
                          onClick={() => removeAddress(index)}
                          variant='ghost'
                          className='h-6 w-6 p-0'
                        >
                          <X className='w-4 h-4 text-red-400' />
                        </Button>
                      )}
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                      <FormField
                        name={`address.${index}.rt`}
                        control={form.control}
                        render={({ field }) => <Input {...field} />}
                        label='RT'
                      />
                      <FormField
                        name={`address.${index}.rw`}
                        control={form.control}
                        render={({ field }) => <Input {...field} />}
                        label='RW'
                      />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                      <FormField
                        name={`address.${index}.kampung`}
                        control={form.control}
                        render={({ field }) => <Input {...field} />}
                        label='Kampung'
                      />
                      <FormField
                        name={`address.${index}.desa`}
                        control={form.control}
                        render={({ field }) => <Input {...field} />}
                        label='Desa'
                      />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                      <FormField
                        name={`address.${index}.kecamatan`}
                        control={form.control}
                        render={({ field }) => <Input {...field} />}
                        label='Kecamatan'
                      />
                      <FormField
                        name={`address.${index}.kabupaten`}
                        control={form.control}
                        render={({ field }) => <Input {...field} />}
                        label='Kabupaten'
                      />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                      <FormField
                        name={`address.${index}.kodePos`}
                        control={form.control}
                        render={({ field }) => (
                          <Input {...field} type='number' />
                        )}
                        label='Kode Pos'
                      />
                      <FormField
                        name={`address.${index}.provinsi`}
                        control={form.control}
                        render={({ field }) => <Input {...field} />}
                        label='Provinsi'
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type='button'
                  className='w-full flex gap-1.5 items-center mt-4'
                  variant='secondary'
                  onClick={() =>
                    appendAddress({
                      type: AddressType.origin,
                      desa: '',
                      kampung: '',
                      kabupaten: '',
                      kecamatan: '',
                      kodePos: undefined,
                      provinsi: '',
                      rt: '',
                      rw: '',
                    })
                  }
                >
                  <Plus className='w-4 h-4 text-gray-400' />
                  <span className='text-gray-800'>
                    Tambah Alamat alternatif
                  </span>
                </Button>
              </div>
            </StepperItem>
            <StepperItem title='Jabatan'>
              <p>Jabatan</p>
            </StepperItem>
            <StepperItem title='Kompetensi'>
              <p>Kompetensi</p>
            </StepperItem>
            <StepperItem title='Review'>
              <p>Review</p>
            </StepperItem>
          </StepperWrapper>
        </form>
      </Form>
    </div>
  )
}
