import { DataTable } from '@/components/data-table'
import { useBrand } from '@/hooks/api/use-brand'
import { useMemo } from 'react'
import { columnsBrand, columnsCategory, columnsLocation, columnsMeasurement } from './columns'
import { useCategory } from '@/hooks/api/use-category'
import { useLocation } from '@/hooks/api/use-location'
import { useMeasurement } from '@/hooks/api/use-measurement'

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

export function DataCategory() {
  const { data: category, isLoading } = useCategory({})
  const data = useMemo(() => category?.data?.data, [isLoading])

  return (
    <>
      <DataTable
        columns={columnsCategory}
        data={data || []}
        isLoading={isLoading}
        withLoading
        withPagination
      />
    </>
  )
}

export function DataLocation() {
  const { data: location, isLoading } = useLocation({})
  const data = useMemo(() => location?.data?.data, [isLoading])

  return (
    <>
      <DataTable
        columns={columnsLocation}
        data={data || []}
        isLoading={isLoading}
        withLoading
        withPagination
      />
    </>
  )
}
export function DataMeasurement() {
  const { data: measurement, isLoading } = useMeasurement({})
  const data = useMemo(() => measurement?.data?.data, [isLoading])

  return (
    <>
      <DataTable
        columns={columnsMeasurement}
        data={data || []}
        isLoading={isLoading}
        withLoading
        withPagination
      />
    </>
  )
}