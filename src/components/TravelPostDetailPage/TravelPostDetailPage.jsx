import { useState, useEffect, useRef } from "react";
import Modal from "../modal/modal";
import { ModalPortal } from "../modal/ModalPortal.jsx";
import { useModalStore } from "../../store/store";

import prevBtn from "../../assets/prev.webp";
import nextBtn from "../../assets/next.webp";
import deleteBtn from "../../assets/close.webp";

import userImg from "../../assets/user.webp";

import seoul from "../../assets/seoul.webp";

const contentImages = [seoul, prevBtn, nextBtn, deleteBtn];

function TravelPostDetail() {
  const { openModal, closeModal } = useModalStore();
  const [showComments, setShowComments] = useState(false);
  const mainTextRef = useRef(null);

  useEffect(() => {
    document
      .querySelector("#commentButton")
      .addEventListener("click", openCommentModal);

    return () => {
      document
        .querySelector("#commentButton")
        .removeEventListener("click", openCommentModal);
    };
  }, []);

  const CommentComponent = () => {
    // 댓글
    return (
      <form
        action=""
        className="w-full h-full flex justify-center items-center"
      >
        <div className="grid grid-cols-[1fr,5fr] grid-rows-[1fr,auto] w-11/12 h-full mb-2">
          <div className="col-span-1 row-span-full w-full p-1">
            <div className="flex justify-center items-center w-3/4 bg-white rounded-full align-middle shadow-2xl">
              <img
                className="mx-auto my-auto w-3/4"
                src={userImg}
                alt="유저이미지"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between w-full h-full ">
            <div>
              <span className="pr-2">유저이름</span>{" "}
              <span className="text-gray-400">2020-02-20</span>
            </div>
            <div className="flex justify-end items-start w-1/12 cursor-pointer select-none ">
              <img className="w-2/3" src={deleteBtn} alt="댓글삭제" />
            </div>
          </div>
          <div className="flex flex-row items-start w-full h-full">
            댓글내용 짱짱 유익함 멋져용 와웅댓글내용 짱짱 유익함 멋져용 와웅
          </div>
        </div>
      </form>
    );
  };

  const ScheduleComponent = () => {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <div className="mb-5">2020-02-20 ~ 2020-02-20</div>
        <div className="bg-gray-100 w-4/5 flex flex-col justify-center items-center rounded-2xl my-3 py-5 shadow-md">
          <div className="text-2xl text-center">{}1 일차</div>
          <div className="flex flex-col w-4/5 bg-white py-1 px-4 my-2 rounded">
            <div className="font-bold">경복궁</div>
            <div>경기도 경기시 경기구 경기경기로 1234-1</div>
          </div>
        </div>
      </div>
    );
  };

  const openScheduleModal = () => {
    openModal({
      modalType: "schedule",
      style: {
        backgroundColor: "rgb(249, 250, 251)",
        width: "32.8%",
        height: "82%",
        top: "59%",
        left: "67.5%",
        transform: "translate(-50%, -50%)",
      },
      title: (
        <div
          style={{ color: "#6645B9" }}
          className="border-b border-gray-300 pb-4 text-3xl"
        >
          여행 일정
        </div>
      ),
      content: <ScheduleComponent />,
    });
  };

  const openCommentModal = () => {
    setShowComments(true);
    mainTextRef.current.classList.add("reduced-height");

    openModal({
      modalType: "comment",
      style: {
        backgroundColor: "rgb(249, 250, 251)",
        width: "32.8%",
        height: "40%",
        top: "80%",
        left: "67.5%",
        transform: "translate(-50%, -50%)",
      },
      title: <div className="border-b border-gray-300 pb-4">댓글</div>,
      content: <CommentComponent />,
      onClose: handleCloseModal,
    });
  };

  const handleCloseModal = () => {
    setShowComments(false);
    closeModal();
    if (mainTextRef.current) {
      mainTextRef.current.classList.remove("reduced-height");
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contentImages.length);
  };

  const handleClickPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? contentImages.length - 1 : prevIndex - 1
    );
  };

  const handleClickThumbnail = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      id="main"
      className="w-full h-screen flex justify-center items-center overflow-hidden"
      style={{ height: "calc(100vh - 7rem)" }}
    >
      <style>
        {`
          .btn:hover #prevBtn,
          .btn:hover #nextBtn {
            display: block;
          }
          #Imgbox:hover #imgCategory {
            display: flex;
          }
          .reduced-height {
            max-height: 50%;
          }
          .overflow-x-uto {
            overflow: hidden;
            position: relative;
          }
  
          .overflow-x-auto:hover {
            overflow: auto;
          }
  
          .overflow-x-auto::-webkit-scrollbar {
            width: 8px;
          }
  
          .overflow-x-auto::-webkit-scrollbar-track {
            background-color: #F1F5F9;
          }
  
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background-color: #B09FCE;
            border-radius: 4px;
          }
  
          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background-color: #6645B9;
          }
        `}
      </style>

      <div className="flex flex-row items-center gap-12 relative h-full w-2/3 pt-10">
        <div className="flex flex-col w-full h-4/5">
          <div
            id="Imgbox"
            className="flex flex-row relative"
            style={{ width: "100%", height: "100%" }}
          >
            <div
              onClick={handleClickPrev}
              className="btn bg-transparent h-full w-1/6 hover:bg-gray-200 hover:bg-opacity-20 absolute top-1/2 px-3 left-0 transform -translate-y-1/2 select-none"
            >
              <img
                id="prevBtn"
                className="hidden absolute top-1/2 w-1/2"
                style={{ transform: "translateY(-50%)" }}
                src={prevBtn}
                alt="이전"
              />
            </div>
            <img
              id="mainImg"
              className="box-content w-full h-full object-cover rounded-2xl select-none"
              src={contentImages[currentIndex]}
              alt="Main"
            />
            <div
              onClick={handleClickNext}
              className="btn bg-transparent h-full w-1/6 hover:bg-gray-200 hover:bg-opacity-20 absolute top-1/2 px-3 right-0 transform -translate-y-1/2 flex flex-row justify-end select-none"
            >
              <img
                id="nextBtn"
                className="hidden absolute top-1/2 w-1/2"
                style={{ transform: "translateY(-50%)" }}
                src={nextBtn}
                alt="다음"
              />
            </div>
            <div
              id="imgCategory"
              className="hidden flex-row justify-center absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-200 bg-opacity-50 rounded-2xl select-none mb-3 px-3 py-1"
            >
              {contentImages.map((image, index) => (
                <div
                  className={`w-${
                    4 / contentImages.length
                  } p-1 hover:bg-gray-200 hover:bg-opacity-80 rounded-xl `}
                  key={index}
                  onClick={() => handleClickThumbnail(index)}
                >
                  <img
                    className="box-content w-6 h-6 rounded-xl"
                    src={image}
                    alt={`Thumbnail ${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full h-4/5">
          <div className="flex flex-row justify-between w-full h-20 border-b border-gray-400 py-6 px-3">
            <div
              className="box-content w-full text-3xl font-bold"
              style={{ color: "#6645B9" }}
            >
              <p>제목이 들어갈 곳</p>
            </div>
            <button
              onClick={openScheduleModal}
              className="rounded-lg p-2 w-28 h-10 text-white"
              style={{ backgroundColor: "#B09FCE" }}
            >
              일정보기
            </button>
          </div>
          <div
            id="mainText"
            ref={mainTextRef}
            className={`whitespace-pre-wrap overflow-x-auto overflow-y-hidden overflow-scroll w-full h-full p-5 border-b border-gray-400 ${
              showComments ? "reduced-height" : ""
            }`}
          >
            내용이 들어갈 곳
          </div>

          <div className="flex flex-row justify-between w-full pt-5 pb-3 px-3">
            <button
              id="commentButton"
              onClick={openCommentModal}
              style={{ alignSelf: "flex-start" }}
            >
              댓글보기
            </button>
            <div>
              작성일 : 2020-02-20
              <div className="flex flex-row justify-end">
                <button style={{ display: "none" }}>수정</button>
                <button style={{ display: "none" }} className="ml-3">
                  삭제
                </button>
              </div>
            </div>
          </div>
          <div
            id="commentBox"
            className="grid grid-cols-[1fr,10fr,1.5fr] gap-2 justify-items-center items-center bg-gray-100 w-full p-3 mt-3 rounded-2xl bottom-0"
          >
            <div className="box-content bg-white h-8 w-8 rounded-full align-middle shadow-2xl">
              <img src={userImg} alt="유저이미지" />
            </div>
            <input
              type="text"
              placeholder="댓글을 작성해주세요."
              className="bg-transparent justify-self-center w-full h-8 px-4 bg-white rounded-2xl hide-input-focus outline-none"
            />
            <input
              type="submit"
              value="입력"
              className="box-content text-white rounded w-16 py-1 mr-2 cursor-pointer"
              style={{ backgroundColor: "#B09FCE" }}
            />
          </div>
        </div>
      </div>
      <ModalPortal>
        <Modal onClose={handleCloseModal} />
      </ModalPortal>
    </div>
  );
}

export default TravelPostDetail;
