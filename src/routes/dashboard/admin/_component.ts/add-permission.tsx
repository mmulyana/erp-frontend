import { useEffect, useState } from 'react'

import { useApiData } from '@/hooks/use-api-data'
import { cn } from '@/utils/cn'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { usePermissionGroup } from '@/hooks/api/use-permission'

import {
  useAddPermissionRole,
  useDetailRole,
  useRemovePermissionRole,
} from '@/hooks/api/use-role'
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent
} from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'

import { Key } from 'lucide-react'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}
export default function AddPermission({ open, setOpen, id }: Props) {
  const { mutate: add } = useAddPermissionRole()
  const { mutate: remove } = useRemovePermissionRole()

  const { data: role } = useApiData(
    useDetailRole({
      enabled: !!id && open,
      id,
    })
  )

  const { data: permissionGroups, isLoading } = useApiData(
    usePermissionGroup({ enabled: open })
  )

  const [defaultTab, setDefaultTab] = useState(0)
  useEffect(() => {
    if (!defaultTab && !isLoading && !!permissionGroups?.length && open) {
      setDefaultTab(permissionGroups[0].id)
    }
  }, [permissionGroups, isLoading, defaultTab, open])

  useEffect(() => {
    if (!open) setDefaultTab(1)
  }, [open])

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={false}>
      <SheetContent className='px-4 overflow-y-auto'>
        <SheetHeader>
          <div className='flex gap-2 items-center pb-2.5 border-b border-line'>
            <div className='h-10 w-10 rounded-lg border-line border flex items-center justify-center'>
              <Key size={20} className='text-dark' />
            </div>
            <div className='text-left'>
              <SheetTitle className='text-base text-dark'>
                Hak istimewa
              </SheetTitle>
              <SheetDescription className='text-sm text-dark/50'>
                Kelola hak istimewa pada peran {role?.name}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <Tabs defaultValue={String(defaultTab)} className='mt-6'>
          <TabsList className='w-full justify-start p-0.5 h-fit mb-0'>
            {permissionGroups?.map((group) => (
              <TabsTrigger
                key={group.id}
                value={group.id.toString()}
                className='px-4 capitalize'
              >
                {group.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {permissionGroups?.map((group) => (
            <TabsContent key={group.id} value={String(group.id)}>
              <div className='rounded-lg border border-line'>
                {group.permissions.map((permission, index) => (
                  <div
                    key={permission.id}
                    className={cn(
                      'flex items-start justify-between p-4',
                      index !== group?.permissions.length - 1 &&
                        'border-b border-line'
                    )}
                  >
                    <div>
                      <h4 className='text-sm font-medium text-dark'>
                        {permission.name}
                      </h4>
                      <p className='text-sm text-dark/50 max-w-[200px]'>
                        {permission.description}
                      </p>
                    </div>
                    <Switch
                      value={permission.key}
                      checked={role?.permissions.includes(permission.key)}
                      onCheckedChange={(val) => {
                        if (!role?.id) return
                        if (val) {
                          add({ roleId: role?.id, permissionId: permission.id })
                        } else {
                          remove({
                            roleId: role?.id,
                            permissionId: permission.id,
                          })
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
