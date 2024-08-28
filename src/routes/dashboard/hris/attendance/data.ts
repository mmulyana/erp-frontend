import { Position } from '@/utils/types/position'

export const data: Position[] = [
  {
    id: 1,
    name: 'Staff',
    description: '',
    employees: [
      {
        id: 101,
        fullname: 'Mul',
        positionId: 1,
        attendances: [
          {
            id: 1001,
            employeeId: 101,
            date: '2024-08-01',
            total_hour: 1,
          },
          {
            id: 1002,
            employeeId: 101,
            date: '2024-08-02',
            total_hour: 1,
          },
          {
            id: 1003,
            employeeId: 101,
            date: '2024-08-03',
            total_hour: 1,
          },
        ],
        overtime: [
          {
            id: 1,
            date: '2024-08-02',
            total_hour: 4,
            employeeId: 2,
          },
        ],
      },
      {
        id: 103,
        fullname: 'Ikmal',
        positionId: 1,
        attendances: [
          {
            id: 1012,
            employeeId: 102,
            date: '2024-08-02',
            total_hour: 1,
          },
          {
            id: 10,
            employeeId: 102,
            date: '2024-08-03',
            total_hour: 1,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Builder',
    description: '',
    employees: [
      {
        id: 103,
        fullname: 'Kelvin',
        positionId: 2,
        attendances: [
          {
            id: 11212,
            employeeId: 103,
            date: '2024-08-01',
            total_hour: 1,
          },
          {
            id: 1122,
            employeeId: 103,
            date: '2024-08-02',
            total_hour: 2,
          },
        ],
      },
    ],
  },
]

export const dates = [
  {
    date: '2024-08-01',
  },
  {
    date: '2024-08-02',
  },
  {
    date: '2024-08-03',
  },
  {
    date: '2024-08-04',
  },
  {
    date: '2024-08-05',
  },
  {
    date: '2024-08-06',
  },
  {
    date: '2024-08-07',
  },
  {
    date: '2024-08-08',
  },
  {
    date: '2024-08-07',
  },
  {
    date: '2024-08-08',
  },
  {
    date: '2024-08-09',
  },
  {
    date: '2024-08-10',
  },
  {
    date: '2024-08-11',
  },
  {
    date: '2024-08-12',
  },
  {
    date: '2024-08-13',
  },
  {
    date: '2024-08-14',
  },
]
