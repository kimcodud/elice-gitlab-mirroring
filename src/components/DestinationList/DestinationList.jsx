import React, { useState, useCallback, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function DestinationList({ getList, list, isAll, dateIndex }) {
  const [items, setItems] = useState(list);
  const [dayList, setDayList] = useState(
    list.itinerary_list
      .filter((item) => item.plan_id === 1)[0]
      .dates.filter((item) => item.id === dateIndex)[0]
  );

  const handleEnd = (result) => {
    console.log(
      items.itinerary_list
        .filter((item) => item.plan_id === 1)[0]
        .dates.filter((item) => item.id === dateIndex)[0]
    );

    if (!result.destination) return; //드랍 발생하지 않은 경우

    const { source, destination } = result;
    const updatedItems = Array.from(
      items.itinerary_list
        .filter((item) => item.plan_id === 1)[0]
        .dates.filter((item) => item.id === dateIndex)[0]
    );
    const [movedItem] = updatedItems.splice(source.index, 1); //이동된 아이템 추출
    updatedItems.splice(destination.index, 0, movedItem); //이동된 아이템 새 위치에 삽입

    setDayList(updatedItems);
  };

  const handleClickDelete = useCallback(
    (id) => {
      let newItems = items.filter((data) => data.id !== id);

      setItems(newItems);
    },
    //todoData가 바뀔 때만)다시 생성된다.
    [items]
  );

  const handleRemoveAll = () => {
    setItems([]);
  };

  //items 바뀔때마다 상위 prop 전달
  useEffect(() => {
    getList(items);
  }, [items]);

  const allList = (
    <div>
      {list.itinerary_list[0].dates.map((item, index) => (
        <div key={item.id}>
          <span>Day {index + 1}</span>
          <ul display={{ display: 'flex', flexDirection: 'column' }}>
            {item.locations.map((loca, order) => (
              <li key={order}>{loca.location}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const singleDayList = (
    <div>
      <h1 style={{ borderBottom: '3px solid #6645B9' }}>선택목록</h1>
      <button onClick={handleRemoveAll}>Delete All</button>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="itemList">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyle: 'none', padding: 0 }}
            >
              {/* 지금은 하드코딩으로 일정 1번인 것만 표시 */}
              {items.itinerary_list
                .filter((item) => item.plan_id === 1)
                .map((itinerary) =>
                  itinerary.dates
                    .filter((date) => date.id === dateIndex)
                    .map((date) =>
                      date.locations.map((location, index) => {
                        return (
                          <Draggable
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  width: '247px',
                                  height: '74px',
                                  filter:
                                    'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                                  marginBottom: '10px',
                                  backgroundColor: 'white',
                                  listStyle: 'none',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {location.location}
                                <div className="items-center">
                                  <button
                                    className="px-4 py-2 float-right"
                                    onClick={() =>
                                      handleClickDelete(location.order)
                                    }
                                  >
                                    x
                                  </button>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      })
                    )
                )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      {isAll ? allList : singleDayList}
    </div>
  );
}

export default DestinationList;
