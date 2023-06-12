import axios from "axios";
import { useState, useEffect } from "react";

import image from "../../assets/seoul2.webp";

function TravelBoard() {
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [selectedNavIndex, setSelectedNavIndex] = useState(null);
  const [chosenPosts, setChosenPosts] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState("기본값");
  const [posts, setPosts] = useState({
    id: "",
    username: "",
    plan_id: "",
    title: "",
    content: "",
    image: "",
    destination: "",
    created_at: "",
    updated_at: "",
  });
  const handleFilterClick = (filter, index) => {
    setSelectedFilter(filter);
    setSelectedNavIndex(index);
    if (filter === "전체") {
      setChosenPosts(posts);
    } else {
      const filtered = posts.filter((post) => post.destination === filter);
      setChosenPosts(filtered);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedDropdown(event.target.value);
  };

  const sortPosts = (posts, sortKey) => {
    const sortedPosts = [...posts];
    if (sortKey === "created_at") {
      sortedPosts.sort((a, b) => a.created_at.localeCompare(b.created_at));
    } else if (sortKey === "title") {
      sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortKey === "updated_at") {
      sortedPosts.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    }
    return sortedPosts;
  };

  const sortedPosts = sortPosts(chosenPosts, selectedDropdown);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const accessToken = await getAccessTokenFromCookie(); // 액세스 토큰 설정해야함
        // const header = {
        //   header: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        //   withCrendentials: true,
        // };
        const body = {
          id: posts.id,
          username: posts.username,
          plan_id: posts.title,
          title: posts.title,
          content: posts.content,
          image: posts.image,
          destination: posts.destination,
          created_at: posts.created_at,
          updated_at: posts.updated_at,
        };

        const uri = "http://localhost:3000/users/";
        // const getResponse = await axios.get(uri, body, header);
        const getResponse = await axios.get(uri, { data: body });

        const fetchedPosts = getResponse.data;
        setChosenPosts(fetchedPosts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center w-full"
      style={{ height: "calc(100vh - 7rem)" }}
    >
      <style>
        {`
          .postCard {
            padding-top: 75%;
          }
          .postCard:hover {
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 15%;
            opacity: 0.5;
          }
          .postWriter {
            color: #6645B9;
          }

          .province:hover {
            background: #E9EBED;
            color: #B09FCE;
            font-weight: bold;
            font-size: x-large;
          }
          .province.active {
            background: #B09FCE;
            color: #FFFFFF;
            font-weight: bold;

          }
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

      <nav className="area flex flex-row justify-around items-center w-1/2 h-20 border border-gray-100 shadow-lg mt-20 mb-10 rounded-full px-10">
        {[
          "전체",
          "서울",
          "경기",
          "인천",
          "강원",
          "경상",
          "전라",
          "충청",
          "제주",
        ].map((filter, index) => (
          <div
            key={filter}
            className={`province flex justify-center items-center rounded-3xl w-1/5 h-3/5 text-center text-lg cursor-pointer select-none ${
              selectedNavIndex === index ? "active" : ""
            }`}
            onClick={() => handleFilterClick(filter, index)}
          >
            {filter}
          </div>
        ))}
      </nav>

      <div className="flex flex-row justify-between px-10 w-2/3 mb-">
        <div className=" select-none text-lg">{selectedFilter}</div>
        <select
          value={selectedDropdown}
          onChange={handleDropdownChange}
          className="border border-gray-300 rounded p-2"
        >
          <option value="기본값">정렬 기준</option>
          <option value="created_at">등록일순</option>
          <option value="title">제목</option>
          <option value="updated_at">최신순</option>
        </select>
      </div>

      <div className="flex flex-col justify-start items-center w-full h-2/3 mt-4">
        <div className=" bg-gray-100 rounded-2xl  w-2/3 h-full p-3">
          <div className="overflow-auto w-full h-full ">
            <div className="grid grid-cols-5 justify-items-center items-center gap-4 ">
              {sortedPosts.map((posts) => (
                // 링크
                <a
                  href="/travelPostDetailPage"
                  key={posts.id}
                  className="${posts.destination} ${posts.created_at}  ${posts.updated_at} w-full h-1/2 flex justify-center items-center"
                >
                  <div
                    style={{
                      backgroundImage: `url(${posts.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="postCard flex flex-col justify-end items-center w-11/12 m-2  rounded-3xl cursor-pointer"
                  >
                    <div className="postInfo flex flex-col justify-center items-center w-4/5 h-1/4 bg-white shadow-md rounded-full m-4">
                      <div className="postTittle text-lg font-semibold text-gray-600 select-none overflow-hidden">
                        {posts.title.length > 10
                          ? `${posts.title.slice(0, 10)}...`
                          : posts.title}
                      </div>
                      <div className="postWriter  select-none ">
                        {posts.username.length > 10
                          ? `${posts.username.slice(0, 10)}...`
                          : posts.username}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelBoard;
