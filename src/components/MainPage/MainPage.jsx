import React, { useState, useRef } from "react";
import "./MainPage.css";

const MainPageComponent = () => {
  const images = [
    "/src/assets/main.jpg",
    "/src/assets/starRoad_2.png",
    "/src/assets/main2.webp",
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

  return (
    <div>
      <div>
        <div>
          <div
            className="absolute bottom-5 top-14 "
            style={{
              // fontWeight: "bold",
              fontSize: "3rem",
              marginBottom: "1rem",
              backgroundColor: "rgba( 255, 255, 255, 0.5 )",
              width: "35%",
              height: "92vh",
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
                marginLeft: "9rem",
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
      <div className="relative" ref={movePoint}>
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
        <button
          onClick={previousSlide}
          className="absolute left-40 top-1/2 transform -translate-y-1/2 "
        >
          <img src="/src/assets/prev.png" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-40 top-1/2 transform -translate-y-1/2 "
        >
          <img src="/src/assets/next.png" />
        </button>
      </div>
      <div>
        <div style={{ width: "90%" }} className="flex flex-col items-center">
          <div className="w-full grid grid-cols-4 my-5">
            <div>
              <style>
                {`
          .postCard {
            padding-top: 80%;
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 3px;
            background: #D9D9D9;
          }
          .postCard:hover {
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            background: gray;
          }
          .postInfo {
            width: 100%;
            height: 30%;
            background: #FFFFFF;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 3px;
          }
          .postWriter {
            color: #6645B9;
          }
          `}
              </style>
              <div className="postCard flex flex-col justify-end items-center m-5">
                <div className="postInfo flex flex-col justify-center items-center">
                  <div className="postTittle text-xl">SEOUL</div>
                  <div className="postWriter">대한민국 서울</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageComponent;
