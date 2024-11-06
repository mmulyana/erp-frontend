import { Card, CardBody, CardHead } from '@/components/common/card-v1'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useExpireCertification } from '@/hooks/api/use-employee'
import { useApiData } from '@/hooks/use-api-data'
import { BASE_URL } from '@/utils/constant/_urls'
import { UserCircle } from 'lucide-react'

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
    <Card>
      <CardHead className='px-3'>
        <p className='text-dark text-sm'>Tenggat Waktu Sertifikasi Pegawai</p>
      </CardHead>
      <CardBody className='p-0'>
        <ScrollArea className='h-48 flex flex-col gap-4'>
          {data?.map((item: any, index: number) => (
            <div
              key={index}
              className='px-3 py-3.5 grid grid-cols-[24px_1fr] gap-4 border-b border-line'
            >
              {item.employee.photo ? (
                <img
                  className='h-6 w-6 rounded-full object-cover object-center'
                  src={BASE_URL + '/img/' + item.employee.photo}
                />
              ) : (
                <div className='w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center'>
                  <UserCircle size={16} />
                </div>
              )}
              <p className='text-sm text-dark/50'>
                Sertifikat{' '}
                <span className='text-dark font-medium'>
                  {item.certif_name}
                </span>
                {' milik '}
                <span className='text-dark font-medium'>
                  {item.employee.fullname}
                </span>
                {item.daysUntilExpiry < 0
                  ? ' sudah kadaluwarsa sejak '
                  : ' akan kedaluwarsa dalam '}
                <span className='text-dark font-medium'>
                  {item.daysUntilExpiry < 0
                    ? item.daysUntilExpiry * -1
                    : item.daysUntilExpiry}{' '}
                  hari
                </span>
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardBody>
    </Card>
  )
}
