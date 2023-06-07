import { useState } from 'react';
import Modal from '../modal/modal';
import { useModalStore } from '../../store/store';

import prevBtn from '../../assets/prev.png';
import nextBtn from '../../assets/next.png';

import image1 from './images/image-1.jpg';
import image2 from './images/image-2.jpg';
import image3 from './images/image-3.jpg';
import image4 from './images/image-4.jpg';

const tempImages = [image1, image2, image3, image4];
const tempText = '제          주           도\n제주도 여행은 멋진 자연 경관과 풍부한 문화를 경험할 수 있는 최고의 목적지입니다. 저는 최근 제주도를 방문하고 놀라움을 경험했습니다. 제주도는 아름다운 해변과 푸른 바다, 그리고 화산 풍경으로 유명합니다. 제주의 해안을 따라 걸으면 파도 소리와 함께 찾아오는 해풍을 느낄 수 있어 정말 상쾌했습니다. \n\n또한, 제주도에는 다양한 관광 명소가 있습니다. 성산일출봉에서는 아름다운 일출을 볼 수 있었고, 우도에서는 맑은 바다와 함께 자전거를 타며 휴식을 즐길 수 있었습니다. 한라산은 제주도의 상징적인 산으로, 등반을 통해 힘든 여정이었지만 정상에서 바라본 경치는 너무 멋있었습니다. \n\n제주도의 문화와 음식도 매력적이었습니다. 한라산 근처에 위치한 성읍민속마을에서는 제주의 전통 문화와 건축물을 경험할 수 있었습니다. 제주 흑돼지는 꼭 먹어봐야 할 음식이었는데, 부드럽고 풍부한 맛으로 제주도의 맛을 느낄 수 있었습니다. \n\n좋은 숙소도 찾을 수 있었습니다. 제주에는 다양한 호텔과 펜션, 게스트하우스 등 다양한 숙소가 있어서 편안하게 머무를 수 있었습니다. 직원들의 친절한 서비스와 편안한 시설은 여행의 피로를 풀어주었습니다. \n\n제주도 여행은 자연과 문화를 동시에 즐길 수 있는 멋진 장소입니다. 다음에 또 제주도를 방문하고 싶은 마음이 들 정도로 즐거웠습니다.';
const tempTitle = '제주도 힐링 여행기';

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

  function PhotoGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClickNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tempImages.length);
    };

    const handleClickPrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? tempImages.length - 1 : prevIndex - 1
      );
    };

    const handleClickThumbnail = (index) => {
      setCurrentIndex(index);
    };

    return (
      <div className="flex flex-col containers">
        <style>
          {`
            #prevBtn,
            #nextBtn {
              display: none;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: 50%;
              hight: 50%;
            }
            .btn:hover #prevBtn,
            .btn:hover #nextBtn {
              display: block;
            }
          `}
        </style>
        <div
          className="flex flex-row relative"
          style={{ width: '100%', height: '100%' }}
        >
          <div
            className="btn bg-transparent h-full w-1/5 hover:bg-gray-200 hover:bg-opacity-40 absolute top-1/2 px-3 left-0 transform -translate-y-1/2"
            onClick={handleClickPrev}
          >
            <img id="prevBtn" src={prevBtn} alt="이전" />
          </div>
          <img
            className="mainImg box-content w-full h-full object-cover"
            src={tempImages[currentIndex]}
            alt="Main"
          />
          <div
            className="btn bg-transparent h-full w-1/5 hover:bg-gray-400 hover:bg-opacity-40 absolute top-1/2 px-3 right-0 transform -translate-y-1/2 flex flex-row justify-end"
            onClick={handleClickNext}
          >
            <img id="nextBtn" src={nextBtn} alt="다음" />
          </div>
        </div>
        <div className="flex flex-row justify-between mt-3 ">
          {tempImages.map((image, index) => (
            <img
              className="box-content h-24 w-24"
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              onClick={() => handleClickThumbnail(index)}
            />
          ))}
        </div>
      </div>
    );
  }


  return (
    <div>
  <style>
    {`
      .bg-lightPurple {
        background-color: #B09FCE;
      }
      .text-darkPurple {
        color: #6645B9;
      }
      #main {
        height: 85vh;
      }

      #mainText {
        white-space: pre-wrap;
        overflow-x: auto;
        overflow-y: scroll;
        width: 90%;
        height: 49%;
        padding: 1% 2%;
      }

      .containers {
        width: 30%;
        padding: 1%;
      }
    `}
  </style>
  <div id="main" className="flex flex-row justify-center relative">
    <PhotoGallery />
    <div className="containers h-full">
      <div className="flex flex-row justify-between w-100% border-b border-gray-400 pb-4 pt-4">
        <div className="box-content w-96 text-3xl font-bold text-darkPurple">
          <p>{tempTitle}</p>
        </div>
        <button onClick={openScheduleModal} className="rounded-lg bg-lightPurple p-2 w-20 h-10 text-white">
          일정보기
        </button>
      </div>
      <div id="mainText" className="box-content text-xl mt-5 mb-5">
        {tempText}
      </div>
      <div className="flex flex-row justify-between border-t border-gray-400 pt-5 pb-3">
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
      <div className="grid grid-cols-[1fr,10fr,1.5fr] gap-2 items-center box-content bg-slate-100 p-3 mt-5">
        <div className="box-content bg-lightPurple h-8 w-8 rounded-full align-middle"></div>
        <input
          type="text"
          placeholder={'댓글을 작성해주세요.'}
          className="bg-transparent"
        />
        <input
          type="submit"
          value="입력"
          className="box-content bg-lightPurple text-white rounded-lg p-1 cursor-pointer"
        />
      </div>
    </div>
    <Modal />
  </div>
</div>

  );
}

export default TravelPostDetail;
