export const paths = {
	base: '/',
	login: '/login',
	forgot: '/forgot',
	notFound: '*',
	dashboardOverview: '/dashboard',

	employee: '/dashboard/hris/employee',
	employeeDetail: '/dashboard/hris/employee/:detail',
	employeePaidLeave: '/dashboard/hris/paid-leave',
	employeeAttendance: '/dashboard/hris/attendance',
	employeeCashAdvances: '/dashboard/hris/cash-advances',
	employeeRecap: '/dashboard/hris/recap',
	employeeRecapReport: '/dashboard/hris/recap/:detail',

	projectIndex: '/dashboard/project',
	projectManage: '/dashboard/project/manage',
	projectClient: '/dashboard/project/client',
	projectLabel: '/dashboard/project/label',

	inventoryIndex: '/dashboard/inventory',
	inventorySupplier: '/dashboard/inventory/supplier',
	inventorySupplierEmployee: '/dashboard/inventory/supplier/:detail',
	inventorySetting: '/dashboard/inventory/setting',
	inventoryStock: '/dashboard/inventory/manage',
	inventoryStockIn: '/dashboard/inventory/manage/in',
	inventoryStockOut: '/dashboard/inventory/manage/out',
	inventoryStockOpname: '/dashboard/inventory/manage/opname',
	inventoryStockBorrowed: '/dashboard/inventory/manage/borrowed',

	adminUser: '/dashboard/admin/users',
	adminRole: '/dashboard/admin/role',
	adminPermission: '/dashboard/admin/permission',
}
