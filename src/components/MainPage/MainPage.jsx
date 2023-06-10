import React, { useState, useRef, useEffect } from "react";
import "./MainPage.css";
import axios from "axios";

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

  const [destination, setDestination] = useState([]);
  const getLocation = async () => {
    const result = await axios.get("http://localhost:3000/destinations");
    console.log(result.data.data.destinations);
    setDestination(result.data.data.destinations);
  };
  useEffect(() => {
    getLocation();
  }, []);

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
          <img src="/src/assets/prev.png" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-40 top-1/2 transform -translate-y-1/2 "
        >
          <img src="/src/assets/next.png" />
        </button>
      </div>
      <div
        style={{
          maxWidth: "100%",
          position: "relative",
          display: "inline-block",
        }}
      >
        <input
          className=""
          type="text"
          style={{
            maxWidth: "600px",
            margin: "auto",
            border: "0.5px solid #e0e0e0",
            marginTop: "3rem",
          }}
          placeholder="검색어를 입력하세요"
        />
        <span>dd</span>
      </div>
      <div>
        {destination.map((item, idx) => (
          <div
            style={{ width: "90%" }}
            className="flex flex-col items-center"
            key={idx}
          >
            <div className="w-full my-5">
              <div>
                <div
                  className="postCard flex justify-end items-center m-5"
                  style={{
                    paddingTop: "80%",
                    border: "1px solid rgba(0,0,0,0.05)",
                    borderRadius: "2px",
                    background: "#d9d9d9",
                  }}
                  ref={movePoint}
                >
                  <img src={item.image} />

                  <div
                    className="postInfo flex justify-center items-center"
                    style={{
                      width: "100%",
                      height: "30%",
                      backgroundColor: "#ffffff",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.25) ",
                    }}
                  >
                    <div className="text-xl">{item.name_en}</div>
                    <div
                      className="cardTitle"
                      style={{ color: "#6645b9" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPageComponent;
