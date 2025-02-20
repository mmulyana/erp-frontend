import { useApiData } from '@/shared/hooks/use-api-data'
import { useMeasurement } from '@/hooks/api/use-measurement'
import { useLocation } from '@/hooks/api/use-location'
import { useBrand } from '@/hooks/api/use-brand'
import { useCategory } from '@/hooks/api/use-category'
import { useGoods } from '@/hooks/api/use-goods'
import {
  Goods,
  GoodsBrand,
  GoodsCategory,
  GoodsLocation,
  GoodsMeasurement,
  Supplier,
} from '@/utils/types/api'
import { useSupplier } from '@/hooks/api/use-supplier'

type Options = {
  name: string
  value: number
}

type Return = {
  measurements: GoodsMeasurement[] | undefined
  locations: GoodsLocation[] | undefined
  brands: GoodsBrand[] | undefined
  goods: Goods[] | undefined
  suppliers: Supplier[] | undefined
  categories: GoodsCategory[] | undefined
  measurementOptions: Options[] | undefined
  locationOptions: Options[] | undefined
  brandsOptions: Options[] | undefined
  categoryOptions: Options[] | undefined
  goodsOptions: Options[] | undefined
  supplierOptions: Options[] | undefined
}
export const useInventoryData = (): Return => {
  const { data: measurements } = useApiData(useMeasurement())
  const { data: locations } = useApiData(useLocation())
  const { data: brands } = useApiData(useBrand())
  const { data: categories } = useApiData(useCategory())
  const { data: goods } = useApiData(useGoods())
  const { data: suppliers } = useApiData(useSupplier())

  const measurementOptions = measurements?.map((item) => ({
    name: item.name,
    value: item.id,
  }))
  const locationOptions = locations?.map((item) => ({
    name: item.name,
    value: item.id,
  }))
  const brandsOptions = brands?.map((item) => ({
    name: item.name,
    value: item.id,
  }))
  const categoryOptions = categories?.map((item) => ({
    name: item.name,
    value: item.id,
  }))
  const goodsOptions = goods?.map((item) => ({
    name: item.name,
    value: item.id,
  }))
  const supplierOptions = suppliers?.map((item) => ({
    name: item.name,
    value: item.id,
  }))

  return {
    measurements,
    categories,
    suppliers,
    locations,
    brands,
    goods,
    measurementOptions,
    locationOptions,
    categoryOptions,
    brandsOptions,
    goodsOptions,
    supplierOptions,
  }
}
