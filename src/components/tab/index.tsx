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
      {children.map((child, index) => (
        <button key={index} className={cn()} onClick={() => setActive(index)}>
          {child.props.label}
          {!!child.props.badge && <span>{child.props.badge}</span>}
        </button>
      ))}
      <div>{children[active]}</div>
    </div>
  )
}
