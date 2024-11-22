import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useCompetency } from '@/hooks/api/use-competency'
import { useApiData } from '@/hooks/use-api-data'
import {
  useCreateCertif,
  useDeleteCertif,
  useUpdateCertif,
} from '@/hooks/api/use-employee'

import { months, MONTHS_OBJ } from '@/utils/constant/months'
import { Certification } from '@/utils/types/api'
import { BASE_URL } from '@/utils/constant/_urls'

import { Form, FormField, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Label from '@/components/common/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { ExternalLink, Pencil, Plus, Trash } from 'lucide-react'
import {
  navigationParams,
  Stepper,
  stepperAtom,
  StepperItem,
} from '@/components/common/stepper-v1'
import { cn } from '@/utils/cn'
import { useSetAtom } from 'jotai'
import { CertifFormValues, certifSchema } from '@/utils/schema/certif'

type Props = {
  id?: number | null
  certifications: Certification[]
  permission?: string[]
}

export default function CertifEmployee({
  id,
  certifications: dataCertif,
  permission,
}: Props) {
  const setCurrentStep = useSetAtom(stepperAtom)

  const { data: competencies } = useApiData(useCompetency())

  const certifications = useMemo(() => dataCertif, [dataCertif])

  const { mutate: create } = useCreateCertif()
  const { mutate: remove } = useDeleteCertif()
  const { mutate: update } = useUpdateCertif()

  const form = useForm<CertifFormValues>({
    resolver: zodResolver(certifSchema),
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
  })

  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const onEdit = async (id: number) => {
    setSelectedId(id)
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
    setOpen(true)
  }

  const reset = () => {
    setOpen(false)
    form.reset()
    setSelectedId(null)
    setCurrentStep(0)
  }

  const submit = async (data: CertifFormValues) => {
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

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open])

  const isAllowed = permission?.includes('employee:update')

  return (
    <div className='flex flex-col gap-4 w-full overflow-hidden'>
      {certifications?.map((item, index: number) => (
        <div
          key={`certifications-${index}`}
          className='relative max-w-full border pb-2 pt-3 px-4 rounded-lg overflow-hidden bg-white space-y-2'
        >
          {item.certif_file && item.certif_name && (
            <div className='flex flex-col gap-2 items-start overflow-hidden max-w-[270px]'>
              <p className='text-dark font-medium truncate w-full'>
                {item.certif_name}
              </p>
              <Link
                to={`${BASE_URL}/files/${item.certif_file}`}
                target='_blank'
                className='flex gap-2 items-center bg-dark/10 rounded-full px-2 py-0.5 pl-3'
              >
                <span className='text-sm text-dark'>Lihat sertifikat</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          )}
          <p className='text-dark/50 text-sm'>
            oleh <span className='text-dark'>{item?.issuing_organization}</span>
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
          {isAllowed && (
            <div className='absolute -top-1 right-0 flex gap-2 pr-1'>
              <button
                className='h-7 w-7 rounded-full hover:bg-line flex justify-center items-center'
                onClick={() => onEdit(item.id)}
              >
                <Pencil className='text-dark' size={14} />
              </button>
              <button
                className='h-7 w-7 rounded-full hover:bg-line flex justify-center items-center'
                onClick={() => remove({ id: item.id })}
              >
                <Trash className='text-dark' size={14} />
              </button>
            </div>
          )}
        </div>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='ghost'
            className={cn(
              'font-normal hover:bg-transparent gap-1 flex items-center text-blue-primary/80 hover:text-blue-primary h-fit p-0 relative text-sm mx-auto mt-2',
              !isAllowed && 'hidden'
            )}
            disabled={!isAllowed}
          >
            <Plus size={14} />
            Tambah Sertifikat
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[500px] px-4'>
          <DialogHeader>
            <DialogTitle>
              {selectedId ? 'Edit Sertifikat' : 'Tambah Sertifikat'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
              <Stepper
                navigation={(params) => <Navigation {...params} />}
                hideStepper
              >
                <StepperItem label='File'>
                  <div className='flex flex-col gap-4'>
                    <Controller
                      control={form.control}
                      name='certif_file'
                      render={({ field }) => (
                        <div className='space-y-2'>
                          <FormLabel>Upload sertifikat</FormLabel>
                          <Input
                            type='file'
                            className='file:absolute relative file:left-0 file:h-10 file:top-0 file:bg-line pl-28 file:border-0 file:px-3 file:text-dark text-gray-600 h-10 w-full rounded-xl border border-[#DEE0E3] shadow-none'
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
                  </div>
                </StepperItem>
                <StepperItem label='Waktu terbit'>
                  <div className='flex flex-col gap-4'>
                    <div>
                      <p className='mb-2 text-sm text-dark/80'>
                        Tanggal Terbit
                      </p>
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
                              <SelectContent className='h-40'>
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
                      <p className='mb-2 text-sm text-dark/80'>
                        Tanggal kadaluwarsa
                      </p>
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
                              <SelectContent className='h-40'>
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
                        onValueChange={(val) =>
                          form.setValue('competencyId', val)
                        }
                      >
                        <SelectTrigger className='w-full h-10 rounded-xl shadow-sm'>
                          <SelectValue placeholder='Pilih' />
                        </SelectTrigger>
                        <SelectContent>
                          {competencies?.map((item, index: number) => (
                            <SelectItem
                              key={`user-competency-${index}`}
                              value={String(item.id)}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </StepperItem>
              </Stepper>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Navigation({
  nextStep,
  prevStep,
  step,
  totalSteps,
}: navigationParams) {
  return (
    <div
      className={cn(
        'mt-4 flex justify-between items-center px-4 w-full py-4 border-t border-line',
        step === 0 && 'justify-end'
      )}
    >
      {step > 0 && (
        <button
          type='button'
          onClick={prevStep}
          disabled={step === 0}
          className='py-2 px-3 h-fit border border-line text-dark rounded-lg text-sm bg-white'
        >
          Sebelumnya
        </button>
      )}
      <div className='flex gap-2 items-center justify-end'>
        {step === 0 && (
          <button
            type='submit'
            onClick={nextStep}
            className='py-2 px-3 h-fit border border-blue-darker text-white bg-blue-primary rounded-lg text-sm'
          >
            Selanjutnya
          </button>
        )}
        {step > 0 && (
          <button
            type='submit'
            onClick={nextStep}
            className='py-2 px-3 h-fit border border-blue-darker text-white bg-blue-primary rounded-lg text-sm'
          >
            {step !== totalSteps ? 'Selanjutnya' : 'Simpan'}
          </button>
        )}
      </div>
    </div>
  )
}
