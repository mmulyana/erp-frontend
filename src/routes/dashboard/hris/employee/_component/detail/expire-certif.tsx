import { Megaphone } from 'lucide-react'

import { useExpireCertification } from '@/hooks/api/use-employee'
import { useApiData } from '@/hooks/use-api-data'

import EmptyState from '@/components/common/empty-state'
import { Card, CardBody, CardHead } from '@/components/common/card-v1'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TEST_ID } from '@/utils/constant/_testId'

type Props = {
  positionId?: string
}
export default function ExpireCertif({ positionId }: Props) {
  const { data } = useApiData(
    useExpireCertification({
      positionId: positionId ?? undefined,
    })
  )
  return (
    <Card id={TEST_ID.CARD_CERTIF_LIST} data-testid={TEST_ID.CARD_CERTIF_LIST}>
      <CardHead className='px-3'>
        <div className='flex gap-2 items-center'>
          <Megaphone size={18} className='text-gray-700' />
          <p className='text-dark/70 text-sm'>
            Tenggat Waktu Sertifikasi Pegawai
          </p>
        </div>
      </CardHead>
      <CardBody className='p-0'>
        <ScrollArea className='h-48 flex flex-col gap-4'>
          {data?.length ? (
            data?.map((item: any, index: number) => (
              <div
                key={index}
                className='px-3 py-3.5 gap-4 border-b border-line'
              >
                <p className='text-base text-dark/50'>
                  {item.daysUntilExpiry < 0 ? (
                    <>
                      Sertifikasi{' '}
                      <span className='text-dark font-medium'>
                        {item.certif_name}
                      </span>{' '}
                      milik{' '}
                      <span className='text-dark font-medium'>
                        {item.employee.fullname}
                      </span>{' '}
                      telah kedaluwarsa selama{' '}
                      <span className='text-dark font-medium'>
                        {item.daysUntilExpiry * -1}
                      </span>{' '}
                      hari
                    </>
                  ) : (
                    <>
                      <span className='text-dark font-medium'>
                        {item.employee.fullname}
                      </span>{' '}
                      akan mencapai batas masa berlaku sertifikasi{' '}
                      <span className='text-dark font-medium'>
                        {item.certif_name}
                      </span>{' '}
                      dalam{' '}
                      <span className='text-dark font-medium'>
                        {item.daysUntilExpiry}
                      </span>{' '}
                      hari.
                    </>
                  )}
                </p>
              </div>
            ))
          ) : (
            <EmptyState className='h-full' />
          )}
        </ScrollArea>
      </CardBody>
    </Card>
  )
}
