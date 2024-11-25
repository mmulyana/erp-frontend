import { useLocation, matchPath } from 'react-router-dom'
import { useMemo } from 'react'

import { PATH } from '@/utils/constant/_paths'

export const useActiveMenu = () => {
  const { pathname } = useLocation()

  return useMemo(() => {
    const activeStates = {
      activeMenu: '',
      activeSubMenu: '',
      path: '',
    }

    Object.entries(PATH).forEach(([_, value]) => {
      const match = matchPath(value, pathname)
      if (match) {
        activeStates.path = value
      }
    })

    if (!activeStates.path) {
      activeStates.path = pathname
    }

    // Inventory
    else if (pathname.includes('/dashboard/inventory')) {
      activeStates.activeMenu = 'inventory'
      if (pathname.includes('/dashboard/inventory/manage')) {
        activeStates.activeSubMenu = 'Kelola'
      }
    }

    return activeStates
  }, [pathname])
}
