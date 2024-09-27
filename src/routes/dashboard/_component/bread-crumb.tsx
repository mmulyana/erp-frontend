import {
  Breadcrumb as BreadCrumbWrapper,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SlashIcon } from 'lucide-react'
import React from 'react'

type BreadcrumbProps = {
  links: {
    href: string
    name: string
  }[]
}
export default function Breadcrumb({ links }: BreadcrumbProps) {
  const lastIndex = links.length - 1

  return (
    <BreadCrumbWrapper>
      <BreadcrumbList>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === lastIndex ? (
                <BreadcrumbPage className='text-[#021328] text-sm font-medium'>
                  {link.name}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={link.href}
                  className='text-[#989CA8] text-sm'
                >
                  {link.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== lastIndex && (
              <BreadcrumbSeparator>
                <SlashIcon className='w-[10px] h-[10px] text-[#989CA8]' />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadCrumbWrapper>
  )
}
