export interface IApi<T = void> {
	data?: T
	message: string
}

export interface IApiPagination<T = void> {
	data: {
		total: number
		page: number
		limit: number
		total_pages: number
		data: T
	}
	message: string
}

export interface ApiError {
	message: string
	status: number
	errors: any
}

export type User = {
	id: string
	email: string
	username: string
	phone: string
	photoUrl: string | null
	active: boolean
	role: {
		id: string
		name: string
		description?: string
	}
	permissions?: string[]
	tours?: string[]
}

export type Board = {
	id: string
	name: string
	color: string
	position: number
	items: Item[]
}

export type Project = {
	id: number
	name: string
	boardItemsId: string
	clientId: number | null
	leadId: number | null
	progress: number
	net_value: number | null
	boardItems: {
		container: {
			color: string
			name: string
			id: string
		}
	}
	labels: ProjectToLabel[]
	employees: {
		id: number
		employee: {
			fullname: string
			photo: string
			id: number
		}
	}[]
	client?: {
		id: number
		name: string
	} | null
	lead?: {
		id: number
		fullname: string
		photo: string | null
	}
	_count: {
		employees: number
		activities: number
		attachments: number
	}
	attachments: Attachment[]
	isArchive: boolean
	isDeleted: boolean
}
export type ProjectDetail = Project & {
	ProjectEstimate: Estimate[]
	description?: string
	payment_status: number
	date_created: Date
	date_started: string | null
	date_ended: string | null
	isArchive: boolean
	_count: {
		employees: number
		attachments: number
	}
}

export interface Item {
	id: string
	position: number
	containerId: string
	project?: Project
}

export interface Count {
	employees: number
	comments: number
}

export interface Client {
	id: number
	name: string
	company?: Company
	phone?: string
	email?: string
	position?: string
	companyId: number
}

export interface Company {
	id: number
	logo: string
	name: string
	address?: string
	phone?: string
	email?: string
}

export interface Comment {
	comment: string
}

export interface ProjectToLabel {
	id: number
	label: ProjectLabel
}

export interface ProjectLabel {
	id: number
	name: string
	color: string
	_count?: {
		projects?: number
	}
}

export type Goods = {
	id: number
	name: string
	qty: number
	description: string | null
	available: number
	minimum: number
	photoUrl?: string
	locationId: number
	measurementId: number
	categoryId: number
	brandId: number
	brand: GoodsBrand
	category: GoodsCategory
	location: GoodsLocation
	measurement: GoodsMeasurement
}

export type GoodsBrand = {
	id: number
	name: string
	photoUrl?: string
	_count?: {
		goods?: number
	}
}

export type GoodsCategory = {
	id: number
	name: string
	_count?: {
		goods?: number
	}
}

export type GoodsLocation = {
	id: number
	name: string
	_count?: {
		goods?: number
	}
}

export type GoodsMeasurement = {
	id: number
	name: string
	_count?: {
		goods?: number
	}
}

export type Supplier = {
	id: number
	name: string
	phone?: string
	email?: string
	address?: string
	status: 'active' | 'nonactive'
	photoUrl?: string
	employees: SupplierEmployee[]
	tags: SupplierToTag[]
}

export type SupplierEmployee = {
	id: number
	name: string
	position?: string
	phone?: string
	supplierId: number
}

export type SupplierToTag = {
	id: number
	supplierId: number
	tagId: number
	tag: SupplierLabel
}

export type SupplierLabel = {
	id: number
	name: string
	color: string
	_count?: {
		supplier?: number
	}
}

export type Transaction = {
	id: number
	goodsId: number
	qty: number
	price: string
	supplierId: number
	date: string
	type: 'in' | 'out' | 'borrowed' | 'opname'
	projectId?: number
	is_returned?: boolean
	project?: Pick<Project, 'name'>
	good: Partial<Goods>
	supplier: Partial<Supplier>
}

// HRIS API
export type Employee = {
	id: number
	photo?: string
	fullname: string
	joined_at?: string
	joined_type?: 'date' | 'year'
	basic_salary?: number
	overtime_salary?: number
	pay_type?: 'daily' | 'monthly'
	employment_type?: 'permanent' | 'contract' | 'partime'
	safety_induction_date?: string
	status: boolean
	place_of_birth?: string
	birth_date?: string
	gender?: 'male' | 'female'
	marital_status?: 'single' | 'merried' | 'divorced'
	religion?: string
	last_education?: string
	email?: string
	phoneNumbers?: PhoneNumber[]
	positionId?: number
	position?: Position
	isHidden?: boolean
	attendances: Attendance[]
	cashAdvances: CashAdvance[]
	contacts: Contact[]
	addresses: Address[]
	statusTracks: EmployeeStatusTrack[]
	competencies: EmployeeCompetency[]
	certifications: Certification[]
	overtime: Overtime[]
	EmployeeAssigned: EmployeeAssigned[]
}

