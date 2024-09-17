import { useEffect, useState } from 'react'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { cn } from '@/utils/cn'
import { Board, Item } from '@/utils/types/api'
import CardProject from '@/components/card-project'
import { ScrollArea } from '@/components/ui/scroll-area'
import { socket } from '@/utils/socket'

export function Kanban() {
  // START HANDLE KANBAN
  const [containers, setContainers] = useState<Board[]>([])
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  useEffect(() => {
    socket.emit('request_board')

    socket.on('initial_data', (data) => {
      setContainers(data)
    })

    socket.on('updated_data', (updatedData) => {
      console.log('there updated', updatedData)
      setContainers(updatedData)
    })

    return () => {
      socket.off('initial_data')
      socket.off('updated_data')
    }
  }, [])

  // Find the value of the items
  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === 'container') {
      return containers.find((item) => item.id === id)
    }
    if (type === 'item') {
      return containers.find((container) =>
        container.items.find((item) => item.id === id)
      )
    }
  }

  const fintItem = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, 'item')
    if (!container) return ''
    const item = container.items.find((item) => item.id === id)
    if (!item) return ''
    return item?.project
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    const { id } = active
    setActiveId(id)
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event

    // Handle Items Sorting
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('item') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, 'item')
      const overContainer = findValueOfItems(over.id, 'item')

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      )
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      )

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      )
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      )
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers]
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        )

        setContainers(newItems)
      } else {
        // In different containers
        let newItems = [...containers]
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        )
        newItems[overContainerIndex].items.splice(overitemIndex, 0, removeditem)
        setContainers(newItems)
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item')
      const overContainer = findValueOfItems(over.id, 'container')

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      )
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      )

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      )

      // Remove the active item from the active container and add it to the over container
      let newItems = [...containers]
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      )
      newItems[overContainerIndex].items.push(removeditem)
      setContainers(newItems)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!active || !over) return

    const activeId = active.id.toString()
    const overId = over.id.toString()

    if (activeId.includes('item')) {
      const activeContainer = findValueOfItems(activeId, 'item')
      const overContainer = overId.includes('container')
        ? findValueOfItems(overId, 'container')
        : findValueOfItems(overId, 'item')

      if (!activeContainer || !overContainer) return

      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      )
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      )

      let newIndex: number

      if (activeContainerIndex === overContainerIndex) {
        newIndex = overContainer.items.findIndex((item) => item.id === overId)
      } else {
        newIndex = overContainer.items.length
      }

      const payload = {
        itemId: activeId,
        position: newIndex,
        containerId: overContainer.id,
      }

      socket.emit('update_order_items', payload)
    }
  }
  // END HANDLE KANBAN

  return (
    <div className='grid grid-cols-4 gap-6 h-full'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={containers.map((i) => i.id)}>
          {containers.map((container) => (
            <Container
              id={container.id}
              name={container.name}
              key={container.id}
            >
              <SortableContext items={container.items.map((i) => i.id)}>
                <div className='flex items-start flex-col gap-y-4'>
                  {container.items.map((i) => (
                    <Items
                      name={i?.project?.name || ''}
                      id={i.id}
                      key={i.id}
                      project={i.project}
                    />
                  ))}
                </div>
              </SortableContext>
            </Container>
          ))}
        </SortableContext>
        <DragOverlay adjustScale={false}>
          {activeId && activeId.toString().includes('item') && (
            <Items
              id={activeId}
              project={fintItem(activeId) || undefined}
              isPreview
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

type ContainerProps = {
  id: UniqueIdentifier
  children: React.ReactNode
  name?: string
}
function Container({ id, children, name }: ContainerProps) {
  const { setNodeRef } = useSortable({
    id: id,
    data: {
      type: 'container',
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'w-full h-full py-4 bg-gray-50 rounded-xl flex flex-col gap-y-4'
      )}
    >
      <div className='mb-2 px-4'>
        <p>{name}</p>
      </div>
      <ScrollArea className='h-[calc(100vh-200px)] px-4'>{children}</ScrollArea>
    </div>
  )
}
const Items = ({
  id,
  name,
  project,
  isPreview = false,
}: Omit<Item, 'containerId' | 'position' | 'id'> & {
  name?: string
  id: UniqueIdentifier
  isPreview?: boolean
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: id,
    data: {
      type: 'item',
    },
  })
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={cn('w-full cursor-pointer')}
    >
      <div {...listeners}>
        <div className={cn(isPreview && 'rotate-6')}>
          <CardProject name={name} {...project} />
        </div>
      </div>
    </div>
  )
}
