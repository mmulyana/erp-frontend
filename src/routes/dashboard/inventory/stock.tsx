import DetailTransaction from './_component/stock/detail-transaction'
import StockBorrowed from './_component/stock/stock-borrowed'
import StockOpname from './_component/stock/stock-opname'
import { DashboardLayout } from '../_component/layout'
import StockOut from './_component/stock/stock-out'
import StockIn from './_component/stock/stock-in'
import TitlePage from '../_component/title-page'
import { Tab, Tabs } from '@/components/tab'
import { Package } from 'lucide-react'
import { atom, useAtom } from 'jotai'
import AlertDialogV1 from '@/components/common/alert-dialog-v1'
import { useDeleteTransaction } from '@/hooks/api/use-transaction'

export const dialogDeleteTransaction = atom<{
  id: number
  open: boolean
} | null>(null)

export default function Stock() {
  const { mutate } = useDeleteTransaction()

  const [selected, setSelected] = useAtom(dialogDeleteTransaction)

  return (
    <>
      <DashboardLayout>
        <TitlePage className='mb-2'>
          <div className='flex gap-2 items-center'>
            <Package className='text-[#989CA8]' />
            <p className='text-dark font-medium'>Kelola Barang</p>
          </div>
        </TitlePage>
        <Tabs>
          <Tab label='Barang Masuk'>
            <StockIn />
          </Tab>
          <Tab label='Barang Keluar'>
            <StockOut />
          </Tab>
          <Tab label='Opname'>
            <StockOpname />
          </Tab>
          <Tab label='Peminjaman'>
            <StockBorrowed />
          </Tab>
        </Tabs>
      </DashboardLayout>
      <AlertDialogV1
        open={selected?.open}
        setOpen={() => setSelected(null)}
        title='Hati-hati! Tindakan ini tidak bisa dibatalkan'
        body='Data transaksi akan dihapus dalam sistem dan dikembalikan ke nilai sebelumnya'
        onConfirm={() => {
          if (!selected?.id) return
          mutate({ id: selected?.id }, { onSuccess: () => setSelected(null) })
        }}
      />
      <DetailTransaction />
    </>
  )
}
