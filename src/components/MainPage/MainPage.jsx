import React, { useState, useRef, useEffect } from "react";
import "./MainPage.css";
import axios from "axios";
import Modal from "../modal/modal";
import { ModalPortal } from "../modal/ModalPortal";
import { useModalStore } from "../../store/store";

const MainPageComponent = () => {
  const images = [
    "/src/assets/main2.webp",
    "/src/assets/main.webp",
    "/src/assets/seoul.webp",
    "/src/assets/busan.webp",
    "/src/assets/seoul2.webp",
  ]; // 임시 데이터
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const movePoint = useRef();
  const scrollBtn = () => {
    movePoint.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [destination, setDestination] = useState([]);
  const getLocation = async () => {
    const result = await axios.get("http://localhost:3000/destinations");
    console.log(result.data.data.destinations);
    setDestination(result.data.data.destinations);
  };

  const { openModal } = useModalStore();
  const openInfoModal = (item) => {
    console.log(item);
    openModal({
      modalType: "info",
      style: {
        backgroundColor: "white",
        width: "50rem",
        height: "20rem",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
      },
      title: (
        <div className="text-center font-bold text-4xl">{item.name_ko}</div>
      ),
      content: <div>{JSON.stringify(item.introduction)}</div>,
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <div>
        <div>
          <div
            className="absolute bottom-5 top-14"
            style={{
              // fontWeight: "bold",
              fontSize: "3rem",
              marginBottom: "1rem",
              backgroundColor: "rgba( 255, 255, 255, 0.5 )",
              width: "35%",
              height: "94vh",
            }}
          >
            <div
              style={{
                textAlign: "center",
                color: "#845ec2",
                marginTop: "14rem",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              여행을 도와드릴게요
            </div>
            <div
              className="mb-8"
              style={{
                textAlign: "center",
                color: "#845ec2",
                fontWeight: "900",
              }}
            >
              starRoad
            </div>
            <button
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                textAlign: "center",
                marginLeft: "25%",
                color: "white",
                width: "15rem",
                // border: "1px solid black",
                // backgroundColor: "rgba( 255, 255, 255, 0.6 )",
                padding: "0.5rem",
                borderRadius: "2px",
              }}
              className="bg-violet-500 hover:bg-violet-600"
              onClick={scrollBtn}
            >
              여행 시작하기
            </button>
          </div>
          <img
            src="/src/assets/main2.webp"
            className="mainImg"
            style={{ marginBottom: "10rem" }}
          />
        </div>
      </div>
      <div className="relative">
        <a href="/travelBoard">
          <img
            src={images[currentIndex]}
            alt="Slide"
            className=""
            style={{
              animation: "bannermove 5s linear infinite",
              width: "80%",
              height: "20rem",
              objectFit: "cover",
              margin: "auto",
              boxShadow: "1px 4px 4px black",
              borderRadius: "4px",
            }}
          />
        </a>
        <button
          onClick={previousSlide}
          className="absolute left-40 top-1/2 transform -translate-y-1/2 "
        >
          <img src="/src/assets/prev.webp" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-40 top-1/2 transform -translate-y-1/2 "
        >
          <img src="/src/assets/next.webp" />
        </button>
      </div>
      <div
        style={{
          maxWidth: "100%",
          position: "relative",
          display: "inline-block",
        }}
      ></div>
      <div ref={movePoint}>
        <div className="grid grid-cols-4 gap-4">
          {destination.map((item, idx) => (
            <div className="w-auto my-8" key={idx}>
              <div
                className="relative border border-gray-300"
                style={{ paddingBottom: "100%" }}
              >
                <div className="absolute inset-0">
                  <button onClick={() => openInfoModal(item)}>
                    <img
                      src={item.image}
                      className="object-cover w-full h-full"
                      alt={item.name_en}
                    />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 p-4 w-full bg-white bg-opacity-90 flex flex-col justify-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    {item.name_en}
                  </h2>
                  <p className="text-gray-600">{item.name_ko}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="bottom-8 bg-gray-50 hover:bg-gray-200 text-gray-500 py-3 px-6 m-auto"
        onClick={scrollToTop}
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        맨 위로 올라가기
      </button>
      <ModalPortal>
        <Modal />
      </ModalPortal>
    </div>
  );
};

export default MainPageComponent;
