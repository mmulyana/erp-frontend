// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import { format, isEqual, isSunday, parseISO } from 'date-fns'
// import { cn } from '@/utils/cn'
// import React, { useId } from 'react'
// import { PATH } from '@/utils/constant/_paths'
// import { id } from 'date-fns/locale'
// import Search from '@/components/common/search'
// import { useTitle } from '@/routes/dashboard/_component/header'
// import Container from '@/routes/dashboard/_component/container'
// import { DashboardLayout } from '@/routes/dashboard/_component/layout'

// const links = [
//   {
//     name: 'Dashboard',
//     path: PATH.DASHBOARD_OVERVIEW,
//   },
//   {
//     name: 'Absensi',
//     path: PATH.EMPLOYEE_ATTENDANCE,
//   },

// ]

// export default function TableDemo() {
//   useTitle(links)

//   return (
//     <DashboardLayout>
//       <Container className='space-y-4'>
//         <div className='flex justify-between items-center mb-4'>
//           <div className='flex gap-4'>
//             <div className='max-w-[180px]'>
//               <Search />
//             </div>
//           </div>
//         </div>

//         <Table className='border'>
//           <TableHeader className='bg-[#F9FAFB]'>
//             <TableRow>
//               <TableHead className='min-w-[200px]'></TableHead>
//               {dates.map((d, index) => {
//                 return (
//                   <TableHead
//                     key={index}
//                     colSpan={2}
//                     className={cn('text-center border')}
//                   >
//                     <p className='text-xs text-[#313951]/50'>
//                       {format(d.date, 'EE', { locale: id })}
//                     </p>
//                     <p className='text-sm text-[#313951]'>
//                       {format(d.date, 'd')}
//                     </p>
//                   </TableHead>
//                 )
//               })}
//               <TableHead colSpan={2} className='text-center'>
//                 <p>Jumlah</p>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             <TableRow>
//               <TableCell></TableCell>
//               {dates.map((d, index) => {
//                 const dateParse = parseISO(d.date)
//                 const isWeekend = isSunday(dateParse)

//                 return (
//                   <React.Fragment key={index}>
//                     <TableCell
//                       className={cn(
//                         'border min-w-8',
//                         isWeekend && 'bg-red-400'
//                       )}
//                     >
//                       H
//                     </TableCell>
//                     <TableCell
//                       className={cn(
//                         'border min-w-8',
//                         isWeekend && 'bg-red-400'
//                       )}
//                     >
//                       J
//                     </TableCell>
//                   </React.Fragment>
//                 )
//               })}
//               <TableCell className='border'>Hari</TableCell>
//               <TableCell className='border'>Jam</TableCell>
//             </TableRow>
//             {data.map((d) => (
//               <React.Fragment key={d.id}>
//                 <TableRow>
//                   <TableCell className='font-medium sticky left-0 bg-[#F9FAFB]'>
//                     {d.name}
//                   </TableCell>
//                   <TableCell colSpan={34} className='bg-[#F9FAFB]'></TableCell>
//                 </TableRow>
//                 {!!d.employees?.length &&
//                   d?.employees.map((emp) => {
//                     const attendanceHours =
//                       !!emp.attendances?.length &&
//                       emp?.attendances?.reduce(
//                         (sum, attendance) => sum + attendance.total_hour,
//                         0
//                       )
//                     const overtimeHours =
//                       !!emp.overtime?.length &&
//                       emp.overtime.reduce(
//                         (sum, overtime) => sum + overtime.total_hour,
//                         0
//                       )

//                     return (
//                       <TableRow key={emp.id}>
//                         <TableCell className='sticky left-0 p-0 h-8 bg-white z-10'>
//                           <div className='w-full min-h-full bg-white border-r flex pl-4 items-center'>
//                             {emp.fullname}
//                           </div>
//                         </TableCell>
//                         {dates.map((date) => {
//                           const id = useId()
//                           const attendance = emp.attendances?.find((att) =>
//                             isEqual(parseISO(att.date), parseISO(date.date))
//                           )
//                           const overtime = emp.overtime?.find((att) =>
//                             isEqual(parseISO(att.date), parseISO(date.date))
//                           )
//                           const dateParse = parseISO(date.date)
//                           const isWeekend = isSunday(dateParse)

