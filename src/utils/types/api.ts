export type Projects = {
  id: number
  name: string
  startDate?: Date
  budget?: number
  priority: 'low' | 'medium' | 'high' | 'urgent'
  boardItemsId: string
  clientId: number
  boardItems: {
    id: string
    position: number
    containerId: string
  }
  labels: Array<{
    label: {
      id: number
      name: string
      color: string
    }
  }>
  employees: {
    employee: {
      fullname: string
      photo?: string
    }
  }[]
  comments: {
    comment: string
  }[]
  client: {
    name: string
    company: {
      logo: string
    }
  }
  _count: {
    employees: number
    comments: number
  }
}
