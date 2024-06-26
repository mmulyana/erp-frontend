import { cn } from '@/utils/cn'
import { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'

interface navVertical {
  links: Links[]
}

type Links = {
  title: string
  label?: string
  icon: LucideIcon
  variant: 'default' | 'ghost' | 'secondary'
}

type Props = {
  variant: 'default' | 'vertical'
} & navVertical

export default function Navbar(props: Props) {
  if (props.variant == 'vertical') return <NavbarVertical {...props} />
  return null
}

function NavbarVertical(props: navVertical) {
  return (
    <div className='flex flex-col gap-4 py-2'>
      <nav className='grid gap-1'>
        {props.links.map((link, index) => (
          <Link
            key={index}
            to='#'
            className={cn(
              buttonVariants({ variant: link.variant, size: 'sm' }),
              link.variant === 'default' && 'justify-start'
            )}
          >
            <link.icon className='mr-2 h-4 w-4' />
            {link.title}
            {link.label && (
              <span
                className={cn(
                  'ml-auto',
                  link.variant === 'default' && 'text-background',
                  link.variant === 'ghost' && 'text-neutral-400'
                )}
              >
                {link.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  )
}