//                           return (
//                             <React.Fragment key={id}>
//                               <TableCell
//                                 className={cn(
//                                   'text-center border hover:bg-blue-100',
//                                   isWeekend && 'bg-red-400 hover:bg-red-300'
//                                 )}
//                               >
//                                 {attendance ? attendance.total_hour : ''}
//                               </TableCell>
//                               <TableCell
//                                 className={cn(
//                                   'text-center border hover:bg-blue-100',
//                                   isWeekend && 'bg-red-400 hover:bg-red-300'
//                                 )}
//                               >
//                                 {overtime ? overtime.total_hour : ''}
//                               </TableCell>
//                             </React.Fragment>
//                           )
//                         })}
//                         <TableCell className='border text-center'>
//                           {attendanceHours}
//                         </TableCell>
//                         <TableCell className='border text-center'>
//                           {overtimeHours}
//                         </TableCell>
//                       </TableRow>
//                     )
//                   })}
//               </React.Fragment>
//             ))}
//           </TableBody>
//         </Table>
//       </Container>
//     </DashboardLayout>
//   )
// }

// export const data: Position[] = [
//   {
//     id: 1,
//     name: 'Staff',
//     description: '',
//     employees: [
//       {
//         id: 101,
//         fullname: 'Mul',
//         positionId: 1,
//         attendances: [
//           {
//             id: 1001,
//             employeeId: 101,
//             date: '2024-08-01',
//             total_hour: 1,
//           },
//           {
//             id: 1002,
//             employeeId: 101,
//             date: '2024-08-02',
//             total_hour: 1,
//           },
//           {
//             id: 1003,
//             employeeId: 101,
//             date: '2024-08-03',
//             total_hour: 1,
//           },
//         ],
//         overtime: [
//           {
//             id: 1,
//             date: '2024-08-02',
//             total_hour: 4,
//             employeeId: 2,
//           },
//         ],
//       },
//       {
//         id: 103,
//         fullname: 'Ikmal',
//         positionId: 1,
//         attendances: [
//           {
//             id: 1012,
//             employeeId: 102,
//             date: '2024-08-02',
//             total_hour: 1,
//           },
//           {
//             id: 10,
//             employeeId: 102,
//             date: '2024-08-03',
//             total_hour: 1,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'Builder',
//     description: '',
//     employees: [
//       {
//         id: 103,
//         fullname: 'Kelvin',
//         positionId: 2,
//         attendances: [
//           {
//             id: 11212,
//             employeeId: 103,
//             date: '2024-08-01',
//             total_hour: 1,
//           },
//           {
//             id: 1122,
//             employeeId: 103,
//             date: '2024-08-02',
//             total_hour: 2,
//           },
//         ],
//       },
//     ],
//   },
// ]

// export const dates = [
//   {
//     date: '2024-08-01',
//   },
//   {
//     date: '2024-08-02',
//   },
//   {
//     date: '2024-08-03',
//   },
//   {
//     date: '2024-08-04',
//   },
//   {
//     date: '2024-08-05',
//   },
//   {
//     date: '2024-08-06',
//   },
//   {
//     date: '2024-08-07',
//   },
//   {
//     date: '2024-08-08',
//   },
//   {
//     date: '2024-08-07',
//   },
//   {
//     date: '2024-08-08',
//   },
//   {
//     date: '2024-08-09',
//   },
//   {
//     date: '2024-08-10',
//   },
//   {
//     date: '2024-08-11',
//   },
//   {
//     date: '2024-08-12',
//   },
//   {
//     date: '2024-08-13',
//   },
//   {
//     date: '2024-08-14',
//   },
// ]
