import React, { useEffect, useState } from 'react';
import mockData from '../../assets/mockData.json';
import DestinationList from '../DestinationList/DestinationList';
// import DatePicker from '../DatePicker/DatePicker';

function PlannerMapEdit() {
  const [list, setList] = useState(mockData);
  const [dateList, setDateList] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);

  const [isAll, setIsAll] = useState(true);
  const [showDayList, setShowDayList] = useState(false);

  const handleClickAll = () => {
    setIsAll(true);
    setShowDayList(false);
  };

  const handleClickDay = () => {
    setShowDayList(true);
    setIsAll(false);
  };

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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* <DatePicker getDateList={getDateList} /> */}
        <div>{list.itinerary_list[0].destination}</div>
        <div>0 Day</div>
        <div>
          {startDate} ~ {endDate}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
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
                onClick={handleClickDay}
              >
                DAY {index + 1}
              </button>
            ))}
          </div>

          <DestinationList
            isAll={isAll}
            showDayList={showDayList}
            getList={getList}
            dateList={dateList}
          />
        </div>
      </div>
      <div id="map" style={{ width: '1200px', height: '1000px' }}></div>
    </div>
  );
}

export default PlannerMapEdit;
