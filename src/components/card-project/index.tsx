import { cn } from '@/utils/cn'
import { MessageCircle } from 'lucide-react'

export default function CardProject(props: any) {
  return (
    <div className={cn('w-full h-fit rounded-[8px] border border-[#DCE1EB] bg-white px-3 pt-3 pb-[10px] mb-2')}>
      {props.client && (
        <div className='border-full p-1 border border-[#F3F4F8] inline-flex gap-2 rounded-full pr-2'>
          <img
            src={props?.client?.company?.logo}
            className='w-4 h-4 rounded-full shadow-lg'
          />
          <p className='text-xs'>{props?.client?.name}</p>
        </div>
      )}
      <p className={cn('text-[#4E4F52] font-medium', props.client && 'mt-2')}>
        {props.name}
      </p>
      <div
        className={cn('flex gap-2 flex-wrap', !!props?.labels?.length && 'mt-2')}
      >
        {!!props?.labels?.length &&
          props.labels.map((item: any, index: number) => (
            <div
              className='pl-2 pr-2.5 py-0.5 rounded-full bg-[#5463E8]/10 flex gap-1 items-center pb-1'
              key={index}
            >
              <div className='w-1 h-1 rounded-full bg-[#5463E8]'></div>
              <p className='text-xs text-[#5463E8]'>{item.label.name}</p>
            </div>
          ))}
      </div>
      <div className='flex justify-between items-center mt-4'>
        <div className='flex gap-2'>
          <div className='flex gap-1 items-center'>
            <MessageCircle className='w-4 h-4 text-[#CACCD3]' />
            <p className='text-sm'>{props?._count.comments}</p>
          </div>
        </div>
        <div className={cn(!!props.employees?.length && 'flex justify-end')}>
          {!!props.employees?.length && props.employees?.length >= 5 ? (
            <>
              {props.employees.slice(0, 3).map((emp: any, index: number) => (
                <div
                  className={cn(
                    'w-7 h-7 rounded-full overflow-hidden',
                    index > 0 && '-ml-2',
                    !emp.employee.photo &&
                      'bg-blue-500 flex justify-center items-center -ml-2 border-2 border-white'
                  )}
                  key={index}
                >
                  {emp.employee.photo ? (
                    <img
                      className='w-7 h-7 rounded-full border-2 border-white'
                      src={emp.employee.photo}
                    />
                  ) : (
                    <p className='uppercase text-white text-sm pb-0.5'>
                      {emp.employee.fullname.at(0)}
                    </p>
                  )}
                </div>
              ))}
              <div className='w-7 h-7 rounded-full bg-[#E5E8F0] text-[#7D828D] text-sm font-medium -ml-2 border-2 border-white flex items-center justify-center pb-0.5'>
                {props._count.employees - 3}
              </div>
            </>
          ) : (
            props.employees.map((emp: any, index: number) => (
              <div
                className={cn(
                  'w-7 h-7 rounded-full overflow-hidden',
                  index > 0 && '-ml-2',
                  !emp.employee.photo &&
                    'bg-blue-500 flex justify-center items-center -ml-2 border-2 border-white'
                )}
                key={index}
              >
                {emp.employee.photo ? (
                  <img
                    className='w-7 h-7 rounded-full border-2 border-white'
                    src={emp.employee.photo}
                  />
                ) : (
                  <p className='uppercase text-white text-sm pb-0.5'>
                    {emp.employee.fullname.at(0)}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
