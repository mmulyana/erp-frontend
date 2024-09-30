import { DataTable } from '@/components/data-table'
import { useBrand } from '@/hooks/api/use-brand'
import { useMemo } from 'react'
import { columnsBrand } from './columns'

export function DataBrand() {
  const { data: brands, isLoading } = useBrand({})
  const data = useMemo(() => brands?.data?.data, [isLoading])

  return (
    <>
      <DataTable
        columns={columnsBrand}
        data={data || []}
        isLoading={isLoading}
        withLoading
        withPagination
      />
    </>
  )
}
