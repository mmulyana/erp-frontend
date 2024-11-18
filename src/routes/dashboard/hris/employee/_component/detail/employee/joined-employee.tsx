import { Editable } from '@/components/common/editable'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUpdateEmployee } from '@/hooks/api/use-employee'
import { cn } from '@/utils/cn'
import { format } from 'date-fns'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { id as indonesia } from 'date-fns/locale'

type Props = {
  id?: number | null
  isEdit: string | null
  joined_at: string | undefined
  joined_type: string | undefined
  onEdit?: (val: string | null) => void
  permission?: string[]
}
export default function JoinedEmployee({
  id,
  isEdit,
  onEdit,
  joined_at,
  joined_type,
  permission,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { mutate } = useUpdateEmployee()

  // HANDLE FORM
  const form = useForm({
    defaultValues: {
      joined_at: '',
      joined_type: 'date',
    },
  })

  useEffect(() => {
    if (isEdit === 'joined_at' && joined_type && joined_at) {
      form.setValue('joined_type', joined_type)
      form.setValue('joined_at', joined_at)
    }
  }, [isEdit])

  const submit = (data: { joined_at: string; joined_type: string }) => {
    if (!id) return
    mutate({
      id,
      payload: { joined_at: data.joined_at, joined_type: data.joined_type },
    })
    onEdit?.(null)
    containerRef.current?.focus()
  }

  const isAllowed = permission?.includes('employee:update')

  return (
    <div className={cn(isEdit === 'joined_at' && 'pt-2')} ref={containerRef}>
      <Editable
        isEdit={isEdit}
        onEdit={onEdit}
        keyData='joined_at'
        type='custom'
        defaultData={joined_at}
        customData={(val) => {
          if (joined_type == 'date') {
            return (
              <p className='text-dark'>
                {format(val, 'd MMMM yyyy', { locale: indonesia })}
              </p>
            )
          }

          return <p className='text-dark'>{val}</p>
        }}
        customEdit={
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <Tabs defaultValue='date'>
                <TabsList className='p-1 h-8'>
                  <TabsTrigger
                    value='date'
                    className='h-full text-sm text-dark font-normal'
                  >
                    Tanggal
                  </TabsTrigger>
                  <TabsTrigger
                    value='year'
                    className='h-full text-sm text-dark font-normal'
                  >
                    Tahun
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='date' className='p-0'>
                  <Controller
                    control={form.control}
                    name='joined_at'
                    render={({ field }) => (
                      <div className='space-y-1'>
                        <label className='text-sm text-dark/80'>
                          Tanggal bergabung
                        </label>
                        <Input
                          className='shadow-none h-fit block p-1 rounded-md border-blue-primary'
                          type='date'
                          onFocus={() => {
                            form.setValue('joined_type', 'date')
                          }}
                          {...field}
                        />
                      </div>
                    )}
                  />
                </TabsContent>
                <TabsContent value='year'>
                  <Controller
                    control={form.control}
                    name='joined_at'
                    render={({ field }) => (
                      <div className='space-y-1'>
                        <label className='text-sm text-dark/80'>
                          Tahun bergabung
                        </label>
                        <Input
                          className='shadow-none h-fit block p-1 rounded-md border-blue-primary'
                          type='number'
                          onFocus={() => {
                            form.setValue('joined_type', 'year')
                          }}
                          {...field}
                        />
                      </div>
                    )}
                  />
                </TabsContent>
              </Tabs>
              <Button
                type='submit'
                variant='secondary'
                className='h-8 mt-3 font-normal text-sm rounded-md p-0 px-4 bg-gray-200'
              >
                Simpan
              </Button>
            </form>
          </Form>
        }
        className='capitalize'
        disabled={!isAllowed}
      />
    </div>
  )
}
