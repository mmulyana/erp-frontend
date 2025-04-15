import { cn } from '@/shared/utils/cn'
import { atom, useAtom } from 'jotai'
import { createContext, useContext, ReactNode } from 'react'

export const accordionAtom = atom<string[]>([])

type AccordionContextType = {
  openItems: string[]
  toggleItem: (id: string) => void
  allowMultiple: boolean
}

type AccordionItemContextType = {
  id: string
  isOpen: boolean
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
)
const AccordionItemContext = createContext<
  AccordionItemContextType | undefined
>(undefined)

const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be wrapped in <AccordionGroup>')
  }
  return context
}

const useAccordionItem = () => {
  const context = useContext(AccordionItemContext)
  if (!context) {
    throw new Error('Accordion components must be wrapped in <AccordionItem>')
  }
  return context
}

type AccordionGroupProps = {
  children: ReactNode
  allowMultiple?: boolean
}

export const AccordionGroup = ({
  children,
  allowMultiple = false,
}: AccordionGroupProps) => {
  const [openItems, setOpenItems] = useAtom<string[]>(accordionAtom)

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((itemId) => itemId !== id)
          : [...prev, id]
      }
      return prev.includes(id) ? [] : [id]
    })
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div className='w-full space-y-2'>{children}</div>
    </AccordionContext.Provider>
  )
}

type AccordionItemProps = {
  children: ReactNode
  id: string
}

export const AccordionItem = ({ children, id }: AccordionItemProps) => {
  const { openItems } = useAccordion()
  const isOpen = openItems.includes(id)

  return (
    <AccordionItemContext.Provider value={{ id, isOpen }}>
      <div>{children}</div>
    </AccordionItemContext.Provider>
  )
}

type AccordionTriggerProps = {
  children: (isOpen: boolean, toggle: () => void) => ReactNode
}

export const AccordionTrigger = ({ children }: AccordionTriggerProps) => {
  const { toggleItem } = useAccordion()
  const { id, isOpen } = useAccordionItem()

  return (
    <div className='w-full relative'>
      {children(isOpen, () => toggleItem(id))}
    </div>
  )
}

type AccordionContentProps = {
  children: ReactNode
  className?: string
}

export const AccordionContent = ({
  children,
  className,
}: AccordionContentProps) => {
  const { isOpen } = useAccordionItem()

  if (!isOpen) return null

  return <div className={cn('px-4 py-3 bg-gray-50', className)}>{children}</div>
}
