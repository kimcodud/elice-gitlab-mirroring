import React, { useState, useRef } from "react";
import "./MainPage.css";

const MainPageComponent = () => {
  const images = [
    "/src/assets/main.jpg",
    "/src/assets/starRoad_2.png",
    "/src/assets/user.png",
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
        <button onClick={scrollBtn}>dddddddddddddddddd</button>
        <img
          src="/src/assets/main.jpg"
          className="mainImg"
          style={{ marginBottom: "10rem" }}
        />
      </div>
      <div className="relative" ref={movePoint}>
        <img src={images[currentIndex]} alt="Slide" className="w-full" />
        <button
          onClick={previousSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-l"
        >
          prev
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainPageComponent;
