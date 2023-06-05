import { useEffect } from 'react';
import mockData from '../../assets/mockdata.json';
import PlannerLeft from '../PlannerLeft/PlannerLeft';

function PlannerMapEdit() {
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    const positions = mockData; // mockdata.json 파일에서 데이터 가져오기

    const markers = [];
    const linePath = [];

    positions.forEach((position) => {
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
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <PlannerLeft />
      <div id="map" style={{ width: '1200px', height: '1000px' }}></div>
    </div>
  );
}

export default PlannerMapEdit;
