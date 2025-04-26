import { useState, useEffect, useCallback, useRef } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

import {
  DndContext,
  // PointerSensor,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  closestCenter,
  pointerWithin,
  rectIntersection,
  getFirstCollision
} from '@dnd-kit/core'
import {
  MouseSensor,
  TouchSensor
} from '~/customLibraries/DndKitSensors'

import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/generatePlaceholderCard.js'


const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}


function BoardContent({ board, createNewColumn, createNewCard, moveColumns }) {
  // Xu ly sensor

  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10
  //   }
  // })
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  // Xu ly dnd columns
  const [orderedColumns, setOrderedColumns] = useState([])


  // Xu ly phan giu cho
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Diem va cham cuoi cung truoc do
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tim column theo cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card?._id)?.includes(cardId))
  }

  // Function chung xu ly cap nhat state khi keo tha card giua cac column khac nhau
  const updateState = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      // Tim vi tri cua overCard trong column dich (noi ma activeCard sap duoc tha)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      // Tinh toan cardIndex moi (tren hoac duoi cua overCard)
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards?.length + 1

      // Clone mang orderedColumns cu ra mot cai moi de xu ly data roi return, cap nhat lai orderedColumns moi
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // Column cu
      if (nextActiveColumn) {
        // Xoa card o column active cu
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Tao 1 placeholder card khi 1 column bi keo het card
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        // Cap nhat lai mang cardOrderIds cho chuan du lieu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      // Column moi
      if (nextOverColumn) {
        // Kiem tra card dang keo co ton tai ben overColumn chua, neu co thi xoa no di
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Cap nhat lai du lieu columnId trong card ben phia overColumn sau khi keo tha card giua 2 column khac nhau
        const rebuiltActiveDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }

        // Them card dang keo vao overColumn theo index moi
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuiltActiveDraggingCardData)

        // Xoa placeholderCard khi co card khac duoc keo vao
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        // Cap nhat lai mang cardOrderIds cho chuan du lieu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      return nextColumns
    })
  }

  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)

    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN),
    setActiveDragItemData(event?.active?.data?.current)

    // Chi luu old column khi keo card
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    // Neu keo column => kh lam gi ca
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Neu keo card => xu ly de keo card sang cac column khac
    // console.log('handleDragOver', event)
    const { active, over } = event

    if (!active || !over) return

    // Lay du lieu cua card ben trong active va over
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    // Tim 2 columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // Code ben trong chi xu ly TRONG LUC KEO card tren 2 column khac nhau
    if (activeColumn._id !== overColumn._id) {
      updateState(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event

    if (!active || !over) return

    // Xu ly dnd card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // Lay du lieu cua card ben trong active va over
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      // Tim 2 columns theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      // Xu ly keo card tren 2 column khac nhau
      if (oldColumnWhenDraggingCard._id !== overColumn._id) { // Vi du lieu khi qua dragOver da bi set lai nen can phan lay state cua du lieu ngay tu buoc dragStart de gan vao buoc dragEnd
        updateState(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      }
      // Xu ly keo card tren cung 1 column
      else {
        // logic keo card trong cung column giong voi keo column trong cung 1 boardContent

        // Lay vi tri card cu (tu oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(card => card._id === activeDragItemId)
        // Lay vi tri card moi (tu overColumn)
        const newCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
        // arrayMove cua dnd-kit de sap xep lai mang cards
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        // Set lai du lieu theo dndOrderedCards
        setOrderedColumns(prevColumns => {
          // Clone mang orderedColumns cu ra mot cai moi de xu ly data roi return, cap nhat lai orderedColumns moi
          const nextColumns = cloneDeep(prevColumns)

          // Tim column dang tha
          const targetColumn = nextColumns?.find(column => column._id === overColumn._id)

          // set lai du lieu cho cards va cardOrderIds
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          return nextColumns
        })
      }
    }

    // Xu ly dnd column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // Lay vi tri column cu (tu activeColumn)
        const oldColumnIndex = orderedColumns.findIndex(column => column._id === active.id)
        // Lay vi tri column moi (tu overColumn)
        const newColumnIndex = orderedColumns.findIndex(column => column._id === over.id)

        // arrayMove cua dnd-kit de sap xep lai mang columns ban dau
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        setOrderedColumns(dndOrderedColumns)

        // Sau khi ket thuc dnd columns thi can cap nhat lai state board -> kh call API truc tiep o day ma se call API o component cha (_id)
        moveColumns(dndOrderedColumns)
      }
    }

    // Nhung du lieu sau khi keo tha phai dua ve gia tri null mac dinh nhu ban dau
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  // Custom collision detection de fix bug nhap nhay
  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // Tim cac diem giao nhau, va cham voi con tro
    const pointerIntersections = pointerWithin(args)

    // Thuat toan phat hien va cham se tra ve mot mang cac va cham o day
    const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)

    // Tim overId dau tien trong dam intersections o tren
    let overId = getFirstCollision(intersections, 'id')

    if (overId) {
      // Neu over la column thi se tim toi cardId gan nhat ben trong khu vuc va cham do dua vao thuat toan phvc closestCenter or closestCorners
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      // Cam bien
      sensors={sensors}
      // Phat hien va cham: dung closestCorners thay vi closestCenter
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        height: (theme) => theme.trello.boardContentHeight,
        width: '100%',
        padding: '10px 0',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
      }}>
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />

        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
