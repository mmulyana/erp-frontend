import StockBorrowed from './_component/stock/stock-borrowed'
import StockOpname from './_component/stock/stock-opname'
import { DashboardLayout } from '../_component/layout'
import StockOut from './_component/stock/stock-out'
import StockIn from './_component/stock/stock-in'
import TitlePage from '../_component/title-page'
import { Tab, Tabs } from '@/components/tab'
import { Package } from 'lucide-react'
import DetailTransaction from './_component/stock/detail-transaction'

export default function Stock() {
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
      <DetailTransaction />
    </>
  )
}
