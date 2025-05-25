import { parseAsString, useQueryStates } from 'nuqs'

import SupplierCombobox from '@/features/inventory/supplier/components/supplier-combobox'
import LocationCombobox from '@/features/inventory/location/components/location-combobox'
import ItemAvailability from '@/features/inventory/item/components/item-availability'
import BrandCombobox from '@/features/inventory/brand/components/brand-combobox'
import ModalAddItem from '@/features/inventory/item/components/modal-add-item'
import CreatedSelect from '@/shared/components/common/select/created-select'
import TableItem from '@/features/inventory/item/components/table-item'

import { DefaultLayout } from '@/shared/layout/default-layout'
import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'

export default function Item() {
	const [query, setQuery] = useQueryStates({
		supplierId: parseAsString.withDefault(''),
		warehouseId: parseAsString.withDefault(''),
		brandId: parseAsString.withDefault(''),
	})

	return (
		<DefaultLayout className='space-y-6' module='inventory'>
			<ItemAvailability variant='compact' />

			<HeadPage
				title='Barang'
				subtitle='Kelola data barang'
				action={<ModalAddItem />}
			/>

			<div className='p-6 rounded-xl border borde-border bg-white space-y-6'>
				<div className='flex justify-between items-center'>
					<SearchV3 />
					<div className='flex gap-4 items-center'>
						<FilterButton>
							<SupplierCombobox
								defaultValue={query.supplierId}
								onSelect={(val) =>
									setQuery({
										supplierId: val,
									})
								}
							/>
							<LocationCombobox
								defaultValue={query.warehouseId}
								onSelect={(val) =>
									setQuery({
										warehouseId: val,
									})
								}
							/>
							<BrandCombobox
								defaultValue={query.brandId}
								onSelect={(val) =>
									setQuery({
										brandId: val,
									})
								}
							/>
						</FilterButton>
						<SortButton>
							<CreatedSelect />
						</SortButton>
					</div>
				</div>
				<TableItem />
			</div>
		</DefaultLayout>
	)
}
