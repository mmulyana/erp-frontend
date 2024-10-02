import { DataTable } from '@/components/data-table'
import { useBrand } from '@/hooks/api/use-brand'
import { useMemo } from 'react'
import {
  columnsBrand,
  columnsCategory,
  columnsLocation,
  columnsMeasurement,
  columnsTag,
} from './columns'
import { useCategory } from '@/hooks/api/use-category'
import { useLocation } from '@/hooks/api/use-location'
import { useMeasurement } from '@/hooks/api/use-measurement'
import { useTag } from '@/hooks/api/use-tag'

export function DataBrand() {
  const { data: brands, isLoading, isFetching } = useBrand({})
  const data = useMemo(() => brands?.data?.data, [isLoading, isFetching])

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
  const { data: category, isLoading, isFetching } = useCategory({})
  const data = useMemo(() => category?.data?.data, [isLoading, isFetching])

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
  const { data: location, isLoading, isFetching } = useLocation({})
  const data = useMemo(() => location?.data?.data, [isLoading, isFetching])

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
  const { data: measurement, isLoading, isFetching } = useMeasurement({})
  const data = useMemo(() => measurement?.data?.data, [isLoading, isFetching])

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
export function DataTag() {
  const { data: tag, isLoading, isFetching } = useTag({})
  const data = useMemo(() => tag?.data?.data, [isLoading, isFetching])

  return (
    <>
      <DataTable
        columns={columnsTag}
        data={data || []}
        isLoading={isLoading}
        withLoading
        withPagination
      />
    </>
  )
}
