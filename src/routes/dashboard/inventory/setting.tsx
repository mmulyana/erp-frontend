import { TabsV3, TabV3 } from '@/components/tab'
import { DashboardLayout } from '../_component/layout'
import SearchV2 from '@/components/common/search/search-v2'
import { Button } from '@/components/ui/button'
import Container from '../_component/container'
import {
  DataBrand,
  DataCategory,
  DataLocation,
  DataMeasurement,
  DataTag,
} from './_component/setting/component'
import { useEffect, useState } from 'react'
import { FormBrand, FormCategory } from './_component/setting/form'
import Modal from '@/components/modal-v2'

export default function Settings() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)

  const form: any = {
    0: <FormBrand onClose={setOpen} />,
    1: <FormCategory onClose={setOpen} />,
  }

  useEffect(() => {
    setOpen(false)

    return () => setOpen(false)
  }, [active])

  return (
    <DashboardLayout>
      <TabsV3
        className='pt-4'
        onActiveChange={setActive}
        renderAction={() => (
          <div className='flex gap-2 items-center justify-end'>
            <SearchV2 />
            <Button
              onClick={() => {
                setOpen(true)
              }}
            >
              Tambah
            </Button>
          </div>
        )}
      >
        <TabV3 label='Merek' index={0}>
          <Container>
            <DataBrand />
          </Container>
        </TabV3>
        <TabV3 label='Kategori' index={1}>
          <Container>
            <DataCategory />
          </Container>
        </TabV3>
        <TabV3 label='Lokasi' index={2}>
          <Container>
            <DataLocation />
          </Container>
        </TabV3>
        <TabV3 label='Ukuran' index={3}>
          <Container>
            <DataMeasurement />
          </Container>
        </TabV3>
        <TabV3 label='Tag' index={4}>
          <Container>
            <DataTag />
          </Container>
        </TabV3>
      </TabsV3>
      <Modal open={open} setOpen={setOpen} title='Buat baru'>
        {form[active]}
      </Modal>
    </DashboardLayout>
  )
}
