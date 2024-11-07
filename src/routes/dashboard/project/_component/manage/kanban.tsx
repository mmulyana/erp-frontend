import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'
import { Board } from '@/utils/types/api'
import CardProject from '@/components/card-project'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { socket } from '@/utils/socket'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useSidebar } from '@/components/ui/sidebar'
import useScreenWidth from '@/hooks/use-screen-width'

export default function Kanban() {
  const [containers, setContainers] = useState<Board[]>([])

  const { state, isMobile } = useSidebar()

  useEffect(() => {
    socket.emit('request_board')

    socket.on('initial_data', (data) => {
      setContainers(data)
    })

    socket.on('updated_data', (updatedData) => {
      setContainers(updatedData)
    })

    return () => {
      socket.off('initial_data')
      socket.off('updated_data')
    }
  }, [])

  function onDragEnd({ destination, source }: any) {
    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Find source and destination containers
    const sourceContainer = containers.find((c) => c.id === source.droppableId)
    const destContainer = containers.find(
      (c) => c.id === destination.droppableId
    )

    if (!sourceContainer || !destContainer) {
      return
    }

    // Create new array of items for the source container
    const newSourceItems = Array.from(sourceContainer.items)
    // Remove the dragged item from the source
    const [removedItem] = newSourceItems.splice(source.index, 1)

    if (!removedItem) {
      return
    }

    // Create new array of items for the destination container
    const newDestItems =
      source.droppableId === destination.droppableId
        ? newSourceItems
        : Array.from(destContainer.items)

    // Insert the item into the destination
    newDestItems.splice(destination.index, 0, removedItem)

    // Create a new state array
    const newContainers = containers.map((container) => {
      if (container.id === source.droppableId) {
        return { ...container, items: newSourceItems }
      }
      if (container.id === destination.droppableId) {
        return { ...container, items: newDestItems }
      }
      return container
    })

    // Update the state
    setContainers(newContainers)
    socket.emit('update_order_items', { destination, source })
  }

  const width = useScreenWidth()

  return (
    <ScrollArea
      className={cn(
        'pb-3 w-[calc(100vw-18rem)]',
        state === 'collapsed' && 'w-[calc(100vw-5rem)]'
      )}
      style={{
        width: isMobile ? width - 32 + 'px' : '',
      }}
    >
      <div className={cn('h-full flex gap-2 relative')}>
        <DragDropContext onDragEnd={onDragEnd}>
          {containers.map((container) => (
            <div
              key={container.id}
              className='bg-[#F6F7F9] rounded-xl w-[264px] relative overflow-hidden'
            >
              <Droppable droppableId={container.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      'pt-10 px-1 border-2 border-transparent rounded-xl',
                      snapshot.isDraggingOver && 'border-blue-primary/80'
                    )}
                  >
                    <KanbanHead color={container.color} name={container.name} />
                    <ScrollArea className={cn('h-[calc(100vh-272px)] px-0.5')}>
                      {container.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <CardProject {...item.project} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </ScrollArea>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}

function KanbanHead({ color, name }: { color: string; name: string }) {
  return (
    <div className='px-4 flex gap-2 items-center mb-3 pt-[10px] absolute left-0 top-0 rounded-xl'>
      <div
        className='h-5 w-[5px] rounded-lg border-[3px]'
        style={{ borderColor: color }}
      ></div>
      <p className='capitalize pb-0.5'>{name}</p>
    </div>
  )
}
