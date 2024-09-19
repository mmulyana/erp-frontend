import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'
import { Board } from '@/utils/types/api'
import CardProject from '@/components/card-project'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { socket } from '@/utils/socket'
import ListProject from '@/components/list-project'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

type View = 'kanban' | 'list'
type Props = {
  view: View
}

export function Mode({ view }: Props) {
  // START HANDLE KANBAN
  const [containers, setContainers] = useState<Board[]>([])

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

  return (
    <ScrollArea className='w-full whitespace-nowrap'>
      <div
        className={cn(
          'h-full',
          view === 'kanban' && 'flex gap-2 relative',
          view === 'list' && 'flex flex-col flex-nowrap'
        )}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {containers.map((container) => (
            <div
              className={cn(
                view === 'kanban' &&
                  'bg-gray-50 rounded-xl w-[260px] relative overflow-hidden',
                view === 'list' && 'bg-[#F6F7F9] border-y border-[#EFF0F2]'
              )}
            >
              <div
                className={cn(
                  'px-4 flex gap-2 items-center',
                  view == 'kanban' &&
                    'mb-3 pt-[10px] absolute left-0 top-0 rounded-xl',
                  view == 'list' && 'py-2'
                )}
              >
                <div
                  className='h-3 w-3 rounded-full border-[3px]'
                  style={{ borderColor: container.color }}
                ></div>
                <p className='capitalize pb-0.5'>{container.name}</p>
              </div>
              <Droppable droppableId={container.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      view === 'kanban' &&
                        'pt-10 border-[4px] border-transparent rounded-xl',
                      snapshot.isDraggingOver &&
                        view == 'kanban' &&
                        'border-blue-400'
                    )}
                  >
                    <ScrollArea
                      className={cn(
                        view === 'kanban' && 'h-[calc(100vh-168px)] px-1',
                        view === 'list' && 'min-h-[2px] h-fit',
                        view === 'list' &&
                          snapshot.isDraggingOver &&
                          'bg-red-200 min-h-[40px] h-fit'
                      )}
                    >
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
                              {view == 'kanban' ? (
                                <CardProject {...item.project} />
                              ) : (
                                <ListProject {...item.project} />
                              )}
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
