import { useState } from "react";
import { useModalStore } from "../../store/store";
import Modal from "../modal/modal";

const PlaceList = (props) => {
  const [infowindow, setInfowindow] = useState(null);

  // const openInfoModal = () => {
  //   const { openModal } = useModalStore();

  //   openModal({
  //     modalType: "info",
  //     style: {
  //       backgroundColor: "green",
  //       width: "40%",
  //       height: "100%",
  //       top: "50%",
  //       left: "50%",
  //       transform: "translate(-50%, -50%)",
  //     },
  //     title: "test",
  //     content: "1",
  //   });
  // };

  const { places } = props;
  return (
    <div style={{ color: "black" }}>
      {places?.map((place, index) => {
        console.log({ place });
        return (
          <div
            key={index}
            className="item"
            onMouseOver={() => displayInfowindow(marker, place.place_name)}
            onMouseOut={() => infowindow.close()}
          >
            <span className={`markerbg marker${index + 1}`} />
            <div
              className="info box-sizing: border-box h-22 w-50 p-4 border-4 shadow-lg rounded-lg"
              style={{ marginLeft: "10px" }}
            >
              <div className="font-bold ">{place.place_name}</div>
              <div style={{ display: "flex ", justifyContent: "right" }}>
                <span>{place.category_group_name}</span>
                <button
                  onClick={() => openInfoModal()}
                  className="rounded-full bg-sky-500/100 text-sm"
                  style={{ marginLeft: "auto" }}
                >
                  장소 정보
                </button>
                <button className="rounded-full bg-sky-500/100 text-sm">
                  일정 추가
                </button>
              </div>
              {/* {place.road_address_name ? (
              <> */}
              {/* <span className="jibun gray">{place.address_name}</span> */}
              {/* </>
            ) : (
              <span>{place.address_name}</span>
            )} */}
              {/* <span className="tel">{place.phone}</span> */}
            </div>
            <Modal />
          </div>
        );
      })}
    </div>
  );
};
export default PlaceList;
