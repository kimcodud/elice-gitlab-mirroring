  
  function TravelBoard() {
    function PostCard() {
      return (
        <div>
          <style>
          {`
          .postCard {
            width: 90%;
            padding-top: 80%;
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
          `}
          </style>
          <div className="postCard flex flex-col justify-end items-center m-5">
            <div className="postInfo flex flex-col justify-center items-center">
              <div className="postTittle text-xl">제목</div>
              <div className="postWriter">작성자</div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="flex justify-center items-center">
        <style>
          {`
          .area {
            width: 50%;
            height: 80px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 33px;
            margin: 80px 0 40px 0;
            padding: 0 3%;
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
      <div style={{width: '80%'}} className="flex flex-col items-center">
        <div className="area flex flex-row justify-around items-center">
          <div className="province">전체</div>
          <div className="province">서울</div>
          <div className="province">경기</div>
          <div className="province">인천</div>
          <div className="province">강원</div>
          <div className="province">경상</div>
          <div className="province">전라</div>
          <div className="province">충청</div>
          <div className="province">제주</div>
        </div>
        <div className="flex flex-row justify-between w-full px-10">
          <div>지역명</div>
          <div>드롭다운</div>
        </div>
        <div className="w-full grid grid-cols-5 my-5" >
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
    )
}

export default TravelBoard;
