import { Grid, Table } from 'lucide-react'
import { atom, useAtom } from 'jotai'
import { cn } from '@/utils/cn'

export const viewAtom = atom('grid')

const ViewToggle = () => {
  const [view, setView] = useAtom(viewAtom)

  return (
    <div className='flex gap-2 bg-gray-100 p-1 rounded-lg h-fit'>
      <button
        onClick={() => setView('grid')}
        className={cn(
          'flex items-center gap-2 px-3 py-0 rounded h-6',
          view === 'grid'
            ? 'bg-white shadow text-blue-primary'
            : 'text-gray-600 hover:bg-gray-200'
        )}
      >
        <Grid size={16} />
        <span className='text-xs leading-none'>Grid</span>
      </button>
      <button
        onClick={() => setView('table')}
        className={cn(
          'flex items-center gap-2 px-3 py-0 rounded h-6',
          view === 'table'
            ? 'bg-white shadow text-blue-primary'
            : 'text-gray-600 hover:bg-gray-200'
        )}
      >
        <Table size={16} />
        <span className='text-xs leading-none'>Table</span>
      </button>
    </div>
  )
}

export default ViewToggle
