import { TabsV3, TabV3 } from '@/components/tab'
import { DashboardLayout } from '../_component/layout'
import SearchV2 from '@/components/common/search/search-v2'
import Filter from '@/components/common/filter'
import { Button } from '@/components/ui/button'
import Container from '../_component/container'
import { DataBrand, DataCategory } from './_component/setting/component'

export default function Settings() {
  return (
    <DashboardLayout>
      <TabsV3
        className='pt-4'
        renderAction={() => (
          <div className='flex gap-2 items-center justify-end'>
            <SearchV2 />
            <Filter></Filter>
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
          <p>Lokasi</p>
        </TabV3>
        <TabV3 label='Ukuran' index={3}>
          <p>Ukuran</p>
        </TabV3>
        <TabV3 label='Tag' index={4}>
          <p>Tag</p>
        </TabV3>
      </TabsV3>
    </DashboardLayout>
  )
}
