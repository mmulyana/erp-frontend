import { useTransaction } from '@/hooks/api/use-transaction'
import { DashboardLayout } from '../../_component/layout'
import { useMemo } from 'react'
import Container from '../../_component/container'
import { DataTable } from '@/components/data-table'
import { column } from './_component/column'

export default function StockOpname() {
  const { data: transaction, isLoading } = useTransaction({ type: 'opname' })
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
