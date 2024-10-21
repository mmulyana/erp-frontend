import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { atom, useAtom } from 'jotai'
import React from 'react'
import MenuAccount from './menu-account'
import { cn } from '@/utils/cn'
import MenuPassword from './menu-password'
import { X } from 'lucide-react'
import MenuCompetency from './menu-competency'
import MenuProjectLabel from './menu-project-label'
import MenuInventoryLabel from './menu-inventory-label'
import MenuInventoryLocation from './menu-inventory-location'
import MenuInventoryMeasurement from './menu-inventory-measurement'

const MENUS = {
  account_myaccount: 'Akun',
  account_password: 'Password',
  hris_competency: 'Kompetensi',
  project_label: 'Label',
  inventory_label: 'Label',
  inventory_location: 'Lokasi',
  inventory_measurument: 'Ukuran',
  inventory_brand: 'Merek',
} as const
type MenuKey = keyof typeof MENUS

type SideMenus = {
  name: string
  menus: {
    name: string
    value: MenuKey
  }[]
}[]

const SIDE_MENUS: SideMenus = [
  {
    name: 'Akun',
    menus: [
      {
        name: 'Akun saya',
        value: 'account_myaccount',
      },
      {
        name: 'Password',
        value: 'account_password',
      },
    ],
  },
  {
    name: 'HRIS',
    menus: [
      {
        name: 'Kompetensi',
        value: 'hris_competency',
      },
    ],
  },
  {
    name: 'Proyek',
    menus: [
      {
        name: 'Label',
        value: 'project_label',
      },
    ],
  },
  {
    name: 'Inventory',
    menus: [
      {
        name: 'Label',
        value: 'inventory_label',
      },
      {
        name: 'Lokasi',
        value: 'inventory_location',
      },
      {
        name: 'Ukuran',
        value: 'inventory_measurument',
      },
      {
        name: 'Merek',
        value: 'inventory_brand',
      },
    ],
  },
]

export const settingConfig = atom<{ open: boolean; default?: MenuKey }>({
  open: false,
})

export default function Setting() {
  const [config, setConfig] = useAtom(settingConfig)
  useFixPointerEvent(config.open)

  const onClose = () => setConfig((prev) => ({ ...prev, open: false }))

  const content: Partial<Record<MenuKey, React.ReactNode>> = {
    account_myaccount: <MenuAccount />,
    account_password: <MenuPassword />,
    hris_competency: <MenuCompetency />,
    project_label: <MenuProjectLabel />,
    inventory_label: <MenuInventoryLabel />,
    inventory_location: <MenuInventoryLocation />,
    inventory_measurument: <MenuInventoryMeasurement />,
  }

  return (
    <Dialog open={true} onOpenChange={onClose} modal>
      <DialogContent
        showClose={false}
        close={<CustomClose setOpen={onClose} />}
        className='max-w-[800px] h-fit grid grid-cols-[200px_1fr] p-0 gap-0 overflow-hidden rounded-2xl'
      >
        <div className='bg-[#F6F6F6] border-r border-[#E8EBF0] p-6 flex flex-col gap-5'>
          {SIDE_MENUS.map((menu, index) => (
            <div key={`${menu}-${index}`}>
              <p className='text-sm text-dark/50 mb-3'>{menu.name}</p>
              <div className='flex flex-col gap-2'>
                {menu.menus.map((item) => (
                  <button
                    key={item.value}
                    onClick={() =>
                      setConfig((prev) => ({ ...prev, default: item.value }))
                    }
                    className={cn(
                      'py-0 justify-start flex text-dark text-sm',
                      item.value === (config.default || 'account_myaccount') &&
                        'text-blue-primary'
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <DialogHeader className='px-4 py-2 border-b border-dashed border-[#E8EBF0] h-fit'>
            <DialogTitle className='text-dark/80 text-sm'>
              {MENUS[(config.default as MenuKey) || 'account_myaccount']}
            </DialogTitle>
            <DialogDescription className='hidden' />
          </DialogHeader>
          {content[(config.default as MenuKey) || 'hris_competency']}
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
    <div className='absolute top-0 right-2 h-9 flex items-center'>
      <button
        className='h-7 w-7 flex justify-center items-center rounded'
        onClick={() => setOpen(false)}
      >
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </button>
    </div>
  )
}
