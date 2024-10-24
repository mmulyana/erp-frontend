import { Button } from '@/components/ui/button'
import { Form, FormField, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createCertif } from '@/utils/types/form'
import { ExternalLink, Pencil, Plus, Trash } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useCreateCertif,
  useDeleteCertif,
  useUpdateCertif,
} from '@/hooks/api/use-employee'
import { Certification } from '@/utils/types/api'
import { months, MONTHS_OBJ } from '@/utils/constant/months'
import { useCompetency } from '@/hooks/api/use-competency'
import Label from '@/components/common/label'
import { Link } from 'react-router-dom'
import { BASE_URL } from '@/utils/constant/_urls'

type Props = {
  id?: number | null
  certifications: Certification[]
}

export default function CertifEmployee({
  id,
  certifications: dataCertif,
}: Props) {
  // GET CERTIF
  const { data, isLoading } = useCompetency()
  const competencies = useMemo(() => data?.data.data || [], [data, isLoading])
  // GET CERTIF

  // HANDLE CERTIF PROPS
  const certifications = useMemo(() => dataCertif, [dataCertif])
  // HANDLE CERTIF PROPS

  const { mutate: create } = useCreateCertif()
  const { mutate: remove } = useDeleteCertif()
  const { mutate: update } = useUpdateCertif()

  const form = useForm<createCertif>({
    defaultValues: {
      certif_file: null,
      certif_name: '',
      competencyId: null,
      expiry_month: '',
      expiry_year: '',
      issue_month: '',
      issue_year: '',
      issuing_organization: '',
    },
    mode: 'onChange',
  })

  const [openForm, setOpenForm] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const onEdit = (id: number) => {
    setSelectedId(id)
    setOpenForm(true)
    const certification = certifications.find((item) => item.id === id)
    if (certification) {
      form.reset({
        certif_name: certification.certif_name,
        competencyId: String(certification.competencyId),
        expiry_month: String(certification.expiry_month),
        expiry_year: String(certification.expiry_year),
        issue_month: String(certification.issue_month),
        issue_year: String(certification.issue_year),
        issuing_organization: certification.issuing_organization,
      })
    }
  }

  const reset = () => {
    setOpenForm(false)
    form.reset()
    setSelectedId(null)
  }

  const submit = async (data: createCertif) => {
    if (!id) return
    if (selectedId) {
      update(
        { id: selectedId, data },
        {
          onSuccess: () => {
            reset()
          },
        }
      )
      return
    }
    create(
      { employeeId: id, data },
      {
        onSuccess: () => {
          reset()
        },
      }
    )
  }

  if (!id) return null

  return (
    <div className='flex flex-col gap-4 w-full overflow-hidden'>
      {!openForm &&
        certifications?.map((item, index: number) => {
          return (
            <div
              key={`certifications-${index}`}
              className='relative max-w-full border pb-2 pt-3 px-4 rounded-lg overflow-hidden bg-white space-y-2'
            >
              <div className='flex flex-col gap-2 items-start overflow-hidden max-w-[270px]'>
                <p className='text-dark font-medium truncate w-full'>{item.certif_name}</p>
                <Link
                  to={`${BASE_URL}/files/${item.certif_file}`}
                  target='_blank'
                  className='flex gap-2 items-center bg-dark/10 rounded-full px-2 py-0.5 pl-3'
                >
                  <span className='text-sm text-dark'>Lihat sertifikat</span>
                  <ExternalLink size={14} />
                </Link>
              </div>
              <p className='text-dark/50 text-sm'>
                oleh{' '}
                <span className='text-dark'>{item?.issuing_organization}</span>
              </p>
              {(item.issue_month || item.issue_year) && (
                <p className='text-sm text-dark/50'>
                  Terbit sejak{' '}
                  <span className='text-dark'>
                    {item.issue_month && MONTHS_OBJ[item.issue_month]}{' '}
                    {item.issue_year}
                  </span>{' '}
                  sampai{' '}
                  <span className='text-dark'>
                    {item.expiry_month && MONTHS_OBJ[item.expiry_month]}{' '}
                    {item.expiry_year}
                  </span>
                </p>
              )}
              {item.competencyId && (
                <div className='flex gap-2'>
                  <p className='text-dark/50 text-sm'>Terkait dengan</p>
                  <Label
                    name={item.competency.name}
                    color={item.competency.color}
                  />
                </div>
              )}
              <div className='absolute -top-1 right-0 flex gap-2 pr-1'>
                <button
                  className='h-7 w-7 rounded-full hover:bg-line flex justify-center items-center'
                  onClick={() => onEdit(item.id)}
                >
                  <Pencil className='text-dark' size={14} />
                </button>
                <button
                  className='h-7 w-7 rounded-full hover:bg-line flex justify-center items-center'
                  onClick={() => {
                    remove({ id: item.id })
                  }}
                >
                  <Trash className='text-dark' size={14} />
                </button>
              </div>
            </div>
          )
        })}
      {openForm ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
            <div className='flex flex-col gap-4 mb-4 px-2'>
              <Controller
                control={form.control}
                name='certif_file'
                render={({ field }) => (
                  <div className='space-y-2'>
                    <FormLabel>Upload sertifikat</FormLabel>
                    <Input
                      type='file'
                      className='file:absolute relative file:left-0 file:h-10 file:top-0 file:bg-line pl-28 file:border-0 file:px-3  file:text-dark text-gray-600 h-10 w-full rounded-xl border border-[#DEE0E3] shadow-none'
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0] || null)
                      }}
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name='certif_name'
                label='Nama'
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                control={form.control}
                name='issuing_organization'
                label='Penyelenggara/penerbit'
                render={({ field }) => <Input {...field} />}
              />
              <div>
                <p className='mb-2 text-sm text-dark/80'>Tanggal Terbit</p>
                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='issue_month'
                    render={({ field }) => (
                      <Select
                        onValueChange={(val) => field.onChange(val)}
                        value={field.value}
                      >
                        <SelectTrigger className='w-full h-10 rounded-xl shadow-sm'>
                          <SelectValue placeholder='Pilih bulan' />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((item) => (
                            <SelectItem
                              key={`month-${item.value}`}
                              value={String(item.value)}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='issue_year'
                    render={({ field }) => (
                      <Input placeholder='tahun' {...field} />
                    )}
                  />
                </div>
              </div>
              <div>
                <p className='mb-2 text-sm text-dark/80'>Tanggal kadaluwarsa</p>
                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='expiry_month'
                    render={({ field }) => (
                      <Select
                        onValueChange={(val) => field.onChange(val)}
                        value={field.value}
                      >
                        <SelectTrigger className='w-full h-10 rounded-xl shadow-sm'>
                          <SelectValue placeholder='Pilih bulan' />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((item) => (
                            <SelectItem
                              key={`month-${item.value}`}
                              value={String(item.value)}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='expiry_year'
                    render={({ field }) => (
                      <Input placeholder='tahun' type='text' {...field} />
                    )}
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <FormLabel>Kompetensi terkait</FormLabel>
                <Select
                  onValueChange={(val) => form.setValue('competencyId', val)}
                >
                  <SelectTrigger className='w-full h-10 rounded-xl shadow-sm'>
                    <SelectValue placeholder='Pilih' />
                  </SelectTrigger>
                  <SelectContent>
                    {competencies.map((item, index: number) => (
                      <SelectItem
                        key={`user-competency-` + index}
                        value={String(item.id)}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex justify-end gap-4'>
                <Button variant='outline' type='button'>
                  Batal
                </Button>
                <Button type='submit'>Tambah</Button>
              </div>
            </div>
          </form>
        </Form>
      ) : (
        <Button
          variant='ghost'
          className='font-normal hover:bg-transparent gap-1 flex items-center text-blue-primary/80 hover:text-blue-primary h-fit p-0 relative text-sm mx-auto mt-2'
          onClick={() => setOpenForm(true)}
        >
          <Plus size={14} />
          Tambah Sertifikat
        </Button>
      )}
    </div>
  )
}
