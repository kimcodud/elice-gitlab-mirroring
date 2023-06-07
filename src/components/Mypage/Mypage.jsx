import { useState } from 'react';

import basicUserImage from '../../assets/user.png';
import prevBtn from '../../assets/prev.png';
import moveBtn from '../../assets/goBackIcon.png';

import tempImage from '../../assets/main.jpg'

const userName = '박덕배'
const travelSchedule = [{
  id: '1',
  image: basicUserImage,
  egPlaceName: 'JEJU',
  koPlaceName: '제주',
  date: '2020.02.02 ~ 2020.02.20',
  updateDate: '2020.01.25',
  pickPlace: '1'
}, {
  id: '2',
  image: prevBtn,
  egPlaceName: 'Busan',
  koPlaceName: '부산',
  date: '2021.03.03 ~ 2020.03.08',
  updateDate: '2021.02.28',
  pickPlace: '2'
}, {
  id: '3',
  image: tempImage,
  egPlaceName: 'GANGWON',
  koPlaceName: '강원',
  date: '2022.09.02 ~ 2020.09.6',
  updateDate: '2022.08.25',
  pickPlace: '3'
},
]


function UserInfoPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % travelSchedule.length);
  };

  const handleClickPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? travelSchedule.length - 1 : prevIndex - 1
    );
  };

  const handleEditSchedule = () => {
    {/* 임시 */ }
    alert(travelSchedule[currentIndex].id);
  }
  const handleWrite = () => {
    {/* 임시 */ }
    alert(travelSchedule[currentIndex].id);
  }
  const handleDeletSchedule = () => {
    alert(travelSchedule[currentIndex].koPlaceName + " 일정이 삭제되었습니다.");
  };


  return (
    <div className='flex flex-col justify-center items-center text-center w-full' style={{ height: 'calc(100vh - 7rem)' }}>
      <div className='h-1/5 border border-gray-100 rounded-full flex items-center justify-center shadow-lg' >
        <img className='h-full' src={basicUserImage} alt="유저이미지" />
      </div>
      <div className='text-gray-500 text-lg m-3'>{userName}님 안녕하세요</div>
      <button style={{ backgroundColor: "#B09FCE" }}
        className='text-white font-bold text-lg px-4 py-2 rounded-xl'
      >프로필 수정</button>
      <div className='flex flex-row w-1/5 h-1/5'>
        <div className='flex flex-col bg-gray-100 w-1/2 h- m-6 p-2 rounded-2xl'>
          <div className='py-1 text-slate-500' >나의 일정</div>
          <div className='text-5xl py-2 font-bold' style={{ color: "#6645B9" }}>{travelSchedule.length}</div> {/*임시*/}
        </div>
        <div className='flex flex-col bg-gray-100 w-1/2 m-6 p-2 rounded-2xl'>
          <div className='py-1 text-slate-500' >나의 여행기</div>
          <div className='text-5xl py-2 font-bold' style={{ color: "#6645B9" }}>0</div> {/*임시*/}
        </div>
      </div>
      <div id='box' className='flex flex-col justify-center items-center m-4 bg-gray-100 w-7/12 h-72 relative'>
        <div
          className="flex bg-transparent h-full w-1/12 absolute top-1/2 left-0 transform -translate-y-1/2 
    opacity-0  hover:opacity-100 transition-opacity duration-300
    "
          onClick={handleClickPrev}
        >
          <img id="prevBtn" src={moveBtn} alt="이전"
            className="w-2/5  object-contain"
          />
        </div>
        <div di='content' className='grid grid-cols-[1fr,1fr,2fr] grid-rows-1 h-5/6 w-11/12 bg-white  rounded-xl shadow-xl'>
          <div className='flex items-center justify-center p-5'><img className=' h-full full' src={travelSchedule[currentIndex].image} alt="여행지 이미지" /></div>{/* 임시 */}
          <div className='flex flex-col justify-center'>
            <div className='text-4xl py-2 font-bold' style={{ color: "#6645B9" }}>{travelSchedule[currentIndex].egPlaceName}</div>{/* 임시 */}
            <div className='text-2xl py-2 font-bold text-gray-500'>대한민국 {travelSchedule[currentIndex].koPlaceName}</div>{/* 임시 */}
          </div>
          <div className='flex flex-col justify-between'>
            <div className='grid grid-cols-[1fr,2fr] grid-rows-3 gap-4 m-7'>
              <div className='font-bold text-lg' style={{ color: "#B09FCE" }}>여행일자</div>
              <div className='text-lg' >{travelSchedule[currentIndex].date}</div>{/* 임시 */}
              <div className='font-bold text-lg' style={{ color: "#B09FCE" }}>최종 수정 날짜</div>
              <div className='text-lg'> {travelSchedule[currentIndex].updateDate}</div>{/* 임시 */}
              <div className='font-bold text-lg' style={{ color: "#B09FCE" }}>선택장소</div>
              <div className='text-lg'>{travelSchedule[currentIndex].pickPlace}</div>{/* 임시 */}

            </div>

            <div className='flex flex-row justify-between mb-8 mx-7'>
              <button onClick={handleEditSchedule} style={{ backgroundColor: "#B09FCE" }}
                className='text-white font-normal text-lg w-1/3 h-12 p-2 rounded-xl shadow-md'
              >일정 수정</button>
              <button onClick={handleWrite} style={{ backgroundColor: "#B09FCE" }}
                className='text-white font-normal text-lg w-1/3 h-12 p-2 mx-4 rounded-xl shadow-md'
              >여행기 작성</button>
              <button onClick={handleDeletSchedule} style={{ backgroundColor: "#B09FCE" }}
                className='text-white font-normal text-lg w-1/3 h-12 p-2 rounded-xl  shadow-md'
              >삭제</button>
            </div>
          </div>
        </div>

        <div
          className="flex bg-transparent h-full w-1/12 absolute top-1/2 right-0 transform -translate-y-1/2 justify-end opacity-0  hover:opacity-100 transition-opacity duration-300 "
          onClick={handleClickNext}
        >
          <img
            id="nextBtn"
            src={moveBtn}
            alt="다음"
            className="w-2/5  object-contain transform scale-x-[-1]"
          />
        </div>
      </div>
      <div>
        - {currentIndex + 1} -
      </div>
    </div>
  )
}
export default UserInfoPage;