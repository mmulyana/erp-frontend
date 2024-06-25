'use client'

import { LucideIcon } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface NavProps {
  links: {
    title: string
    label?: string
    icon: LucideIcon
    variant: 'default' | 'ghost' | 'secondary'
  }[]
}

export function Nav({ links }: NavProps) {
  return (
    <div className='flex flex-col gap-4 py-2'>
      <nav className='grid gap-1'>
        {links.map((link, index) => (
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
