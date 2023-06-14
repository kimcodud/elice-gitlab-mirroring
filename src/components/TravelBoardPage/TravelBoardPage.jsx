import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TravelBoard() {
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [selectedNavIndex, setSelectedNavIndex] = useState(null);
  const [selectedDropdown, setSelectedDropdown] = useState("기본값");
  const [posts, setPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);

  const handleFilterClick = (filter, index) => {
    setSelectedFilter(filter);
    setSelectedNavIndex(index);
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

  const extractImageURLs = (imageString) => {
    let urls = [];
    try {
      urls = JSON.parse(imageString);
    } catch (error) {
      console.log(error);
    }
    if (!Array.isArray(urls)) {
      urls = [];
    }
    return urls.filter((url) => url.startsWith("http"));
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const getResponse = await axios.get("http://localhost:3000/diaries/");
        const postData = getResponse.data;
        setPosts(postData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostData();
  }, []);

  useEffect(() => {
    const filtered =
      selectedFilter === "전체"
        ? posts
        : posts.filter((post) => post.destination === selectedFilter);
    const sorted = sortPosts(filtered, selectedDropdown);
    setSortedPosts(sorted);
  }, [posts, selectedFilter, selectedDropdown]);

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
          "부산",
          "대구",
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

      {/* 필터 및 정렬 선택 */}
      <div className="flex flex-row justify-between px-10 w-2/3 mb-">
        <div className="select-none text-lg">{selectedFilter}</div>
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

      {/* 게시물 목록 */}
      <div className="flex flex-col justify-start items-center w-full h-2/3 mt-4">
        <div className="bg-gray-100 rounded-2xl w-2/3 h-full p-3">
          <div className="overflow-auto w-full h-full">
            <div className="grid grid-cols-5 justify-items-center items-center gap-4">
              {sortedPosts.map((post) => {
                const imageUrls = extractImageURLs(post.image);
                const previewImage = imageUrls.length > 0 ? imageUrls[0] : "";
                return (
                  <Link
                    to={`/TravelPostDetailPage/${post.id}`}
                    key={post.id}
                    className={`${post.destination} ${post.created_at} ${post.updated_at} w-full h-1/2 flex justify-center items-center`}
                  >
                    <div
                      style={{
                        backgroundImage: `url("${previewImage}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="postCard flex flex-col justify-end items-center w-11/12 m-2 rounded-3xl cursor-pointer"
                    >
                      <div className="postInfo flex flex-col justify-center items-center w-4/5 h-1/4 bg-white shadow-md rounded-full m-4">
                        <div className="postTitle text-lg font-semibold text-gray-600 select-none overflow-hidden">
                          {post.title.length > 9
                            ? `${post.title.slice(0, 9)}...`
                            : post.title}
                        </div>
                        <div className="postWriter select-none">
                          {post.destination}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelBoard;
