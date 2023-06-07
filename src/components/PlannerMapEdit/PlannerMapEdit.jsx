import React, { useEffect, useState } from 'react';
import mockData from '../../assets/mockData.json';
import DestinationList from '../DestinationList/DestinationList';

function PlannerMapEdit() {
  const [list, setList] = useState(mockData);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);

  const getList = (newList) => {
    setList(newList);
  };

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

      list.forEach((position) => {
        const latlng = new window.kakao.maps.LatLng(
          position.latlng.lat,
          position.latlng.lng
        );

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: latlng,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: position.content,
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
      <DestinationList getList={getList} />
      <div id="map" style={{ width: '1200px', height: '1000px' }}></div>
    </div>
  );
}

export default PlannerMapEdit;
