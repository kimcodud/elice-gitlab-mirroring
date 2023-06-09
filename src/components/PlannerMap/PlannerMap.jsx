import { useEffect, useMemo, useState } from "react";
import PlaceList from "../PlaceList/PlaceList";

const SearchMap = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState([]);
  const [infowindow, setInfowindow] = useState(null);

  // var zoomControl = new kakao.maps.ZoomControl();
  // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  const handleDisplayInfowindow = (marker, title) => {
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
    ps.keywordSearch(keyword, placesSearchCB);
  };

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

  const displayPlaces = (_places) => {
    removeMarkers(); // marker-state []

    const bounds = new window.kakao.maps.LatLngBounds();
    _places.forEach((place, index) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      addMarker(placePosition, index);
      bounds.extend(placePosition);
    }); // marker-state [....]
    const markerList = createMarkerList(_places);
    const newPlaces = _places.map((placeData, index) => {
      return {
        ...placeData,
        marker: markerList[index],
      };
    });

    setPlaces(newPlaces || []);
    map.setBounds(bounds);
  };

  const createMarkerList = (places) => {
    return places?.map((place, index) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, index);
      return marker;
    });
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
    setMarkers((prevMarkers) => [...prevMarkers, ...[marker]]);

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
    // removeMarkers()
    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement("a");
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
      } else {
        el.onclick = () => {
          removeMarkers();
          pagination.gotoPage(i);
        };
      }
      el.style.marginRight = "10px";
      el.style.fontSize = "20px";
      paginationEl.appendChild(el);
    }
  };

  const PlaceListComponent = useMemo(() => {
    return (
      <PlaceList
        places={places}
        infowindow={infowindow}
        handleDisplayInfowindow={handleDisplayInfowindow}
      />
    );
  }, [places]);

  const attachMapSdkScript = () => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_APP_KAKAOMAP_KEY
    }&libraries=services&autoload=false`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOptions = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
        const newMap = new window.kakao.maps.Map(mapContainer, mapOptions);
        setMap(newMap);
        const newInfowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        setInfowindow(newInfowindow);
      });
    };
  };

  useEffect(() => {
    attachMapSdkScript();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPlaces();
    }
  };

  return (
    <div style={{ display: "flex ", justifyContent: "center" }}>
      <div id="map" style={{ width: "1200px", height: "920px" }} />
      <div>
        <input
          type="text"
          id="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border-4 border-indigo-500/75 rounded shadow-sm w-full text-lg"
          onKeyPress={handleKeyPress}
          placeholder=" 장소를 검색해보세요"
          style={{
            marginLeft: "10px",
            justifyContent: "center",
            textAlign: "center",
          }}
        />
        <div className="drag-box">
          <div
            id="placesList"
            style={{
              height: "890px",
              whiteSpace: "nowrap",
              overflow: "auto",
            }}
          >
            {PlaceListComponent}
          </div>
          <div
            id="pagination"
            className="drop-shadow-md cursor-pointer"
            style={{ display: "flex", justifyContent: "center" }}
          />
        </div>
      </div>
    </div>
  );
};
export default SearchMap;
