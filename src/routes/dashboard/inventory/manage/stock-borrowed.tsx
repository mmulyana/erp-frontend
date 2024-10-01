import { useTransaction } from '@/hooks/api/use-transaction'
import { DashboardLayout } from '../../_component/layout'
import { useMemo } from 'react'
import { column } from './_component/column'
import { DataTable } from '@/components/data-table'
import Container from '../../_component/container'

export default function StockBorrowed() {
  const { data: transaction, isLoading } = useTransaction({ type: 'borrowed' })
  const data = useMemo(() => transaction?.data?.data, [isLoading])
  return (
    <DashboardLayout>
      <Container>
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
