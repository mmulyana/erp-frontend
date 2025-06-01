import { parseAsString, useQueryStates } from 'nuqs'

import LocationCombobox from '@/features/inventory/location/components/location-combobox'
import ItemAvailability from '@/features/inventory/item/components/item-availability'
import BrandCombobox from '@/features/inventory/brand/components/brand-combobox'
import ModalAddItem from '@/features/inventory/item/components/modal-add-item'
import CreatedSelect from '@/shared/components/common/select/created-select'
import TableItem from '@/features/inventory/item/components/table-item'

import FilterButton from '@/shared/components/common/filter-button'
import FilterReset from '@/shared/components/common/filter-reset'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'
import { useHasQueryValue } from '@/shared/hooks/use-has-query'
import { DefaultLayout } from '@/shared/layout/default-layout'
import BaseSelect from '@/shared/components/common/select/base-select'
import { statusOption } from '@/features/inventory/item/constant'

export default function Item() {
	const [query, setQuery] = useQueryStates({
		warehouseId: parseAsString.withDefault(''),
		brandId: parseAsString.withDefault(''),
		sort: parseAsString.withDefault(''),
		status: parseAsString.withDefault(''),
	})

	const hasQuery = useHasQueryValue(query)

	return (
		<DefaultLayout className='space-y-6' module='inventory'>
			<ItemAvailability variant='compact' />

			<HeadPage
				title='Barang'
				subtitle='Kelola data barang'
				action={<ModalAddItem />}
			/>

			<div className='p-6 rounded-xl border borde-border bg-white space-y-6'>
				<div className='flex justify-between items-center gap-4'>
					<SearchV3 />
					<FilterReset
						show={hasQuery}
						onClick={() =>
							setQuery({
								warehouseId: null,
								brandId: null,
								sort: null,
								status: null
							})
						}
					/>

					<FilterButton style={{ trigger: 'ml-0 md:ml-auto' }}>
						<div className='space-y-1'>
							<p className='text-ink-primary/50'>Status</p>
							<BaseSelect
								defaultValue={query.status}
								options={statusOption}
								urlName='status'
							/>
						</div>
						<div className='space-y-1'>
							<p className='text-ink-primary/50'>Gudang</p>
							<LocationCombobox
								defaultValue={query.warehouseId}
								onSelect={(val) =>
									setQuery({
										warehouseId: val,
									})
								}
							/>
						</div>
						<div className='space-y-1'>
							<p className='text-ink-primary/50'>Merek</p>
							<BrandCombobox
								defaultValue={query.brandId}
								onSelect={(val) =>
									setQuery({
										brandId: val,
									})
								}
							/>
						</div>
					</FilterButton>
					<SortButton>
						<CreatedSelect />
					</SortButton>
				</div>
				<TableItem />
			</div>
		</DefaultLayout>
	)
}
