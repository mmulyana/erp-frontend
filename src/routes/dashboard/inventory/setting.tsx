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

export default function Settings() {
  return (
    <DashboardLayout>
      <TabsV3
        className='pt-4'
        renderAction={() => (
          <div className='flex gap-2 items-center justify-end'>
            <SearchV2 />
            <Button>Tambah</Button>
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
    </DashboardLayout>
  )
}
