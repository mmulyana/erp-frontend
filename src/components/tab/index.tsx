import { cn } from '@/utils/cn'
import { useMediaQuery } from '@uidotdev/usehooks'
import React, { useMemo, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { buttonVariants } from '../ui/button'
import { ListIcon } from 'lucide-react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

type TabProps = {
  label: string
  index?: number
  badge?: string
  id?: string
  children: React.ReactNode
  hidden?: boolean
}
type TabV3Props = TabProps & {
  title?: React.ReactNode
}

type TabsProps = {
  children: React.ReactElement<TabProps>[]
  className?: string
  action?: React.ReactNode
}

export function Tab({ children }: TabProps) {
  return <div>{children}</div>
}
export function TabV3({ children }: TabV3Props) {
  return <div>{children}</div>
}

export function Tabs({ children, className }: TabsProps) {
  const [active, setActive] = useState(0)
  return (
    <div>
      <ScrollArea>
        <div
          className={cn(
            'w-full border-b border-[#EFF0F2] flex gap-6 px-4 relative',
            className
          )}
        >
          {children.map(
            (child, index) =>
              !child.props.hidden && (
                <button
                  key={index}
                  className={cn(
                    'px-2 pb-3 relative flex gap-1 items-center',
                    active == index
                      ? 'text-[#5463E8] font-medium'
                      : 'text-[#989CA8]'
                  )}
                  onClick={() => setActive(index)}
                  id={child.props.id}
                  data-testid={child.props.id}
                >
                  {child.props.label}
                  {!!child.props.badge && (
                    <span
                      className={cn(
                        'text-white text-xs py-0.5 px-1.5 rounded-full',
                        index == active ? 'bg-[#5463E8]' : 'bg-[#989CA8]'
                      )}
                    >
                      {child.props.badge}
                    </span>
                  )}
                  {index === active && (
                    <div className='absolute bottom-0 left-0 w-full h-[3px] bg-[#5463E8] rounded-t-lg'></div>
                  )}
                </button>
              )
          )}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      <div>{children[active]}</div>
    </div>
  )
}

export function TabsV2({
  children,
  setActive,
  active,
  hideBorder,
}: TabsProps & {
  setActive: (...param: any) => void
  active: number
  hideBorder?: boolean
}) {
  return (
    <div
      className={cn(
        'w-full flex gap-6 px-4',
        !hideBorder && 'border-b border-[#EFF0F2] '
      )}
    >
      {children.map((child, index) => (
        <button
          key={index}
          className={cn(
            'px-2 pb-3 relative flex gap-1 items-center',
            active == child.props.index
              ? 'text-[#5463E8] font-medium'
              : 'text-[#989CA8]'
          )}
          onClick={() => setActive(index)}
        >
          {child.props.children}
          {active == child.props.index && (
            <div className='absolute bottom-0 left-0 w-full h-[3px] bg-[#5463E8] rounded-t-lg'></div>
          )}
        </button>
      ))}
    </div>
  )
}

export function TabsV3({
  children,
  className,
  renderAction,
  activeClassName,
  onActiveChange,
}: Omit<TabsProps, 'children'> & {
  renderAction?: (index: number) => React.ReactNode
  className?: string
  activeClassName?: string
  children: React.ReactElement<TabV3Props>[]
  onActiveChange?: (val: number) => void
}) {
  const [active, setActive] = useState(0)

  const isSmall = useMediaQuery('only screen and (max-width : 768px)')
  const handleActive = (value: string) => {
    setActive(Number(value))
    onActiveChange && onActiveChange(Number(value))
  }

  const activeMenu = useMemo(() => {
    const menus = children.map((child) => ({
      label: child.props.label,
      index: child.props.index,
    }))

    let index = menus.findIndex((menu) => menu.index === active)
    return menus[index].label
  }, [active])

  return (
    <>
      <div className='flex justify-between items-center px-4 border-b border-transparent md:border-[#EFF0F2] gap-4 py-2 md:py-0'>
        {isSmall ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'px-2.5 gap-2'
                )}
              >
                <ListIcon className='w-4 h-4' />
                <p className='text-sm text-[#313951]'>{activeMenu}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='ml-4'>
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={active.toString()}
                onValueChange={handleActive}
              >
                {children.map((child, index) => (
                  <DropdownMenuRadioItem key={index} value={index.toString()}>
                    {child.props.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div
            className={cn(
              'w-full flex gap-6 relative border-b md:border-transparent border-[#EFF0F2]',
              className
            )}
          >
            {children.map((child, index) => (
              <button
                key={index}
                className={cn(
                  'px-2 pb-3 relative flex gap-1 items-center text-[#989CA8]',
                  active == index && activeClassName
                )}
                onClick={() => {
                  setActive(index)
                  onActiveChange && onActiveChange(index)
                }}
              >
                {child.props.title || child.props.label}
                {index === active && (
                  <div className='absolute -bottom-0.5 left-0 w-full h-[3px] bg-[#5463E8] rounded-t-lg'></div>
                )}
              </button>
            ))}
          </div>
        )}
        {renderAction && renderAction(active)}
      </div>
      <div>{children[active]}</div>
    </>
  )
}