export type PhoneNumber = {
	id: number
	value: string
}

type EmployeeAssigned = {
	id: number
	projectId: number
	employeeId: number
	project: Project
	employee: Employee
}

export type Attendance = {
	id: number
	employee: Employee
	employeeId: number
	date: string
	total_hour: number
	type: 'presence' | 'absent'
}

export type Overtime = {
	id: number
	employeeId: number
	employee: Employee
	date: string
	total_hour: number
	description?: string
}

export type Position = {
	id: number
	name: string
	color?: string
	description: string
	_count: {
		employees: number
	}
	employees?: Employee[]
}

export type EmployeeCompetency = {
	id: number
	employeeId: number
	competencyId: number
	employee: Employee
	competency: Competency
}

export type Competency = {
	id: number
	name: string
	color: string
	EmployeeCompetency?: EmployeeCompetency[]
	_count?: {
		EmployeeCompetency?: number
		Certification?: number
	}
}

export type Certification = {
	id: number
	certif_name: string
	certif_file?: number
	issuing_organization?: string
	issue_year?: number
	issue_month?: number
	expiry_year?: number
	expiry_month?: number
	expire_at?: number
	employeeId: number
	competencyId: number
	competency: Competency
	employee: Employee
}

type Contact = {
	id: number
	value: string
	employeeId: number
	employee: Employee
}

export type Address = {
	id: number
	type: string
	value: string
	employeeId?: number
	employee?: Employee
}

type EmployeeStatusTrack = {
	id: number
	date: Date
	status: boolean
	description?: string
	employeeId: number
	employee: Employee
}

export type CashAdvance = {
	id: number
	amount: string
	employeeId: number
	requestDate: string
	description: string
	employee: Pick<Employee, 'id' | 'fullname'>
}

export type Chart = {
	chartData: {
		position: string
		count: number
		fill: string
	}[]
	chartConfig: {
		[key: string]: {
			label: string
		}[]
	}
}

export type Activity = {
	attachments?: {
		activityId: number
		attachment: string
		id: number
	}[]
	comment: string
	id: number
	name: string
	projectId: number
	replyId: number
	userId: number
	user: User
	replies: Activity[]
	created_at: string
	updated_at: string
	_count: {
		replies: number
		likes: number
	}
}

export type Attachment = {
	id: number
	file: string
	type?: string
	name: string
	uploaded_by?: number | null
	uploaded_at: string
	projectId: number
	isSecret: boolean
}

export type Estimate = {
	id: number
	name: string
	price?: number | null
	qty?: number | null
	projectId: number
}

export type ExpireCertif = {
	certif_name: string
	expire_at: string
	employee: Pick<Employee, 'id' | 'fullname' | 'photo'>
	daysUntilExpiry: number
}

export type ExpireSafety = Pick<
	Employee,
	'id' | 'fullname' | 'photo' | 'safety_induction_date'
> & {
	expire_at: string
	daysUntilExpiry: number
}

export type DashboardTotal = {
	total: {
		employee: number
		project: number
	}
}

export type TopClientChart = {
	chartData: {
		client: string
		count: number
		fill: string
	}[]
	chartConfig: {
		[key: string]: {
			label: string
			color: string
		}
	}
}

export type Recap = {
	id: number
	name: string
	start_date: string
	end_date: string
}

export type RecapReport = {
	employeeId: number
	basic_salary: number
	overtime_salary: number
	fullname: string
	position: string
	attendance:
		| {
				id: number
				date: string
				total_hour: number
				type: 'presence' | 'absent'
		  }[]
		| null

	overtime:
		| { id: number; date: string; total_hour: number; description: string }[]
		| null

	attendanceFee: number
	overtimeFee: number
	totalCashAdvace: number
	attendanceTotal: number
	overtimeTotal: number
	total: number
}

export type EmployeeByProject = {
	employee: {
		fullname: string
		basic_salary: string
	}
}
