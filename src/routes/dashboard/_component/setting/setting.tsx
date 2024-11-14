import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { atom, useAtom } from 'jotai'
import React, { useState, useEffect } from 'react'
import MenuAccount from './menu-account'
import { cn } from '@/utils/cn'
import MenuPassword from './menu-password'
import {
  ArrowLeft,
  Award,
  ComponentIcon,
  Lock,
  LogOut,
  Map,
  Puzzle,
  Ruler,
  Tag,
  UserCircle,
  X,
} from 'lucide-react'
import MenuCompetency from './menu-competency'
import MenuProjectLabel from './menu-project-label'
import MenuInventoryLabel from './menu-inventory-label'
import MenuInventoryLocation from './menu-inventory-location'
import MenuInventoryMeasurement from './menu-inventory-measurement'
import MenuInventoryBrand from './menu-inventory-brand'
import MenuInventoryCategory from './menu-inventory-category'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/api/use-auth'

const MENUS = {
  account_myaccount: 'Akun',
  account_password: 'Password',
  hris_competency: 'Kompetensi',
  project_label: 'Label',
  inventory_label: 'Label',
  inventory_location: 'Lokasi',
  inventory_measurument: 'Ukuran',
  inventory_brand: 'Merek',
  inventory_category: 'Kategori',
} as const

type MenuKey = keyof typeof MENUS

type SideMenus = {
  name: string
  menus: {
    name: string
    value: MenuKey
    icon: React.ReactNode
  }[]
}[]

const SIDE_MENUS: SideMenus = [
  {
    name: 'Akun',
    menus: [
      {
        name: 'Akun saya',
        value: 'account_myaccount',
        icon: <UserCircle className='w-3.5 h-3.5' />,
      },
      {
        name: 'Password',
        value: 'account_password',
        icon: <Lock className='w-3.5 h-3.5' />,
      },
    ],
  },
  {
    name: 'HRIS',
    menus: [
      {
        name: 'Kompetensi',
        value: 'hris_competency',
        icon: <Award className='w-3.5 h-3.5' />,
      },
    ],
  },
  {
    name: 'Proyek',
    menus: [
      {
        name: 'Label',
        value: 'project_label',
        icon: <Tag className='w-3.5 h-3.5' />,
      },
    ],
  },
  {
    name: 'Inventory',
    menus: [
      {
        name: 'Label',
        value: 'inventory_label',
        icon: <Tag className='w-3.5 h-3.5' />,
      },
      {
        name: 'Lokasi',
        value: 'inventory_location',
        icon: <Map className='w-3.5 h-3.5' />,
      },
      {
        name: 'Ukuran',
        value: 'inventory_measurument',
        icon: <Ruler className='w-3.5 h-3.5' />,
      },
      {
        name: 'Merek',
        value: 'inventory_brand',
        icon: <Puzzle className='w-3.5 h-3.5' />,
      },
      {
        name: 'Kategori',
        value: 'inventory_category',
        icon: <ComponentIcon className='w-3.5 h-3.5' />,
      },
    ],
  },
]

export const settingConfig = atom<{ open: boolean; default?: MenuKey }>({
  open: false,
})

export default function Setting() {
  const { logOut } = useAuth()

  const [config, setConfig] = useAtom(settingConfig)
  useFixPointerEvent(config.open)

  const isMobile = useIsMobile()
  const [showMenu, setShowMenu] = useState(true)

  useEffect(() => {
    if (isMobile && config.open) {
      setShowMenu(true)
    }
  }, [config.open, isMobile])

  useEffect(() => {
    return () => setConfig({ open: false })
  }, [])

  const onClose = () => {
    setConfig((prev) => ({ ...prev, open: false }))
    setShowMenu(true)
  }

  const content: Partial<Record<MenuKey, React.ReactNode>> = {
    account_myaccount: <MenuAccount />,
    account_password: <MenuPassword />,
    hris_competency: <MenuCompetency />,
    project_label: <MenuProjectLabel />,
    inventory_label: <MenuInventoryLabel />,
    inventory_location: <MenuInventoryLocation />,
    inventory_measurument: <MenuInventoryMeasurement />,
    inventory_brand: <MenuInventoryBrand />,
    inventory_category: <MenuInventoryCategory />,
  }

  const handleMenuSelect = (menuKey: MenuKey) => {
    setConfig((prev) => ({
      ...prev,
      default: menuKey,
    }))
    if (isMobile) {
      setShowMenu(false)
    }
  }

  return (
    <Dialog open={config.open} onOpenChange={onClose} modal>
      <DialogContent
        showClose={false}
        close={<CustomClose setOpen={onClose} />}
        className='max-w-[800px] h-[80vh] md:h-fit grid grid-cols-1 md:grid-cols-[200px_1fr] p-0 gap-0 overflow-hidden rounded-2xl relative'
      >
        <div
          className={cn(
            'bg-[#F6F6F6] border-r border-[#E8EBF0] p-2 flex flex-col gap-2 overflow-y-auto',
            isMobile &&
              'absolute inset-0 z-10 transition-transform duration-300',
            isMobile && !showMenu && 'translate-x-[-100%]',
            isMobile && showMenu && 'translate-x-0'
          )}
        >
          {SIDE_MENUS.map((menu, index) => (
            <div key={`${menu}-${index}`}>
              <p className='text-sm text-dark/50 mb-1.5'>{menu.name}</p>
              <div className='flex flex-col gap-2'>
                {menu.menus.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleMenuSelect(item.value)}
                    className={cn(
                      'py-1 px-2 justify-start flex text-dark items-center gap-2 text-sm rounded-md hover:bg-gray-200 transition-colors',
                      !isMobile &&
                        item.value ===
                          (config.default || 'account_myaccount') &&
                        'text-blue-primary'
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <Button className='mt-2 gap-2' variant='destructive' onClick={logOut}>
            Keluar
            <LogOut size={14} />
          </Button>
        </div>

        <div className='flex flex-col h-full'>
          <DialogHeader className='px-4 py-3 border-b border-dashed border-[#E8EBF0] flex items-center text-left'>
            <div className='w-full flex gap-2 flex-col'>
              {isMobile && (
                <Button
                  className='h-8 p-0.5 pr-2 mb-2 inline-flex w-fit gap-1.5'
                  variant='ghost'
                  onClick={() => setShowMenu(true)}
                >
                  <ArrowLeft className='h-4 w-4 text-dark' />
                  Kembali
                </Button>
              )}
              <DialogTitle className='text-dark/80 text-sm'>
                {MENUS[(config.default as MenuKey) || 'account_myaccount']}
              </DialogTitle>
              <DialogDescription className='hidden' />
            </div>
          </DialogHeader>

          <div className='flex-1 overflow-y-auto'>
            {content[(config.default as MenuKey) || 'account_myaccount']}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

type CloseProps = {
  setOpen: (val: boolean) => void
}

function CustomClose({ setOpen }: CloseProps) {
  return (
    <button
      className='absolute top-2 right-2 h-7 w-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors'
      onClick={() => setOpen(false)}
    >
      <X className='h-4 w-4' />
      <span className='sr-only'>Close</span>
    </button>
  )
}
