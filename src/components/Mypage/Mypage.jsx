import { useState } from 'react';

import basicUserImage from '../../assets/user.png';


import tempImage from '../../assets/main.jpg'
const userName = '박덕배'
function UserInfoPage() {
  return (
    <div className='flex flex-col justify-center items-center text-center w-full h-4/5'>
      <div className='w-56 border border-gray-100 rounded-full flex items-center justify-center shadow-lg'>
        <img src={basicUserImage} alt="유저이미지" className='' />
      </div>
      <div className='text-gray-500 text-xl m-6'>{userName}님 안녕하세요</div>
      <button onClick={{}} style={{backgroundColor:"#B09FCE"}}
      className='text-white font-bold text-2xl px-6 py-3 rounded-xl'
      >프로필 수정</button>
      <div className='flex flex-row m-2'>
        <div className='flex flex-col bg-gray-100 w-36 h-36 m-6 p-2 rounded-2xl'>
        <div className='py-1 text-slate-500 text-lg' >나의 일정</div>
        <div className='text-6xl py-2 font-bold' style={{color:"#6645B9"}}>0</div>
      </div>
      <div className='flex flex-col bg-gray-100 w-36 h-36 m-6 p-2 rounded-2xl'>
        <div className='py-1 text-slate-500 text-lg' >나의 여행기</div>
        <div className='text-6xl py-2 font-bold' style={{color:"#6645B9"}}>0</div>
      </div>
        </div>
        <div id='box' className='flex flex-col justify-center items-center m-8 bg-gray-100 w-3/5 h-72'> {/* 임시배경색 */}
        {/*테스트*/}<div di='content' className='grid grid-cols-[1fr,1fr,2fr] grid-rows-1 h-5/6 w-11/12 bg-white  rounded-xl shadow-xl'>
          <div className='flex items-center justify-center p-5'><img className=' h-full full' src={tempImage} alt="여행지 이미지" /></div>{/* 임시 */}
          <div className='flex flex-col justify-center'>
            <div className='text-4xl py-2 font-bold' style={{color:"#6645B9"}}>JEJU</div>{/* 임시 */}
            <div className='text-2xl py-2 font-bold text-gray-500'>대한민국 제주</div>{/* 임시 */}
          </div>
          <div className='flex flex-col justify-between'>
            <div className='grid grid-cols-[1fr,2fr] grid-rows-3 gap-4 m-7'>
              <div className='font-bold text-lg' style={{color:"#B09FCE"}}>여행일자</div>
              <div className='text-lg' >2023.06.20 ~ 2023.06.27</div>{/* 임시 */}
              <div className='font-bold text-lg' style={{color:"#B09FCE"}}>최종 수정 날짜</div>
              <div className='text-lg'> 2023.05.30</div>{/* 임시 */}
              <div className='font-bold text-lg' style={{color:"#B09FCE"}}>선택장소</div>
              <div className='text-lg'>7</div>{/* 임시 */}

            </div>
            
            <div className='flex flex-row justify-between mb-8 mx-7'>
            <button onClick={{}} style={{backgroundColor:"#B09FCE"}}
      className='text-white font-normal text-xl w-32 h-12 p-2 rounded-xl shadow-md'
      >일정 수정</button>
      <button onClick={{}} style={{backgroundColor:"#B09FCE"}}
      className='text-white font-normal text-xl w-32 h-12 p-2 rounded-xl shadow-md'
      >여행기 작성</button>
      <button onClick={{}} style={{backgroundColor:"#B09FCE"}}
      className='text-white font-normal text-xl w-32 h-12 p-2 rounded-xl  shadow-md'
      >삭제</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
export default UserInfoPage;