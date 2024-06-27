import { cn } from '@/utils/cn'
import { LucideIcon } from 'lucide-react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { buttonVariants } from '../ui/button'

interface navVertical {
  links: Links[]
}

type Links = {
  title: string
  label?: string
  icon: LucideIcon
  path: string
}

type Props = {
  variant: 'default' | 'vertical'
} & navVertical

export default function Navbar(props: Props) {
  if (props.variant == 'vertical') return <NavbarVertical {...props} />
  return null
}

function NavbarVertical(props: navVertical) {
  const location = useLocation()

  return (
    <div className='flex flex-col gap-4 py-2'>
      <nav className='grid gap-1'>
        {props.links.map((link, index) => {
          const isActive = matchPath({ path: link.path }, location.pathname)
          return (
            <Link
              key={index}
              to={link.path}
              className={cn(
                buttonVariants({ variant: isActive ? 'secondary' : null }),
                'rounded-lg flex justify-between items-center'
              )}
            >
              <div className='flex gap-2 items-center'>
                <link.icon className='h-4 w-4' />
                {link.title}
              </div>
              {link.label && (
                <span
                  className={cn(
                    'font-normal',
                    isActive ? 'text-neutral-800' : 'text-neutral-300'
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
