import { useMemo, useState } from "react";
import Modal from "../modal/modal";
import { ModalPortal } from "../modal/ModalPortal";
import { useModalStore } from "../../store/store";
import AddDestination from "../AddDestination/AddDestination";
import { usePlannerMapContext } from "../PlannerMap/PlannerMap";

const PlaceList = (props) => {
  const {
    places,
    infowindow,
    handleDisplayInfowindow,
    onClickPlaceItem, // callback props 자식 -> 부모 컴포넌트로 props(데이터)를 끌어올림
    selectedDayPlaces,
    setSelectedDayPlaces,
    renderPlaces,
  } = props;
  const { openModal } = useModalStore();
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const { onSelectPlace } = usePlannerMapContext();

  // + 버튼 눌렀을 때 장소 넘겨주는 함수
  const handleAddPlace = (index) => {
    const place = places[index];
    onClickPlaceItem(place);
    onSelectPlace(place);
  };

  const AddDestinationComponents = useMemo(() => {
    <AddDestination
      handleAddPlace={handleAddPlace}
      renderPlaces={renderPlaces}
    />;
  });

  return (
    <div style={{ color: "black" }}>
      {places?.map((place, index) => {
        const openInfoModal = () => {
          openModal({
            modalType: "info",
            style: {
              backgroundColor: "white",
              width: "500px",
              height: "180px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "10px",
            },
            title: (
              <div
                className="subpixel-antialiased text-3xl font-bold text-purple-700"
                style={{ textAlign: "left" }}
              >
                {place.place_name}
              </div>
            ),
            content: (
              <div>
                <p className="text-xs italic antialiased text-slate-500">
                  최고의 여행지가 되실거에요!
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <div className="text-purple-500 font-semibold">
                    <p>주소: {place.address_name}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <img
                      src="https://play-lh.googleusercontent.com/Nvrf8Z89_3S8H6YnOLgyAbe-PSSeCZnJDA8zv7LY04hEvi8atTgp_fmQ5RZ591Qpxh5G"
                      alt="kakaoMap image"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                      }}
                      onClick={() => {
                        window.open(place.place_url, "_blank");
                      }}
                    />
                    <button
                      className="rounded-md bg-purple-500/25 text-xs"
                      onClick={() => handleAddPlace(index)}
                    >
                      일정 추가
                    </button>
                  </div>
                </div>
              </div>
            ),
          });
        };
        return (
          <div
            key={index}
            className="item"
            onMouseOver={() =>
              handleDisplayInfowindow(place.marker, place.place_name)
            }
            onMouseOut={() => infowindow.close()}
          >
            <span className={`markerbg marker${index + 1}`} />
            <div
              className="info box-sizing: border-box h-15 w-50 p-4 border-2 shadow-lg rounded"
              style={{ marginLeft: "3px" }}
            >
              <div className="font-bold text-sm">{place.place_name}</div>
              <div style={{ display: "flex ", justifyContent: "right" }}>
                <span className="text-xs mt-1">
                  {place.category_group_name}
                </span>
                <img
                  src="https://fonts.gstatic.com/s/i/materialiconsoutlined/info/v1/24px.svg"
                  alt="info icon"
                  onClick={() => openInfoModal()}
                  className="cursor-pointer"
                  style={{
                    marginLeft: "auto",
                    marginRight: "3px",
                  }}
                />
                <img
                  src="https://fonts.gstatic.com/s/i/materialiconsoutlined/add_circle/v1/24px.svg"
                  alt="add_circle icon"
                  className="cursor-pointer"
                  onClick={() => handleAddPlace(index)}
                />
              </div>
            </div>
          </div>
        );
      })}
      <ModalPortal>
        <Modal />
      </ModalPortal>
    </div>
  );
};
export default PlaceList;
