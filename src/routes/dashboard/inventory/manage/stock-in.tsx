import { useTransaction } from '@/hooks/api/use-transaction'
import { DashboardLayout } from '../../_component/layout'
import { useMemo } from 'react'
import Container from '../../_component/container'
import { DataTable } from '@/components/data-table'
import { column } from './_component/column'
import TopHeader from '../_component/top-header'

export default function StockIn() {
  const { data: transaction, isLoading } = useTransaction({ type: 'in' })
  const data = useMemo(() => transaction?.data?.data, [isLoading])

  return (
    <DashboardLayout>
      <Container className='flex flex-col gap-4'>
        <TopHeader title='Barang masuk' />
        <DataTable
          columns={column}
          data={data || []}
          isLoading={isLoading}
          withLoading
          withPagination
        />
      </Container>
    </DashboardLayout>
  )
}
