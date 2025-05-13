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

	project: api + '/project',
	client: api + '/client',
	companyClient: api + '/company-client',
	activity: api + '/activity',
	attachment: api + '/attachment',
	kanbanBoard: api + '/board',

	// INVENTORY
	location: api + '/location',
	supplier: api + '/supplier',
	brand: api + '/brand',
	item: api + '/item',
	stockIn: api + '/stock-in',
	stockOut: api + '/stock-out',
}
