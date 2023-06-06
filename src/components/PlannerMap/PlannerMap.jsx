import { useEffect, useMemo, useState } from "react";
import PlaceList from "../PlaceList/PlaceList";

const SearchMap = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };

    const newMap = new window.kakao.maps.Map(mapContainer, mapOptions);
    setMap(newMap);
  }, []);

  const displayInfowindow = (marker, title) => {
    const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
    infowindow.setContent(content);
    infowindow.open(map, marker);
  };

  const searchPlaces = () => {
    if (!keyword.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, placesSearchCB); // =>
  };
  // searchPlaces ---> placesSearchCB(data, status, pagination) ---> displayPalces, dsiplayPagination

  const placesSearchCB = (data, status, pagination) => {
    console.log("placesSearchCB", { data, status, pagination });
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
      displayPagination(pagination);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
    }
  };

  const displayPlaces = (_places) => {
    // removeAllChildNodes("placesList");
    console.log("리스트 제거완료");
    removeMarkers();

    const bounds = new window.kakao.maps.LatLngBounds();

    _places.forEach((place, index) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      addMarker(placePosition, index);
      bounds.extend(placePosition);
    });

    setPlaces(_places || []);
    map.setBounds(bounds);
  };

  const addMarker = (position, index) => {
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    const imageSize = new window.kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new window.kakao.maps.Size(36, 691),
      spriteOrigin: new window.kakao.maps.Point(0, index * 46 + 10),
      offset: new window.kakao.maps.Point(13, 37),
    };

    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );

    const marker = new window.kakao.maps.Marker({
      position: position,
      image: markerImage,
    });

    marker.setMap(map);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);

    return marker;
  };

  const removeMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const removeAllChildNodes = (elementId) => {
    const parent = document.getElementById(elementId);
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  };

  const displayPagination = (pagination) => {
    const paginationEl = document.getElementById("pagination");
    removeAllChildNodes("pagination");

    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement("a");
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
      } else {
        el.onclick = () => pagination.gotoPage(i);
      }

      paginationEl.appendChild(el);
    }
  };

  const PlaceListComponent = useMemo(() => {
    return <PlaceList places={places} />;
  }, [places]);

  return (
    <div style={{ display: "flex ", justifyContent: "center" }}>
      <div id="map" style={{ width: "1200px", height: "1000px" }} />
      <div>
        <input
          type="text"
          id="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border-indigo-500/100 rounded-md"
          placeholder=" 장소를 검색해보세요"
          style={{ marginLeft: "15px" }}
        />
        <button
          onClick={searchPlaces}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md"
        >
          Search
        </button>
        <div id="placesList">{PlaceListComponent}</div>
        <div id="pagination" />
      </div>
    </div>
  );
};

export default SearchMap;
