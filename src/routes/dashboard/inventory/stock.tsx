import { Package } from 'lucide-react'
import { DashboardLayout } from '../_component/layout'
import TitlePage from '../_component/title-page'
import { Tab, Tabs } from '@/components/tab'
import StockIn from './_component/stock/stock-in'
import StockOut from './_component/stock/stock-out'
import StockBorrowed from './_component/stock/stock-borrowed'
import StockOpname from './_component/stock/stock-opname'

export default function Stock() {
  return (
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
  )
}
