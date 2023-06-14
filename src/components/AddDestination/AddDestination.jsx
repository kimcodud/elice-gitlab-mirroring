import React, { useState, useCallback, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function AddDestination({
  selectedPlaces,
  isAll,
  selectedDayPlaces,
  setSelectedDayPlaces,
}) {
  const [items, setItems] = useState(selectedPlaces); //넘어온 전체 목록

  console.log('items', items);

  // const handleEnd = (result) => {
  //   console.log('daylist', dayList);
  //   console.log(
  //     '?',
  //     items.itinerary_list
  //       .filter((item) => item.plan_id === 1)[0]
  //       .dates.filter((item) => item.id === dateIndex)[0]
  //   );

  //   if (!result.destination) return; //드랍 발생하지 않은 경우

  //   const { source, destination } = result;
  //   const updatedItems = Array.from(
  //     list.itinerary_list
  //       .filter((item) => item.plan_id === 1)[0]
  //       .dates.filter((item) => item.id === dateIndex)[0]
  //   );
  //   const [movedItem] = updatedItems.splice(source.index, 1); //이동된 아이템 추출
  //   updatedItems.splice(destination.index, 0, movedItem); //이동된 아이템 새 위치에 삽입

  //   setDayList(updatedItems);
  // };

  // const handleClickDelete = useCallback(
  //   (id) => {
  //     let newItems = items.filter((data) => data.id !== id);

  //     setItems(newItems);
  //   },
  //   //todoData가 바뀔 때만)다시 생성된다.
  //   [items]
  // );

  // const handleRemoveAll = () => {
  //   setItems([]);
  // };

  // //items 바뀔때마다 상위 prop 전달
  // useEffect(() => {
  //   getList(items);
  // }, [items]);

  const allList = <div>전체!!</div>;

  const singleDayList = <div>하루</div>;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <div style={{ height: '570px', overflow: 'auto' }}>
        {isAll ? allList : singleDayList}
      </div>
    </div>
  );
}

export default AddDestination;
