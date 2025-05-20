export type User = {
	id: string
	roleId?: string
	username: string
	phone?: string
	email?: string
	active: boolean
	photoUrl?: string
	password: string
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type Role = {
	id: string
	name: string
	description?: string
	permissions?: string
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type Employee = {
	id: string
	fullname: string
	position?: string
	photoUrl?: string
	birthDate?: Date
	joinedAt?: Date
	active?: boolean
	phone?: string
	lastEducation?: string
	salary?: number
	overtimeSalary?: number
	safetyInductionDate?: Date
	address?: string
	payType?: PayType
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type Certificate = {
	id: string
	employeeId: string
	name: string
	fileUrl?: string
	publisher?: string
	issueDate?: Date
	expiryDate?: Date
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type Attendance = {
	id: string
	employeeId: string
	createdBy: string
	date: Date
	type: AttendanceType
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type Overtime = {
	id: string
	employeeId: string
	createdBy: string
	totalHour: number
	note?: string
	date: Date
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type CashAdvance = {
	id: string
	employeeId: string
	createdBy: string
	amount: number
	date: string
	note?: string
	status: CashAdvanceStatus
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type CashAdvanceTransaction = {
	id: string
	cashAdvanceId: string
	amount: number
	remaining?: number
	date: Date
	note?: string
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type PayrollPeriod = {
	id: string
	name: string
	startDate: string
	endDate: string
	payType: PayType
	status: PeriodStatus
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type Payroll = {
	id: string
	employeeId: string
	periodId: string
	createdBy: string
	workDay: number
	overtimeHour: number
	salary: number
	overtimeSalary: number
	paymentType: PaymentType
	deduction: number
	status: PayrollStatus
	note?: string
	createdAt: string
	updatedAt: string
	deletedAt?: string

	employee: Employee
}

export type Project = {
	id: string
	leadId?: string
	clientId?: string
	name: string
	description?: string
	progressPercentage: number
	paymentPercentage: number
	netValue?: bigint
	status: ProjectStatus
	deadlineAt?: Date
	priority?: ProjectPriority
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type AssignedEmployee = {
	id: string
	employeeId: string
	projectId: string
	startDate?: Date
	endDate?: Date
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type ProjectAttachment = {
	id: string
	projectId: string
	createdBy: string
	fileUrl: string
	type: string
	secret: boolean
	name: string
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type ProjectReport = {
	id: string
	projectId: string
	createdBy: string
	message: string
	date: Date
	type: ReportType
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type ReportAttachment = {
	id: string
	reportId: string
	photoUrl: string
	createdAt: string
}

export type ReportComment = {
	id: string
	message: string
	createdBy: string
	commentId?: string
	reportId: string
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type Client = {
	id: string
	companyId?: string
	name: string
	email?: string
	phone?: string
	position?: string
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type CompanyClient = {
	id: string
	name: string
	email?: string
	phone?: string
	address?: string
	photoUrl?: string
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type Inventory = {
	id: string
	warehouseId?: string
	brandId?: string
	name: string
	minimum: number
	description?: string
	unitOfMeasurement?: string
	photoUrl?: string
	availableStock: number
	totalStock: number
	category?: string
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type StockLedger = {
	id: string
	itemId: string
	type: RefType
	referenceId: string
	quantity: number
	date: Date
	note?: string
	createdAt: string
}

export type StockIn = {
	id: string
	supplierId?: string
	createdBy?: string
	referenceNumber?: string
	note?: string
	date: Date
	photoUrl?: string
	createdAt: string
	updatedAt: string
}

export type StockInItem = {
	id: string
	stockInId: string
	itemId: string
	quantity: number
	unitPrice: number
}

export type StockOut = {
	id: string
	createdBy?: string
	note?: string
	date: Date
	photoUrl?: string
	projectId?: string
	createdAt: string
	updatedAt: string
}

export type StockOutItem = {
	id: string
	stockOutId: string
	itemId: string
	quantity: number
	unitPrice?: number
}

export type Loan = {
	id: string
	inventoryId: string
	borrowerId: string
	requestQuantity: number
	returnedQuantity: number
	requestDate: Date
	returnDate?: Date
	note?: string
	status: LoanStatus
	PhotoUrlOut?: string
	PhotoUrlIn?: string
	projectId: string
}

export type Supplier = {
	id: string
	name: string
	address?: string
	photoUrl?: string
	email?: string
	phone?: string
	googleMapUrl?: string
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type Warehouse = {
	id: string
	name: string
	photoUrl?: string
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export type BrandInventory = {
	id: string
	name: string
	photoUrl?: string
	createdAt: string
	updatedAt: string
	deletedAt?: string
}

export enum PayType {
	MONTHLY = 'monthly',
	DAILY = 'daily',
}

export enum AttendanceType {
	PRESENCE = 'presence',
	ABSENT = 'absent',
}

export enum CashAdvanceStatus {
	PAID_OFF = 'paidOff',
	NOT_YET_PAID_OFF = 'notYetPaidOff',
}

export enum PaymentType {
	TRANSFER = 'TRANSFER',
	CASH = 'CASH',
}

export enum PeriodStatus {
	PROCESSING = 'processing',
	DONE = 'done',
}

export enum PayrollStatus {
	DRAFT = 'draft',
	DONE = 'done',
}

export enum ProjectPriority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH',
}

export enum ProjectStatus {
	NOT_STARTED = 'NOT_STARTED',
	OFFERING = 'OFFERING',
	DOING = 'DOING',
	BILLING = 'BILLING',
	DONE = 'DONE',
}

export enum ReportType {
	UPDATE = 'UPDATE',
	ALERT = 'ALERT',
	ETC = 'ETC',
}

export enum RefType {
	STOCK_IN = 'STOCK_IN',
	STOCK_OUT = 'STOCK_OUT',
	LOAN = 'LOAN',
	RETURNED = 'RETURNED',
}

export enum LoanStatus {
	LOANED = 'LOANED',
	PARTIAL_RETURNED = 'PARTIAL_RETURNED',
	RETURNED = 'RETURNED',
}
