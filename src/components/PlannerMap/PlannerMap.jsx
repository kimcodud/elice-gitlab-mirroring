import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import PlaceList from "../PlaceList/PlaceList";
import DatePicker from "../DatePicker/DatePicker";
import axios from "axios";
import { useParams } from "react-router";

const PlannerMapContext = createContext({
  onSelectPlace: () => {},
  // selectedPlace: {},
  setSelectedDay: () => {},
  selectedDay: "",
  selectedPlanDate: {},
  handleDeleteSelectedPlanDate: () => {},
});

export const usePlannerMapContext = () => {
  const context = useContext(PlannerMapContext);
  // context API는 더 상위에서 사용 못함 (예외 처리)
  if (!context) {
    throw new Error("PlannerMapContext를 호출할 수 없는 범위 입니다.");
  }
  return context;
};

const SearchMap = () => {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [infowindow, setInfowindow] = useState();
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState([]);
  const [markers, setMakers] = useState([]);

  const [isAll, setIsAll] = useState(true);
  const [showDayList, setShowDayList] = useState(false);

  const [dateList, setDateList] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedDayPlaces, setSelectedDayPlaces] = useState(); //하루 장소 목록

  /*******************/
  // const [selectedPlace, setSelectedPlace] = useState({});
  const [selectedDay, setSelectedDay] = useState(""); // DAY 기억하는 상태
  const [selectedPlanDate, setSelectedPlanDate] = useState({});
  const [destination, setDestination] = useState("");

  const { id } = useParams();
  // console.log(id);
  const getDestination = async () => {
    const result = await axios.get(`http://localhost:3000/destinations/${id}`); // 나중 수정
    setDestination(result.data.data.destination);
    // console.log(result.data.data.destination);
  };

  // const latitude = destination.latitude;
  // const longitude = destination.longitude;

  useEffect(() => {
    getDestination();
  }, []);

  useEffect(() => {
    console.log({ selectedDay });
  }, [selectedDay]);

  // 일정등록할 때 addPlanInfo 보내면 됨
  const [addPlanInfo, setAddPlanInfo] = useState({
    start_date: "",
    end_date: "",
    destination: "",
    dates: [],
  });

  const createMarker = (position, index) => {
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

    return marker;
  };

  const createMarkerList = (places) => {
    return places?.map((place, index) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      const placePosition = createMarker(position, index);
      return placePosition;
    });
  };

  const handleDisplayInfowindow = (marker, title) => {
    const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
    infowindow.setContent(content);
    infowindow.open(kakaoMap, marker);
  };

  const onSearch = useCallback(() => {
    if (!keyword.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }
    removeMarkers();
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, placesSearchCB);
  }, [keyword]);

  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      displayMarkers(data);
      displayPagination(pagination);
      // addPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
    }
  };

  const displayMarkers = (placeList) => {
    // 기존 마커 초기화
    removeMarkers();

    // 새로운 마커 추가
    const bounds = new window.kakao.maps.LatLngBounds();

    placeList.forEach((place, index) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      createMarker(placePosition, index);
      bounds.extend(placePosition);
      kakaoMap.setBounds(bounds);
    });

    if (
      kakaoMap.o.idle &&
      Array.isArray(kakaoMap.o.idle) &&
      kakaoMap.o.idle.length
    ) {
      const prevMarkerValues = kakaoMap.o.idle.map(({ object }) => object);
      prevMarkerValues.forEach((prevMarker) => {
        prevMarker.setMap(null);
      });
    }
    const markerList = createMarkerList(placeList);
    markerList.forEach((marker) => marker.setMap(kakaoMap));
    setMakers(markerList);
    const newPlaces = placeList.map((placeData, index) => {
      return {
        ...placeData,
        marker: markerList[index],
      };
    });

    setPlaces(newPlaces || []);
  };

  const removeMarkers = () => {
    setMakers([]);
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
        el.onclick = () => {
          pagination.gotoPage(i);
        };
      }
      el.style.marginRight = "10px";
      el.style.fontSize = "20px";
      paginationEl.appendChild(el);
    }
  };

  const getDateList = (dateList) => {
    setDateList(dateList);
    console.log("dateList", dateList);
    const { year: startYear, month: startMonth, date: startDate } = dateList[0];
    const {
      year: endYear,
      month: endMonth,
      date: endDate,
    } = dateList[dateList.length - 1];
    const start_date = `${startYear}-${startMonth}-${startDate}`;
    const end_date = `${endYear}-${endMonth}-${endDate}`;
    setAddPlanInfo((prev) => ({ ...prev, start_date, end_date }));
  };

  const onClickPlaceItem = (item) => {
    console.log(item);
  };

  const PlaceListComponent = useMemo(() => {
    return (
      <PlaceList
        places={places}
        infowindow={infowindow}
        handleDisplayInfowindow={handleDisplayInfowindow}
        onClickPlaceItem={onClickPlaceItem}
        // selectedPlaces={selectedPlaces}
        // setSelectedPlaces={setSelectedPlaces}
      />
    );
  }, [markers, places]);

  // useMemo (markers places)가 바뀔때마다 리렌더링되는 것을 막기 위해 useMemo써야함
  const DatePickerComponent = useMemo(() => {
    return (
      <DatePicker
        // selectedPlaces={selectedPlaces}
        // setSelectedPlaces={setSelectedPlaces}
        getDateList={getDateList}
        selectedDayPlaces={selectedDayPlaces}
        setSelectedDayPlaces={setSelectedDayPlaces}
      />
    );
  }, []);

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
          level: 5,
        };
        const newKakaoMap = new window.kakao.maps.Map(mapContainer, mapOptions);
        setKakaoMap(newKakaoMap);
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
      onSearch();
    }
  };

  // const handleClickAll = () => {
  //   setIsAll(true);
  //   setShowDayList(false);
  // };

  // const handleClickDay = () => {
  //   setShowDayList(true);
  //   setIsAll(false);
  // };

  useEffect(() => {
    console.log({ selectedPlanDate });
  }, [selectedPlanDate]);

  const onSelectPlace = (place) => {
    console.log({ place });
    // 1) 현재 선택된 DAY가 없으면 return;
    if (!selectedDay) return;
    // 2) 현재 선택된 DAY가 있으면,
    const currentPlaceList = [
      ...(selectedPlanDate[selectedDay] || []),
      place,
    ] || [place];

    // id가 같으면 안쌓임
    const newPlaceList = currentPlaceList.filter(
      (currentPlace, index, array) =>
        index === array.findIndex((_place) => _place.id === currentPlace.id)
    );

    setSelectedPlanDate((prev) => ({
      ...prev,
      [selectedDay]: newPlaceList,
    })); // {"2020-12-12": [place], "2022-12-13": [place1, place2]}
  };

  // 제거 함수
  const handleDeleteSelectedPlanDate = (id) => {
    console.log("handleDeleteSelectedPlanDate");
    if (!selectedPlanDate || Object.keys(selectedPlanDate)) return;
    const newPlaceList = selectedPlanDate[selectedDay].filter(
      (_, index, array) =>
        index !== array.findIndex((_place) => (_place.id = id))
    );
    setSelectedPlanDate((prev) => ({ ...prev, [selectedDay]: newPlaceList }));
  };

  const handleClickCreatePlan = async () => {
    const dates = Object.keys(selectedPlanDate).map((date, index) => {
      return {
        date,
        locations: selectedPlanDate[date].map((place) => ({
          location: place.address_name,
          latitude: place.y,
          longitude: place.x,
          order: index + 1,
        })),
      };
    });
    const planData = {
      ...addPlanInfo, //{start_date, end_date},
      destination,
      dates,
    };
    console.log(planData);
    try {
      const result = await axios.post(
        "http://localhost:3000/travels",
        {
          withCredentials: true,
        },
        {
          planData,
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    onSelectPlace,
    selectedDay,
    setSelectedDay,
    selectedPlanDate,
    handleDeleteSelectedPlanDate,
  };

  return (
    <PlannerMapContext.Provider value={contextValue}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ marginRight: "3px" }}>
                <div className="h-20 text-2xl font-medium flex justify-center items-center">
                  {destination && destination.name_ko}
                </div>
                {DatePickerComponent}
                <div
                  className="flex flex-col items-center mt-4"
                  style={{
                    height: "300px",
                    whiteSpace: "nowrap",
                    overflow: "auto",
                  }}
                ></div>

                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                ></div>
              </div>
            </div>
            <div
              style={{ position: "relative", width: "1200px", height: "920px" }}
            >
              <div
                id="map"
                style={{ width: "100%", height: "100%", position: "absolute" }}
              ></div>
              <button
                className="px-3 py-2 rounded bg-purple-500 text-white"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: "1",
                  margin: "20px 0 0 20px",
                }}
                onClick={handleClickCreatePlan}
              >
                일정 생성
              </button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex ", justifyContent: "center" }}>
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
                marginLeft: "3px",
                justifyContent: "center",
                textAlign: "center",
              }}
            />
            <div className="drag-box">
              <div
                id="placesList"
                style={{
                  height: "850px",
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
      </div>
    </PlannerMapContext.Provider>
  );
};
export default SearchMap;
