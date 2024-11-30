import { Grid, Table } from 'lucide-react'
import { atom, useAtom } from 'jotai'
import { cn } from '@/utils/cn'

import { TEST_ID } from '@/utils/constant/_testId'

export const viewAtom = atom('grid')

const ViewToggle = () => {
  const [view, setView] = useAtom(viewAtom)

  return (
    <div
      className='flex gap-2 bg-gray-100 p-1 rounded-lg h-fit'
      id={TEST_ID.TOGGLE_ATTENDANCE}
      data-testid={TEST_ID.TOGGLE_ATTENDANCE}
    >
      <button
        onClick={() => setView('grid')}
        className={cn(
          'flex items-center gap-2 px-3 py-0 rounded h-6',
          view === 'grid'
            ? 'bg-white shadow text-blue-primary'
            : 'text-gray-600 hover:bg-gray-200'
        )}
        id={TEST_ID.TOGGLE_GRID_ATTENDANCE}
        data-testid={TEST_ID.TOGGLE_GRID_ATTENDANCE}
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
        id={TEST_ID.TOGGLE_TABLE_ATTENDANCE}
        data-testid={TEST_ID.TOGGLE_TABLE_ATTENDANCE}
      >
        <Table size={16} />
        <span className='text-xs leading-none'>Table</span>
      </button>
    </div>
  )
}

export default ViewToggle
