import Modal from "../modal/modal";
import { useModalStore } from "../../store/store";

const PlaceList = (props) => {
  const { places, infowindow, handleDisplayInfowindow } = props;
  const { openModal } = useModalStore();
  const placeInfoImage =
    "https://fonts.gstatic.com/s/i/materialiconsoutlined/info/v24/24px.svg";
  const addScheduleImage =
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";

  return (
    <div style={{ color: "black" }}>
      {places?.map((place, index) => {
        console.log({ place });
        console.log(place.address_name);

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
                    <button className="rounded-md bg-purple-500/25 text-xs">
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
              className="info box-sizing: border-box h-22 w-50 p-4 border-4 shadow-lg rounded-lg"
              style={{ marginLeft: "10px" }}
            >
              <div className="font-bold">{place.place_name}</div>
              <div style={{ display: "flex ", justifyContent: "right" }}>
                <span>{place.category_group_name}</span>
                <img
                  src={placeInfoImage} // 장소 정보 이미지 URL로 변경
                  alt="Place Info"
                  onClick={() => openInfoModal()} // 이미지 클릭 시 모달 열기
                  className="rounded-md bg-purple-500/25 text-xs cursor-pointer" // 필요한 스타일 클래스 추가
                  style={{ marginLeft: "auto", marginRight: "5px" }} // 필요한 스타일 추가
                />
                <img
                  src={addScheduleImage} // 일정 추가 이미지 URL로 변경
                  alt="Add Schedule"
                  className="rounded-md bg-purple-500/25 text-xs cursor-pointer" // 필요한 스타일 클래스 추가
                />

                {/* <button
                  onClick={() => openInfoModal()}
                  className="rounded-md bg-purple-500/25 text-xs"
                  style={{ marginLeft: "auto" }}
                >
                  장소 정보
                </button>
                <button className="rounded-md bg-purple-500/25 text-xs">
                  일정 추가
                </button> */}
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
          </div>
        );
      })}
      <Modal />
    </div>
  );
};
export default PlaceList;
