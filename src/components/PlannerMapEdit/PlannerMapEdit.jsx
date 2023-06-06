import React, { useEffect, useState } from 'react';
import mockData from '../../assets/mockData.json';
import DestinationList from '../DestinationList/DestinationList';

function PlannerMapEdit() {
  const [list, setList] = useState(mockData);

  const getList = (newList) => {
    setList(newList);
  };

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    // const ps = new window.kakao.maps.services.Places(); //장소 검색 객체 생성

    const markers = [];
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

      markers.push(marker);
      linePath.push(latlng);
    });

    const polyline = new window.kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 2,
      strokeColor: '#FF0000',
      strokeOpacity: 0.7,
      strokeStyle: 'solid',
    });

    polyline.setMap(map);
  }, [list]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <DestinationList getList={getList} />
      <div id="map" style={{ width: '1200px', height: '1000px' }}></div>
    </div>
  );
}

export default PlannerMapEdit;
