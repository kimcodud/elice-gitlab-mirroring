import React, { useState, useCallback, useEffect } from 'react';
import mockData from '../../assets/mockData.json';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function PlannerLeft({ getList }) {
  const [items, setItems] = useState(mockData);

  const handleEnd = (result) => {
    // console.log(result);
    if (!result.destination) return; //드랍 발생하지 않은 경우

    const { source, destination } = result;
    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(source.index, 1); //이동된 아이템 추출
    updatedItems.splice(destination.index, 0, movedItem); //이동된 아이템 새 위치에 삽입

    setItems(updatedItems);
  };

  const handleClick = useCallback(
    (id) => {
      console.log('id', id);
      let newItems = items.filter((data) => data.id !== id);
      console.log('newItems', newItems);
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
    console.log(items);
  }, [items]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
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
              {items.map((item, index) => (
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
                      // className="w-247 h-74 filter drop-shadow-md mb-10 bg-white list-none flex items-center justify-center"
                      // className={`${
                      //   snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'
                      // } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  bg-gray-100 border rounded"`}
                      style={{
                        width: '247px',
                        height: '74px',
                        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                        marginBottom: '10px',
                        backgroundColor: 'white',
                        listStyle: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...provided.draggableProps.style, // 추가
                      }}
                    >
                      {item.content}
                      <div className="items-center">
                        <button
                          className="px-4 py-2 float-right"
                          onClick={() => handleClick(item.id)}
                        >
                          x
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default PlannerLeft;
