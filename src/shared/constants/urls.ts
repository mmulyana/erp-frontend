export const baseUrl = import.meta.env.VITE_BASE_URL
const api = baseUrl + '/api'

export const urls = {
	login: api + '/auth/login',
	me: api + '/auth/me',
	user: api + '/user',
	role: api + '/role',
	permissionGroup: api + '/permission/group',
	permission: api + '/permission/item',

	// HRIS
	employee: api + '/employee',
	cashAdvances: api + '/cash-advance',
	attendance: api + '/attendance',
	overtime: api + '/overtime',
	certificate: api + '/employee/data/certificate',

	// DASHBOARD
	dashboardHris: api + '/dashboard/hris',
	dashboardProject: api + '/dashboard/project',
	dashboardInventory: api + '/dashboard/inventory',

	project: api + '/project/index',
	projectLabel: api + '/project/label',
	projectClient: api + '/project/client',
	projectClientCompany: api + '/project/client-company',
	projectActivity: api + '/project/activity',
	projectEstimate: api + '/project/estimate',
	projectAttachment: api + '/project/attachment',
	kanbanBoard: api + '/project/board',

	// INVENTORY
	inventoryLocation: api + '/location',
	inventorySupplier: api + '/supplier',
	inventoryBrand: api + '/brand',
}
