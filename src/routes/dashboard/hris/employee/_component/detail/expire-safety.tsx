import { useExpireSafety } from '@/hooks/api/use-employee'
import { useApiData } from '@/hooks/use-api-data'

import { Card, CardBody, CardHead } from '@/components/common/card-v1'
import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {
  positionId?: string
}
export default function ExpireSafety({ positionId }: Props) {
  const { data } = useApiData(
    useExpireSafety({
      positionId: positionId ?? undefined,
    })
  )

  return (
    <Card>
      <CardHead className='px-3'>
        <p className='text-dark text-sm'>
          Safety induction akan dan sudah habis
        </p>
      </CardHead>
      <CardBody className='p-0'>
        <ScrollArea className='h-48 flex flex-col gap-4'>
          {data?.map((item: any, index: number) => (
            <div key={index} className='px-3 py-3.5 gap-4 border-b border-line'>
              <p className='text-base text-dark/50'>
                {item.daysUntilExpiry ? (
                  <>
                    <span className='text-dark font-medium'>
                      {item.fullname}
                    </span>{' '}
                    telah melewati masa berlaku safety induction-nya selama{' '}
                    <span className='text-dark font-medium'>
                      {item.daysUntilExpiry * -1}
                    </span>{' '}
                    hari.
                  </>
                ) : (
                  <>
                    <span className='text-dark font-medium'>
                      {item.fullname}
                    </span>{' '}
                    akan mencapai batas masa berlaku safety induction-nya dalam{' '}
                    <span className='text-dark font-medium'>
                      {item.daysUntilExpiry * -1}
                    </span>{' '}
                    hari.
                  </>
                )}
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardBody>
    </Card>
  )
}
