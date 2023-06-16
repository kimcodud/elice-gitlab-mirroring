import React, { useState, useEffect } from 'react';

function DestinationList({ getList, list, isAll, dateIndex }) {
  const [items, setItems] = useState([]);
  // const [isDataReady, setIsDataReady] = usseState(false);
  // const [dayList, setDayList] = useState();
  const data = list.dates;
  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  console.log('data', data);
  const allList = (
    <div>
      {data &&
        data.map((item, index) => (
          <div key={index}>
            <div
              style={{
                width: '247px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div className="w-60 flex justify-center font-bold text-xl">
                Day {index + 1}
              </div>
            </div>
            <ul display={{ display: 'flex', flexDirection: 'column' }}>
              {item.locations.map((loca, order) => (
                <li
                  style={{
                    fontWeight: 700,
                    fontSize: '15px',
                    width: '247px',
                    height: '74px',
                    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                    marginBottom: '10px',
                    backgroundColor: 'white',
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={order}
                >
                  {loca.location}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );

  const singleDayList = (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}></div>
      <div>
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            listStyle: 'none',
          }}
        >
          {data &&
            data
              .filter((date, index) => index === dateIndex - 1)
              .map((date) =>
                date.locations.map((location, index) => (
                  <div>
                    <div className="w-60 flex justify-center font-bold text-xl">
                      Day {dateIndex}
                    </div>
                    <li
                      key={index}
                      className="rounded"
                      style={{
                        fontWeight: 700,
                        fontSize: '15px',
                        width: '247px',
                        height: '74px',
                        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                        marginBottom: '10px',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {location.location}
                    </li>
                  </div>
                ))
              )}
        </ul>
      </div>
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
      <div style={{ height: '570px', overflow: 'auto' }}>
        {isAll ? allList : singleDayList}
      </div>
    </div>
  );
}

export default DestinationList;
