import { cn } from '@/utils/cn'
import { useState } from 'react'

type TabProps = {
  label: string
  badge?: string
  children: React.ReactNode
}

type TabsProps = {
  children: React.ReactElement<TabProps>[]
}

export function Tab({ children }: TabProps) {
  return <div>{children}</div>
}

export function Tabs({ children }: TabsProps) {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div className='w-full border-b border-[#EFF0F2] flex gap-6 px-8'>
        {children.map((child, index) => (
          <button
            key={index}
            className={cn(
              'px-2 pb-3 relative flex gap-1 items-center',
              active == index ? 'text-[#5463E8] font-medium' : 'text-[#989CA8]'
            )}
            onClick={() => setActive(index)}
          >
            {child.props.label}
            {!!child.props.badge && (
              <span
                className={cn(
                  'text-white text-xs py-0.5 px-1 rounded',
                  index == active ? 'bg-[#5463E8]' : 'bg-[#989CA8]'
                )}
              >
                {child.props.badge}
              </span>
            )}
            {index === active && (
              <div className='absolute bottom-0 left-0 w-full h-[3px] bg-[#5463E8]'></div>
            )}
          </button>
        ))}
      </div>
      <div>{children[active]}</div>
    </div>
  )
}