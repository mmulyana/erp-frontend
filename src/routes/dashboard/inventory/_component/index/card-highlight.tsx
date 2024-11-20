import { useMemo, useState } from 'react'
import { Package } from 'lucide-react'

import { useGoodsLowStock, useGoodsOutOfStock } from '@/hooks/api/use-goods'
import { useTransactionBorrowed } from '@/hooks/api/use-transaction'
import { useApiData } from '@/hooks/use-api-data'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import Modal from '@/components/modal-v2'

import ButtonLink from '../button-link'
import EmptyState from '@/components/common/empty-state'

export default function CardHighlight() {
  const { data: borroweds } = useApiData(useTransactionBorrowed())
  const { data: outOfStocks } = useApiData(useGoodsOutOfStock())
  const { data: lowStocks } = useApiData(useGoodsLowStock())

  const totalBorrowed = useMemo(() => {
    if (!borroweds) return 0
    return borroweds.reduce((prev, cur) => prev + cur.qty, 0)
  }, [borroweds])

  const [modal, setModal] = useState<{
    open: boolean
    tab: 'borrowed' | 'low' | 'out'
  } | null>(null)

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 rounded-[8px] border border-line h-fit'>
        <div className='py-4 px-6 w-full h-full border-b md:border-none border-line'>
          <div className='h-8 w-8 rounded-full bg-green-primary/10 flex justify-center items-center'>
            <Package className='w-5 h-5 text-green-primary' />
          </div>
          <div className='mt-2.5 flex flex-col gap-3.5'>
            <p className='text-sm text-dark/50'>Stok dipinjam</p>
            <div className='w-full flex justify-between items-center'>
              <p className='text-lg font-medium text-dark'>{totalBorrowed}</p>
              <ButtonLink
                onClick={() => setModal({ open: true, tab: 'borrowed' })}
              />
            </div>
          </div>
        </div>

        <div className='py-4 px-6 w-full h-full border-b border-l-0 md:border-b-0 md:border-l border-line'>
          <div className='h-8 w-8 rounded-full bg-[#E09F54]/10 flex justify-center items-center'>
            <Package className='w-5 h-5 text-[#E09F54]' />
          </div>
          <div className='mt-2.5 flex flex-col gap-3.5'>
            <p className='text-sm text-dark/50'>Stok Hampir Habis</p>
            <div className='w-full flex justify-between items-center'>
              <p className='text-lg font-medium text-dark'>
                {lowStocks?.length}
              </p>
              <ButtonLink
                onClick={() => setModal({ open: true, tab: 'low' })}
              />
            </div>
          </div>
        </div>
        <div className='py-4 px-6 w-full h-full border-l-0 md:border-l border-line'>
          <div className='h-8 w-8 rounded-full bg-[#CE3E3E]/10 flex justify-center items-center'>
            <Package className='w-5 h-5 text-[#CE3E3E]' />
          </div>
          <div className='mt-2.5 flex flex-col gap-3.5'>
            <p className='text-sm text-dark/50'>Stok Habis</p>
            <div className='w-full flex justify-between items-center'>
              <p className='text-lg font-medium text-dark'>
                {outOfStocks?.length}
              </p>
              <ButtonLink
                onClick={() => setModal({ open: true, tab: 'out' })}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title='Detail'
        open={modal?.open || false}
        setOpen={() => setModal(null)}
      >
        <Tabs defaultValue={modal?.tab || 'borrowed'}>
          <TabsList className='mt-2 mx-2'>
            <TabsTrigger value='borrowed'>Stok dipinjam</TabsTrigger>
            <TabsTrigger value='low'>Stok hampir habis</TabsTrigger>
            <TabsTrigger value='out'>Stok habis</TabsTrigger>
          </TabsList>
          <TabsContent value='borrowed'>
            <ScrollArea className='h-80'>
              <div className='flex flex-col pb-3'>
                {borroweds && !!borroweds.length ? (
                  borroweds?.map((item) => (
                    <div
                      key={`borrowed-${item.id}`}
                      className='flex justify-between items-center p-4 border-b border-line'
                    >
                      <div>
                        <p className='text-dark font-medium'>
                          {item.good.name}
                        </p>
                        <p className='text-dark/80 text-sm'>
                          sebanyak{' '}
                          <span className='text-dark font-medium'>
                            {item.qty}
                          </span>{' '}
                          {item.good.measurement?.name}
                        </p>
                      </div>
                      {item.project && (
                        <div className='text-right'>
                          <p className='text-sm text-dark/50'>proyek terkait</p>
                          <p>{item.project.name}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <EmptyState className='h-80' />
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value='low'>
            <ScrollArea className='h-80'>
              <div className='flex flex-col pb-3'>
                {lowStocks && !!lowStocks.length ? (
                  lowStocks?.map((item) => (
                    <div
                      key={`low-${item.id}`}
                      className='flex justify-between items-center p-4 border-b border-line'
                    >
                      <div>
                        <p className='text-dark font-medium'>{item.name}</p>
                        <p className='text-dark/80 text-sm'>
                          Mininum stock:
                          {item.minimum}
                        </p>
                      </div>
                      <p className='text-dark/50'>
                        tersisa{' '}
                        <span className='text-dark font-medium'>
                          {item.available < item.qty
                            ? item.available
                            : item.qty}
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <EmptyState className='h-80' />
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value='out'>
            <ScrollArea className='h-80'>
              <div className='flex flex-col pb-3'>
                {outOfStocks && !!outOfStocks.length ? (
                  outOfStocks?.map((item) => (
                    <div
                      key={`out-${item.id}`}
                      className='flex justify-between items-center p-4 border-b border-line'
                    >
                      <div>
                        <p className='text-dark font-medium'>{item.name}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState className='h-80' />
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </Modal>
    </>
  )
}
