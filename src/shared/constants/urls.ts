export const baseUrl = import.meta.env.VITE_BASE_URL
const api = baseUrl + '/api'

export const urls = {
	login: api + '/auth/login',
	me: api + '/auth/me',
	user: api + '/user',
	account: api + '/account',
	role: api + '/role',
	permission: api + '/permission',

	// HRIS
	employee: api + '/employee',
	cashAdvances: api + '/cash-advance',
	attendance: api + '/attendance',
	overtime: api + '/overtime',
	payrollPeriod: api + '/payroll-period',
	payroll: api + '/payroll',

	// DASHBOARD
	dashboardHris: api + '/dashboard/hris',
	dashboardProject: api + '/dashboard/project',
	dashboardInventory: api + '/dashboard/inventory',

	project: api + '/project',
	client: api + '/client',
	companyClient: api + '/company-client',
	activity: api + '/activity',
	attachment: api + '/attachment',

	// INVENTORY
	location: api + '/warehouse',
	supplier: api + '/supplier',
	brand: api + '/brand',
	item: api + '/item',
	stockIn: api + '/stock-in',
	stockOut: api + '/stock-out',
	ledger: api + '/ledger',
	loan: api + '/loan',
}
