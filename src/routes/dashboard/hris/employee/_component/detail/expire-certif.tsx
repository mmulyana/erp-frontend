import { Card, CardBody, CardHead } from '@/components/common/card-v1'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useExpireCertification } from '@/hooks/api/use-employee'

type Props = {
  positionId?: string
}
export default function ExpireCertif({ positionId }: Props) {
  const { data } = useExpireCertification({
    enabled: positionId !== null,
  })
  console.log(data)
  return (
    <Card>
      <CardHead className='px-3'>
        <p className='text-dark text-sm'>Tenggat Waktu Sertifikasi Pegawai</p>
      </CardHead>
      <CardBody className='p-0'>
        <ScrollArea className='h-48 flex flex-col gap-4'>
          {[0, 1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className='px-3 py-3.5 grid grid-cols-[24px_1fr] gap-4 border-b border-line'
            >
              <div className='w-6 h-6 rounded-full bg-gray-400'></div>
              <p className='text-sm text-dark/50'>
                Sertifikat <span className='text-dark'>TKBT</span>{' '}
                <span className='text-dark'>Muhamad Mulyana</span> akan
                kedaluwarsa dalam <span className='text-dark'>10 hari</span>
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardBody>
    </Card>
  )
}
