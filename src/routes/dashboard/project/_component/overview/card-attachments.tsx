import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import { useAttachments } from '@/hooks/api/use-attachment'
import { useApiData } from '@/hooks/use-api-data'

import { BASE_URL } from '@/utils/constant/_urls'
import { cn } from '@/utils/cn'

import { Card, CardBody, CardHead } from '@/components/common/card-v1'
import { buttonVariants } from '@/components/ui/button'

import { Eye, FileSpreadsheet, Lock } from 'lucide-react'
import Search from '@/components/common/search'
import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function CardAttachments() {
  const [search, setSearch] = useState('')

  const { data: attachments } = useApiData(
    useAttachments({ ...(search !== '' ? { name: search } : undefined) })
  )

  return (
    <Card>
      <CardHead className='border-none h-fit py-2 px-2 flex justify-between items-center'>
        <p className='text-sm text-dark'>Lampiran</p>
        <Search
          debounceTime={500}
          placeholder='Cari'
          withoutUrl
          onSearch={setSearch}
        />
      </CardHead>
      <CardBody className='p-0'>
        <ScrollArea className='overflow-hidden h-48 px-2.5 pb-2.5 rounded-md'>
          <div className='flex flex-col gap-4 bg-dark/5 p-2'>
            {attachments?.map((item) => (
              <div
                className='flex justify-between items-center'
                key={'attachments-' + item.id}
              >
                <div className='flex gap-2.5 items-start'>
                  <div className='h-fit flex-shrink-0 pt-1'>
                    <FileSpreadsheet size={20} className='text-gray-600' />
                  </div>
                  <div>
                    <div className='flex gap-2 items-center'>
                      <p className='text-dark leading-5 text-sm font-medium'>
                        {item.name}.{item.type}
                      </p>
                      {item.isSecret && <Lock size={14} />}
                    </div>
                    <p className='text-dark/40 text-sm leading-4'>
                      {format(item.uploaded_at, 'dd/MM/yy')}
                    </p>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Link
                    to={BASE_URL + '/files/' + item.file}
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-8 h-8 rounded-full border border-dark/[0.12] p-0 text-dark'
                    )}
                  >
                    <Eye size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardBody>
    </Card>
  )
}
