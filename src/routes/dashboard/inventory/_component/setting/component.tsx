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
import { HeadTable } from '@/components/data-table/component'

export function DataBrand() {
  const { data: brands, isLoading, isFetching } = useBrand({})
  const data = useMemo(() => brands?.data?.data, [isLoading, isFetching])

  return (
    <div className='border border-line rounded-xl overflow-hidden h-fit'>
      <HeadTable>
        <div className='flex gap-4 items-center'>
          <p className='text-dark font-medium'>Merek</p>
        </div>
      </HeadTable>
      <DataTable
        columns={columnsBrand}
        data={data || []}
        isLoading={isLoading}
        withLoading
        withPagination
        styleFooter='border-t border-b-0'
      />
    </div>
  )
}

export function DataCategory() {
  const { data: category, isLoading, isFetching } = useCategory({})
  const data = useMemo(() => category?.data?.data, [isLoading, isFetching])

  return (
    <div className='border border-line rounded-xl overflow-hidden h-fit'>
      <HeadTable>
        <div className='flex gap-4 items-center'>
          <p className='text-dark font-medium'>Kategori</p>
        </div>
      </HeadTable>
      <DataTable
        columns={columnsCategory}
        data={data || []}
        isLoading={isLoading}
        withLoading
        withPagination
        styleFooter='border-t border-b-0'
      />
    </div>
  )
}
export function DataLocation() {
  const { data: location, isLoading, isFetching } = useLocation({})
  const data = useMemo(() => location?.data?.data, [isLoading, isFetching])

  return (
    <div className='border border-line rounded-xl overflow-hidden h-fit'>
      <HeadTable>
        <div className='flex gap-4 items-center'>
          <p className='text-dark font-medium'>Lokasi</p>
        </div>
      </HeadTable>
      <DataTable
        columns={columnsLocation}
        data={data || []}
        isLoading={isLoading}
        withLoading
        withPagination
        styleFooter='border-t border-b-0'
      />
    </div>
  )
}
export function DataMeasurement() {
  const { data: measurement, isLoading, isFetching } = useMeasurement({})
  const data = useMemo(() => measurement?.data?.data, [isLoading, isFetching])

  return (
    <div className='border border-line rounded-xl overflow-hidden h-fit'>
      <HeadTable>
        <div className='flex gap-4 items-center'>
          <p className='text-dark font-medium'>Ukuran</p>
        </div>
      </HeadTable>
      <DataTable
        columns={columnsMeasurement}
        data={data || []}
        isLoading={isLoading}
        withLoading
        withPagination
        styleFooter='border-t border-b-0'
      />
    </div>
  )
}
export function DataTag() {
  const { data: tag, isLoading, isFetching } = useTag({})
  const data = useMemo(() => tag?.data?.data, [isLoading, isFetching])

  return (
    <div className='border border-line rounded-xl overflow-hidden'>
      <HeadTable>
        <div className='flex gap-4 items-center'>
          <p className='text-dark font-medium'>Tag</p>
        </div>
      </HeadTable>
      <DataTable
        columns={columnsTag}
        data={data || []}
        isLoading={isLoading}
        withLoading
        withPagination
        styleFooter='border-t border-b-0'
      />
    </div>
  )
}
