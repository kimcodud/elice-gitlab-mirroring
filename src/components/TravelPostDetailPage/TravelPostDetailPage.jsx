import { useState } from 'react';
import Modal from '../modal/modal';
import { ModalPortal } from "../modal/ModalPortal";
import { useModalStore } from '../../store/store';


import prevBtn from '../../assets/prev.webp';
import nextBtn from '../../assets/next.webp';

import image1 from './images/image-1.jpg';
import image2 from './images/image-2.jpg';
import image3 from './images/image-3.jpg';
import image4 from './images/image-4.jpg';
import {commentsData, contentText, contentTitle} from './temp'

import userImg from '../../assets/user.png';
const contentImages = [image1, image2, image3, image4];


function TravelPostDetail() {
  const { openModal } = useModalStore();

  const openScheduleModal = () => {
    openModal({
      modalType: 'schedule',
      style: {
        backgroundColor: ' #F1F5F9',
        width: '60%',
        height: '100%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
      title: <div className='text-center font-bold text-4xl'>여행 일정</div>,
      content: <div > 
          <div style={{color:'red'}}>안               녕</div>
          <div className='text-blue-400'>하세요</div>
        </div>,
    });
  };

  const openCommentModal = () => {
    openModal({
      modalType: 'comment',
      style: {
        backgroundColor: 'green',
        width: '40%',
        height: '100%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
      title: '댓글보기',
      content: tempText,
    });
  };
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClickNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contentImages.length); // 임시 데이터 이미지
    };

    const handleClickPrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? contentImages.length - 1 : prevIndex - 1 // 임시 데이터 이미지
      );
    };

    const handleClickThumbnail = (index) => {
      setCurrentIndex(index);
    };

  return (
    <div id="main" className="w-full h-screen flex justify-center items-center overflow-hidden" style={{height:'85vh'}}>
  <style>
    {`
      .btn:hover #prevBtn,
      .btn:hover #nextBtn {
        display: block;
      }
      #Imgbox:hover #imgCategory {
        display: flex;
      }
    `}
  </style>

  <div className="flex flex-row items-center gap-12 relative h-full w-2/3">
    
    <div className="flex flex-col w-full h-4/5">
      <div id='Imgbox' className="flex flex-row relative" style={{ width: '100%', height: '100%' }}>
        <div onClick={handleClickPrev}
        className="btn bg-transparent h-full w-1/6 hover:bg-gray-200 hover:bg-opacity-20 absolute top-1/2 px-3 left-0 transform -translate-y-1/2 select-none">
          <img id='prevBtn' className='hidden absolute top-1/2 w-1/2' style={{ transform: 'translateY(-50%)' }} src={prevBtn} alt="이전" />
        </div>
        <img id='mainImg' className="box-content w-full h-full object-cover rounded-2xl select-none" src={contentImages[currentIndex]} alt="Main" />  {/*임시 데이터 이미지*/}
        <div onClick={handleClickNext}
        className="btn bg-transparent h-full w-1/6 hover:bg-gray-200 hover:bg-opacity-20 absolute top-1/2 px-3 right-0 transform -translate-y-1/2 flex flex-row justify-end select-none">
          <img id='nextBtn' className='hidden absolute top-1/2 w-1/2' style={{ transform: 'translateY(-50%)' }} src={nextBtn} alt="다음" />
        </div>
        <div id='imgCategory' className='hidden flex-row justify-center absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-200 bg-opacity-50 rounded-2xl select-none mb-3 px-3 py-1'>
          {contentImages.map((image, index) => ( //{/* 임시 본문 이미지 */}
            <div className={`w-${4 / contentImages.length}  p-1 hover:bg-gray-200 hover:bg-opacity-80  rounded-xl `} key={index} // 임시 데이터 이미지
            onClick={() => handleClickThumbnail(index)}>
              <img
                className="box-content  w-6 h-6 rounded-xl"
                src={image}
                alt={`Thumbnail ${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="flex flex-col justify-between items-center  w-full h-4/5">
      <div className="flex flex-row justify-between w-full h-20 border-b border-gray-400 py-6 px-3">
        <div className="box-content w-full text-3xl font-bold" style={{color: '#6645B9'}}>
        <p>{contentTitle}</p> {/* 임시 제목 */}
        </div>
        <button onClick={openScheduleModal} className="rounded-lg p-2 w-28 h-10 text-white" style={{ backgroundColor: '#B09FCE'}}>
          일정보기
        </button>
      </div>
      <div id="mainText" className="whitespace-pre-wrap overflow-x-auto overflow-scroll w-full h-full px-5 text-xl m-5">
        {contentText} {/* 임시 본문 */}
      </div>
      <div className="flex flex-row justify-between  w-full border-t border-gray-400 pt-5 pb-3 px-3 ">
        <button onClick={openCommentModal} style={{ alignSelf: 'flex-start' }}>
          댓글보기
        </button>
        <div>
          작성일 : 2020-02-20
          <div className="flex flex-row justify-end">
            <button style={{ display: 'none' }}>수정</button>
            <button style={{ display: 'none' }} className="ml-3">
              삭제
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr,10fr,1.5fr] gap-2 justify-items-center items-center bg-gray-100 w-full p-3 mt-3 rounded-2xl bottom-0">
        <div className="box-content bg-white h-8 w-8 rounded-full align-middle shadow-2xl">
          <img src={userImg} alt="유저이미지" />
        </div>
        <input
          type="text"
          placeholder={'댓글을 작성해주세요.'}
          className="bg-transparent justify-self-center w-full h-8 px-4 bg-white rounded-2xl hide-input-focus outline-none"
        />
        <input
          type="submit"
          value="입력"
          className="box-content text-white rounded w-16 py-1 mr-2 cursor-pointer" style={{ backgroundColor: '#B09FCE'}}
        />
      </div>
    </div>
    <ModalPortal>
      <Modal />
    </ModalPortal>
  </div>
</div>

  );
}

export default TravelPostDetail;
