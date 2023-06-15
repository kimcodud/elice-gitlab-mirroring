import React, { useState, useCallback, useEffect } from 'react';

function DestinationList({ getList, list, isAll, dateIndex }) {
  const [items, setItems] = useState([]);
  // const [dayList, setDayList] = useState();

  useEffect(() => {
    setItems(list);
  }, [items]);

  const allList = (
    // <div>
    //   {items.dates.map((item, index) => (
    //     <div key={index}>
    //       <div
    //         style={{
    //           width: '247px',
    //           display: 'flex',
    //           flexDirection: 'column',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}
    //       >
    //         <div className="w-60 flex justify-center bg-gray-100 font-bold text-xl">
    //           Day {index + 1}
    //         </div>
    //       </div>
    //       <ul display={{ display: 'flex', flexDirection: 'column' }}>
    //         {item.locations.map((loca, order) => (
    //           <li
    //             style={{
    //               fontWeight: 700,
    //               fontSize: '15px',
    //               width: '247px',
    //               height: '74px',
    //               filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    //               marginBottom: '10px',
    //               backgroundColor: 'white',
    //               listStyle: 'none',
    //               display: 'flex',
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //             }}
    //             key={order}
    //           >
    //             {loca.location}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   ))}
    // </div>
    <div></div>
  );

  const singleDayList = (
    // <div>
    //   <div style={{ display: 'flex', justifyContent: 'flex-end' }}></div>
    //   <div>
    //     <ul style={{ listStyle: 'none', padding: 0 }}>
    //       {/* 지금은 하드코딩으로 일정 1번인 것만 표시 */}
    //       {items
    //         .filter((item) => item.plan_id === 1)
    //         .map((itinerary) =>
    //           itinerary.dates
    //             .filter((date) => date.id === dateIndex)
    //             .map((date) =>
    //               date.locations.map((location, index) => {
    //                 return (
    //                   <div
    //                     key={index}
    //                     draggableId={index.toString()}
    //                     index={index}
    //                   >
    //                     <li
    //                       style={{
    //                         width: '220px',
    //                         height: '74px',
    //                         filter:
    //                           'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    //                         marginBottom: '10px',
    //                         backgroundColor: 'white',
    //                         listStyle: 'none',
    //                         display: 'flex',
    //                         alignItems: 'center',
    //                         justifyContent: 'center',
    //                       }}
    //                     >
    //                       {location.location}
    //                       <div className="items-center">
    //                         <button
    //                           className="px-4 py-2 float-right"
    //                           onClick={() => handleClickDelete(location.order)}
    //                         >
    //                           x
    //                         </button>
    //                       </div>
    //                     </li>
    //                   </div>
    //                 );
    //               })
    //             )
    //         )}
    //     </ul>
    //   </div>
    // </div>
    <div></div>
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
      <div style={{ height: '570px', overflow: 'auto' }}>
        {isAll ? allList : singleDayList}
      </div>
    </div>
  );
}

export default DestinationList;
