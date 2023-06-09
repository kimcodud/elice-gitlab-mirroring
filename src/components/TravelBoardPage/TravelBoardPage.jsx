  
  function TravelBoard() {
    function PostCard() {
      return (
        <div className="w-full h-1/2 flex justify-center items-center">
          <style>
          {`
          .postCard {
            width: 90%;
            padding-top: 75%;
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 33px;
            background: #D9D9D9;
          }
          .postCard:hover {
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 50px;
            background: #FFFFFF;
          }
          
          .postInfo {
            width: 75%;
            height: 20%;
            margin: 6%;
            background: #FFFFFF;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 33px;
          }
          .postWriter {
            color: #6645B9;
          }

          .province {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 33px;
            width: 20%;
            height: 60%;
            text-align: center;
            font-size: large;
          }
          .province:hover {
            background: #E9EBED;
            color: #B09FCE;
            font-weight: bold;
            font-size: x-large;
          }
          `}
          </style>
          <div className="postCard flex flex-col justify-end items-center m-3">
            <div className="postInfo flex flex-col justify-center items-center">
              <div className="postTittle text-xl">제목</div>
              <div className="postWriter">작성자</div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col justify-center items-center w-full" style={{height:'85vh'}}>
        <nav className="area flex flex-row justify-around items-center w-1/2 h-20 border border-gray-100 shadow-lg mt-20 mb-10 rounded-full px-10">
          <div className="province">전체</div>
          <div className="province">서울</div>
          <div className="province">경기</div>
          <div className="province">인천</div>
          <div className="province">강원</div>
          <div className="province">경상</div>
          <div className="province">전라</div>
          <div className="province">충청</div>
          <div className="province">제주</div>
        </nav>
        
        <style>
          {`
          .overflow-auto {
            overflow: hidden;
            position: relative;
          }

          .overflow-auto:hover {
            overflow: auto;
          }

          .overflow-auto::-webkit-scrollbar {
            width: 8px;
          }

          .overflow-auto::-webkit-scrollbar-track {
            background-color: #F1F5F9;
          }

          .overflow-auto::-webkit-scrollbar-thumb {
            background-color: #B09FCE;
            border-radius: 4px;
          }

          .overflow-auto::-webkit-scrollbar-thumb:hover {
            background-color: #6645B9;
          }
          `}

        </style>
        <div className="flex flex-row justify-between px-10 w-2/3 mb-">
          <div>지역명</div>
          <div>드롭다운</div>
        </div>



        <div className="flex flex-col justify-start items-center w-full h-2/3 mt-4">
          <div className=" bg-gray-100 rounded-2xl  w-2/3 h-full p-3">
          <div className="overflow-auto w-full h-full ">
            <div className="grid grid-cols-5 justify-items-center items-center gap-4 ">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />   
            </div>
          </div>
          </div>
        </div>
      </div>
    )
}

export default TravelBoard;
