export const baseUrl = import.meta.env.VITE_BASE_URL
const api = baseUrl + '/api'

export const urls = {
	login: api + '/auth/login',
	me: api + '/auth/me',
	user: api + '/user',
	role: api + '/role',
	permissionGroup: api + '/permission/group',
	permissionCheck: api + '/permission/check',
	permission: api + '/permission',
	dashboard: api + '/dashboard',
	helpdesk: api + '/helpdesk',

	// HRIS
	hrisPosition: api + '/position',
	employee: api + '/employee',
	cashAdvances: api + '/cash-advance',
	attendance: api + '/attendance',
	overtime: api + '/overtime',
	competency: api + '/competency',
	recap: api + '/recap',

	project: api + '/project/index',
	projectLabel: api + '/project/label',
	projectClient: api + '/project/client',
	projectClientCompany: api + '/project/client-company',
	projectActivity: api + '/project/activity',
	projectEstimate: api + '/project/estimate',
	projectAttachment: api + '/project/attachment',
	kanbanBoard: api + '/project/board',

	// INVENTORY
	inventoryGoods: api + '/inventory/goods',
	inventoryCategory: api + '/inventory/category',
	inventoryLocation: api + '/inventory/location',
	inventorySupplierTag: api + '/inventory/tag',
	inventoryMeasurement: api + '/inventory/measurement',
	inventorySupplier: api + '/inventory/supplier',
	inventorySupplierEmployee: api + '/inventory/supplier-employee',
	inventorySupplierLabel: api + '/inventory/supplier-label',
	inventoryBrand: api + '/inventory/brand',
	inventoryTransaction: api + '/inventory/transaction',
}
