import React, { useEffect, useState } from "react";

const PlannerMap = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState([]);
  const [infowindow, setInfowindow] = useState(null);

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };

    const newMap = new window.kakao.maps.Map(mapContainer, mapOptions);
    setMap(newMap);

    const newInfowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
    setInfowindow(newInfowindow);
  }, []);

  const searchPlaces = () => {
    if (!keyword.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, placesSearchCB);
  };

  //searchPlaces ---> placesSearchCB(data, status, pagination) --->
  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
      displayPagination(pagination);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
    }
  };

  const displayPlaces = (places) => {
    // removeAllChildNodes('placesList');
    removeMarkers();

    const bounds = new window.kakao.maps.LatLngBounds();

    const placeElements = places.map((place, index) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, index);
      bounds.extend(placePosition);

      return (
        <div
          key={index}
          className="item"
          onMouseOver={() => displayInfowindow(marker, place.place_name)}
          onMouseOut={() => infowindow.close()}
        >
          <span className={`markerbg marker_${index + 1}`} />
          <div className="info">
            <h5>{place.place_name}</h5>
            {place.road_address_name ? (
              <>
                <span>{place.road_address_name}</span>
                <span className="jibun gray">{place.address_name}</span>
              </>
            ) : (
              <span>{place.address_name}</span>
            )}
            <span className="tel">{place.phone}</span>
          </div>
        </div>
      );
    });

    setPlaces(placeElements);
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

  const displayPagination = (pagination) => {
    const paginationEl = document.getElementById("pagination");
    // removeAllChildNodes('pagination');

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

  const displayInfowindow = (marker, title) => {
    const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
    infowindow.setContent(content);
    infowindow.open(map, marker);
  };

  // const removeAllChildNodes = (elementId) => {
  //     const parent = document.getElementById(elementId);
  //     while (parent.firstChild) {
  //         parent.firstChild.remove();
  //     }
  // };

  // const displayPagination = (pagination) => {
  //     const paginationEl = document.getElementById('pagination');
  //     removeAllChildNodes('pagination');

  //     for (let i = 1; i <= pagination.last; i++) {
  //         const el = document.createElement('a');
  //         el.href = '#';
  //         el.innerHTML = i;

  //         if (i === pagination.current) {
  //             el.className = 'on';
  //         } else {
  //             el.onclick = () => pagination.gotoPage(i);
  //         }

  //         paginationEl.appendChild(el);
  //     }
  // };

  return (
    <div>
      <input
        type="text"
        id="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={searchPlaces}>Search</button>
      <div id="map" style={{ width: "100%", height: "400px" }} />
      <div id="placesList" style={{ color: "black" }}>
        {places}
      </div>
      <div id="pagination" />
    </div>
  );
};

export default PlannerMap;
