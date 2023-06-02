import { useState } from 'react';
import image1 from './images/image-1.jpg';
import image2 from './images/image-2.jpg';
import image3 from './images/image-3.jpg';
import image4 from './images/image-4.jpg';

const tempImages = [image1, image2, image3, image4];
const tempText = '제          주           도\n제주도 여행은 멋진 자연 경관과 풍부한 문화를 경험할 수 있는 최고의 목적지입니다. 저는 최근 제주도를 방문하고 놀라움을 경험했습니다. 제주도는 아름다운 해변과 푸른 바다, 그리고 화산 풍경으로 유명합니다. 제주의 해안을 따라 걸으면 파도 소리와 함께 찾아오는 해풍을 느낄 수 있어 정말 상쾌했습니다. \n\n또한, 제주도에는 다양한 관광 명소가 있습니다. 성산일출봉에서는 아름다운 일출을 볼 수 있었고, 우도에서는 맑은 바다와 함께 자전거를 타며 휴식을 즐길 수 있었습니다. 한라산은 제주도의 상징적인 산으로, 등반을 통해 힘든 여정이었지만 정상에서 바라본 경치는 너무 멋있었습니다. \n\n제주도의 문화와 음식도 매력적이었습니다. 한라산 근처에 위치한 성읍민속마을에서는 제주의 전통 문화와 건축물을 경험할 수 있었습니다. 제주 흑돼지는 꼭 먹어봐야 할 음식이었는데, 부드럽고 풍부한 맛으로 제주도의 맛을 느낄 수 있었습니다. \n\n좋은 숙소도 찾을 수 있었습니다. 제주에는 다양한 호텔과 펜션, 게스트하우스 등 다양한 숙소가 있어서 편안하게 머무를 수 있었습니다. 직원들의 친절한 서비스와 편안한 시설은 여행의 피로를 풀어주었습니다. \n\n제주도 여행은 자연과 문화를 동시에 즐길 수 있는 멋진 장소입니다. 다음에 또 제주도를 방문하고 싶은 마음이 들 정도로 즐거웠습니다.'
const tempTittle = '제주도 힐링 여행기'
function TravelPostDetail() {
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
      <div className="flex flex-col">
        <div className="flex flex-row">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClickPrev}
          >
            이전
          </button>
          <img
            className="box-content h-64 w-64"
            src={tempImages[currentIndex]}
            alt="Main"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClickNext}
          >
            다음
          </button>
        </div>
        <div className="flex flex-row">
          {tempImages.map((image, index) => (
            <img
              className="box-content h-16 w-16"
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
    <div className="flex flex-row">
      <PhotoGallery />
      <div>
        <div className='flex flex-row'>
          <div className="box-content w-96 border-b border-gray-400"><p>{tempTittle}</p></div>
          <button className='border-2 bg-gray-200"'>일정보기</button>
        </div>
        <div className="box-content h-64 w-96 border-b border-gray-400" style={{ whiteSpace: 'pre-wrap', overflowX: 'auto', overflowY: 'scroll' }}>{tempText}</div>
        <p>작성일 : 오늘</p>
        <div>댓
          <div>회원사진</div>
        </div>
      </div>
    </div>
  );
}

export default TravelPostDetail;
