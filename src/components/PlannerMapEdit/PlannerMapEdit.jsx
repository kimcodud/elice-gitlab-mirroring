import React, { useEffect, useState } from 'react';
import mockData from '../../assets/mockData.json';
import DestinationList from '../DestinationList/DestinationList';

function PlannerMapEdit() {
  const [list, setList] = useState(mockData);

  const [dateList, setDateList] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);

  const [isAll, setIsAll] = useState(true);
  const [dateIndex, setDateIndex] = useState();

  const handleClickAll = () => {
    setIsAll(true);
  };

  const handleClickDay = (index) => {
    setIsAll(false);
    setDateIndex(index);
  };

  useEffect(() => console.log(dateIndex), [dateIndex]);

  const getList = (list) => {
    setList(list);
    console.log('list', list);
  };

  const getDateList = (dateList) => {
    setDateList(dateList);
    console.log('dateList', dateList);
  };

  const startDate = list.itinerary_list[0].start_date;
  const endDate = list.itinerary_list[0].end_date;

  const attachMapSdkScript = () => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_APP_KAKAOMAP_KEY
    }&libraries=services&autoload=false`;
    script.defer = true;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const newMap = new window.kakao.maps.Map(mapContainer, mapOptions);
        setMap(newMap);
      });
    };

    document.head.appendChild(script);
  };

  useEffect(() => {
    attachMapSdkScript();
  }, []);

  useEffect(() => {
    if (map) {
      // 이전에 표시된 마커 및 경로 삭제
      markers.forEach((marker) => marker.setMap(null));
      if (polyline) polyline.setMap(null);

      const newMarkers = [];
      const linePath = [];

      list.itinerary_list[0].dates.forEach((position) => {
        const latlng = new window.kakao.maps.LatLng(position.lat, position.lng);

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: latlng,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: position.location,
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.open(map, marker);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.close();
        });

        newMarkers.push(marker);
        linePath.push(latlng);
      });

      const newPolyline = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 2,
        strokeColor: '#FF0000',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
      });

      newPolyline.setMap(map);

      setMarkers(newMarkers);
      setPolyline(newPolyline);
    }
  }, [list, map]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ marginLeft: '30px' }}>
        <div className="left-top">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '300px',
                height: '77px',
                marginTop: '16px',
                fontWeight: 700,
                fontSize: '30px',
                color: '#6645B9',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div>{list.itinerary_list[0].destination}</div>
            </div>
            <div
              style={{
                width: '300px',
                height: '77px',
                fontWeight: 700,
                fontSize: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div>{list.itinerary_list[0].dates.length} Day</div>
            </div>
            <div
              style={{
                width: '300px',
                height: '50px',
                fontWeight: 700,
                fontSize: '20px',
                color: '#6C6C6C',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div>
                {startDate} ~ {endDate}
              </div>
            </div>
            <div
              style={{
                width: '300px',
                height: '50px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: '#6F50BD',
                  borderRadius: '50%',
                }}
              ></div>
              <div
                style={{
                  color: '#6C6C6C',
                  fontWeight: 700,
                  fontSize: '20px',
                  paddingLeft: '20px',
                }}
              >
                0 places
              </div>
            </div>
          </div>
          <div className="left-list">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
              }}
            >
              <div
                style={{
                  width: '322px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '20px',
                    marginBottom: '10px',
                  }}
                >
                  선택목록
                </div>
              </div>
              <div
                style={{
                  width: '322px',
                  height: '0px',
                  border: ' 1px solid #6645B9',
                }}
              ></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingTop: '20px',
                }}
              >
                <button
                  style={{
                    width: '62px',
                    height: '38px',
                    backgroundColor: '#E9EBED',
                    marginBottom: '26px',
                  }}
                  onClick={handleClickAll}
                >
                  전체
                </button>

                {list.itinerary_list[0].dates.map((item, index) => (
                  <button
                    style={{
                      width: '62px',
                      height: '38px',
                      backgroundColor: '#E9EBED',
                      marginBottom: '26px',
                    }}
                    key={index}
                    onClick={() => handleClickDay(index + 1)}
                  >
                    DAY {index + 1}
                  </button>
                ))}
              </div>

              <DestinationList
                isAll={isAll}
                list={list}
                getList={getList}
                dateList={dateList}
                dateIndex={dateIndex}
              />
            </div>
          </div>
        </div>
      </div>
      <div id="map" style={{ width: '1200px', height: '1000px' }}></div>
    </div>
  );
}

export default PlannerMapEdit;
