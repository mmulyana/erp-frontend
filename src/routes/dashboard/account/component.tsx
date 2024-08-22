import { DashboardLayout } from '../component'

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <DashboardLayout>
      <div className='max-w-full mx-auto px-4 pt-2.5'>
        <div className='mb-4'>
          <p className='text-gray-800'>Account & Role Management</p>
        </div>
        <div className='pb-10'>{children}</div>
      </div>
    </DashboardLayout>
  )
}
