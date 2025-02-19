export const BASE_URL = import.meta.env.VITE_BASE_URL
const API = BASE_URL + '/api'

export const URLS = {
	LOGIN: API + '/auth/login',
	ME: API + '/auth/me',
	USER: API + '/user',
	ROLE: API + '/role',
	PERMISSION_GROUP: API + '/permission/group',
	PERMISSION_CHECK: API + '/permission/check',
	PERMISSION: API + '/permission',
	DASHBOARD: API + '/dashboard',
	HELPDESK: API + '/helpdesk',

	// HRIS
	HRIS_POSITION: API + '/hris/position',
	EMPLOYEE: API + '/hris/employee',
	CASH_ADVANCES: API + '/hris/cash-advance',
	ATTENDANCE: API + '/hris/attendance',
	OVERTIME: API + '/hris/overtime',
	COMPETENCY: API + '/hris/competency',
	RECAP: API + '/hris/recap',

	PROJECT: API + '/project/index',
	PROJECT_LABEL: API + '/project/label',
	PROJECT_CLIENT: API + '/project/client',
	PROJECT_CLIENT_COMPANY: API + '/project/client-company',
	PROJECT_ACTIVITY: API + '/project/activity',
	PROJECT_ESTIMATE: API + '/project/estimate',
	PROJECT_ATTACHMENT: API + '/project/attachment',
	KANBAN_BOARDD: API + '/project/board',

	// INVENTORY
	INVENTORY_GOODS: API + '/inventory/goods',
	INVENTORY_CATEGORY: API + '/inventory/category',
	INVENTORY_LOCATION: API + '/inventory/location',
	INVENTORY_SUPPLIER_TAG: API + '/inventory/tag',
	INVENTORY_MEASUREMENT: API + '/inventory/measurement',
	INVENTORY_SUPPLIER: API + '/inventory/supplier',
	INVENTORY_SUPPLIER_EMPLOYEE: API + '/inventory/supplier-employee',
	INVENTORY_SUPPLIER_LABEL: API + '/inventory/supplier-label',
	INVENTORY_BRAND: API + '/inventory/brand',
	INVENTORY_TRANSACTION: API + '/inventory/transaction',
}
