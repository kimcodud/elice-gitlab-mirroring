import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useModalStore } from "../../store/store";
import axios from "axios";
import { ModalPortal } from "../modal/ModalPortal.jsx";
import Modal from "../modal/modal";
import { useInView } from "react-intersection-observer";

function TravelPostDetail(props) {
  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    id: "",
    username: "",
    planId: "",
    title: "",
    content: "",
    image: "",
    destination: "",
    createdAt: "",
    updatedAt: "",
  });
  const [travelInfo, setTravelInfo] = useState({
    startDate: "",
    endDate: "",
    username: "",
    destination: "",
    dates: [],
  });

  const changetoKoreaDate = (dateString) => {
    if (!dateString) {
      return "";
    }
    return dateString.slice(0, -14);
  };

  const travelStart = changetoKoreaDate(travelInfo.startDate);
  const travelEnd = changetoKoreaDate(travelInfo.endDate);
  const travelDayCount = travelInfo.dates.length;
  const postImageArr = post.image ? JSON.parse(post.image) : [];

  const { postId } = useParams();

  useEffect(() => {
    const fetchPostDetailData = async () => {
      try {
        const apiUrl =
          import.meta.env.VITE_APP_SERVER_MODE === "DEV"
            ? import.meta.env.VITE_APP_API_DEV_URL
            : import.meta.env.VITE_APP_API_PROD_URL;
        const getPostResponse = await axios.get(`${apiUrl}/diaries/${postId}`);

        setPost({
          ...getPostResponse.data,
          image: Array.isArray(getPostResponse.data.image)
            ? getPostResponse.data.image
            : [getPostResponse.data.image],
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostDetailData();
  }, []);

  const CommentComponent = () => {
    // 댓글 조회
    const [commentBoard, setCommentBoard] = useState([]);
    const [page, setPage] = useState(1);
    // 댓글 조회
    const fetchComment = async () => {
      try {
        const apiUrl =
          import.meta.env.VITE_APP_SERVER_MODE === "DEV"
            ? import.meta.env.VITE_APP_API_DEV_URL
            : import.meta.env.VITE_APP_API_PROD_URL;
        const getCommentResponse = await axios.get(
          `${apiUrl}/comments/diaries/${postId}?page=${page}`,
          {
            withCredentials: true,
          } //예외처리
        );
        //console.log("ㅇㅇ", getCommentResponse.data.comments);
        if (page === 1) {
          setCommentBoard(getCommentResponse.data.comments);
        } else {
          setCommentBoard((prevCommentBoard) => [
            ...prevCommentBoard,
            ...getCommentResponse.data.comments,
          ]);
        }
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      fetchComment(); // 초기 렌더링 시 댓글 가져오기
    }, [postId]);

    const [ref, inView] = useInView();

    useEffect(() => {
      // inView가 true 일때만 실행한다.
      if (inView) {
        fetchComment(); // 무한 스크롤 시 댓글 가져오기
      }
    }, [inView]);

    //댓글 수정
    const [edittingComment, setEdittingComment] = useState(false);
    const [editCommentValue, setEditCommentValue] = useState("");
    const handleEditCommentClick = (commentId) => {
      setCommentBoard((prevCommentBoard) =>
        prevCommentBoard.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              editing: true,
            };
          }
          return comment;
        })
      );
    };

    const handleEditCommentInputChange = (e, commentId) => {
      setCommentBoard((prevCommentBoard) =>
        prevCommentBoard.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              editCommentValue: e.target.value,
            };
          }
          return comment;
        })
      );
    };

    const handleEnterPress = (e, commentId) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleEditCommentSubmit(commentId);
      }
    };

    const handleEditCommentSubmit = async (commentId, e) => {
      e.preventDefault();
      try {
        const commentToUpdate = commentBoard.find(
          (comment) => comment.id === commentId
        );
        const apiUrl =
          import.meta.env.VITE_APP_SERVER_MODE === "DEV"
            ? import.meta.env.VITE_APP_API_DEV_URL
            : import.meta.env.VITE_APP_API_PROD_URL;
        const editCommentResponse = await axios.put(
          `${apiUrl}/comments/${commentId}`,
          {
            comment: commentToUpdate.editCommentValue,
          },
          {
            withCredentials: true,
          }
        );
        setCommentBoard((prevCommentBoard) =>
          prevCommentBoard.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                editing: false,
                comment: editCommentResponse.data,
              };
            }
            return comment;
          })
        );
        closeModal();
        alert("댓글이 수정되었습니다.");
      } catch (error) {
        console.log(error);
        alert("본인이 작성한 댓글이 아닙니다.\n수정할 수 없습니다.");
      }
    };

    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        {commentBoard.map((comment, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr,8fr] grid-rows-[1fr,auto] w-11/12 h-full mb-6"
          >
            <div className="col-span-1 row-span-full w-full p-1">
              <div
                style={{
                  backgroundImage: `url("/assets/user.webp")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="flex justify-center items-center w-9 h-9 bg-white rounded-full align-middle shadow-md"
              ></div>
            </div>
            <div className="flex flex-row justify-between w-full h-full ">
              <div className="m-0">
                <span className="pr-2">{comment.username}</span>
                {comment.editing ? (
                  <button
                    onClick={(e) => handleEditCommentSubmit(comment.id, e)}
                    className="text-gray-400 text-xs"
                  >
                    완료
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditCommentClick(comment.id)}
                    className="text-gray-400 text-xs"
                  >
                    수정
                  </button>
                )}
              </div>
              <button
                onClick={async () => {
                  try {
                    const apiUrl =
                      import.meta.env.VITE_APP_SERVER_MODE === "DEV"
                        ? import.meta.env.VITE_APP_API_DEV_URL
                        : import.meta.env.VITE_APP_API_PROD_URL;
                    await axios.delete(`${apiUrl}/comments/${comment.id}`, {
                      withCredentials: true,
                    });
                    window.location.reload();
                    alert("댓글이 삭제되었습니다.");
                  } catch (error) {
                    console.log(error);
                    alert(
                      "본인이 작성한 댓글이 아닙니다.\n삭제할 수 없습니다."
                    );
                  }
                }}
                className="flex justify-end items-start w-1/12 select-none "
              >
                <img
                  className="w-2/3"
                  src="/assets/close.webp"
                  alt="댓글삭제"
                />
              </button>
            </div>
            {comment.editing ? (
              <input
                type="text"
                value={comment.editCommentValue}
                onChange={(e) => handleEditCommentInputChange(e, comment.id)}
                onKeyDown={(e) => handleEnterPress(e, comment.id)}
                className="hide-input-focus outline-none flex flex-row items-start w-full h-4/5 py-1 px-2"
              />
            ) : (
              <div className="flex flex-row items-start w-full h-full">
                {comment.comment}
              </div>
            )}
          </div>
        ))}
        <div ref={ref}>댓글이 더 이상 없습니다.</div>
      </div>
    );
  };

  useEffect(() => {
    //특정여행일정 가져오기
    const fetchTravelPlanData = async () => {
      try {
        const apiUrl =
          import.meta.env.VITE_APP_SERVER_MODE === "DEV"
            ? import.meta.env.VITE_APP_API_DEV_URL
            : import.meta.env.VITE_APP_API_PROD_URL;
        const getTravelPlanResponse = await axios.get(
          `${apiUrl}/travels/${post.planId}`,
          {
            params: {
              startDate: travelInfo.startDate,
              endDate: travelInfo.endDate,
              username: travelInfo.username,
              destination: travelInfo.destination,
              dates: travelInfo.dates,
            },
            withCredentials: true,
          }
        );
        setTravelInfo(getTravelPlanResponse.data.travelPlanData);
      } catch (error) {
        console.log(error);
      }
    };

    if (post.planId) {
      fetchTravelPlanData();
    }
  }, [post.planId]);

  const ScheduleComponent = () => {
    // 일정
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <div className="mb-3 text-center">
          {travelDayCount === 0
            ? "당일치기"
            : `${travelDayCount - 1}박 ${travelDayCount}일`}
          <br />
          {travelStart} ~ {travelEnd}
        </div>
        {[...Array(travelDayCount)].map((_, main) => (
          <div
            key={main}
            className="bg-gray-100 w-4/5 flex flex-col justify-center items-center rounded-2xl my-3 py-5 shadow-md"
          >
            <div className="text-2xl text-center">{main + 1} 일차</div>
            {travelInfo.dates[main].locations.map((location, sub) => (
              <div
                key={sub}
                className="flex flex-col w-4/5 bg-white py-1 px-4 my-2 rounded"
              >
                <div className="font-bold">{location.location}</div>
                {/* <div>경기도 경기시 경기구 경기경기로 1234-1</div> */}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const openScheduleModal = () => {
    //일정 모달
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
      content: (
        <div>
          <ScheduleComponent />
        </div>
      ),
    });
  };

  const openCommentModal = () => {
    //댓글 모달

    openModal({
      modalType: "comment",
      style: {
        backgroundColor: "rgb(249, 250, 251)",
        width: "32.8%",
        height: "82%",
        top: "59%",
        left: "32.7%",
        transform: "translate(-50%, -50%)",
      },
      title: <div className="border-b border-gray-300 pb-4">댓글</div>,
      content: <CommentComponent />,
    });
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % postImageArr.length);
  };

  const handleClickPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? postImageArr.length - 1 : prevIndex - 1
    );
  };

  const handleClickThumbnail = (index) => {
    setCurrentIndex(index);
  };

  const handleClickDeletPost = async () => {
    try {
      const apiUrl =
        import.meta.env.VITE_APP_SERVER_MODE === "DEV"
          ? import.meta.env.VITE_APP_API_DEV_URL
          : import.meta.env.VITE_APP_API_PROD_URL;
      await axios.delete(`${apiUrl}/mypage/diaries/${post.id}`, {
        withCredentials: true,
      });
      alert("여행기가 삭제되었습니다.");
      navigate("/travelBoard");
    } catch (error) {
      console.log(error);
      alert("나의 여행기가 아닙니다.\n삭제할 수 없습니다.");
    }
  };
  const [comment, setComment] = useState("");
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    // 댓글 달기 post
    e.preventDefault();
    try {
      const apiUrl =
        import.meta.env.VITE_APP_SERVER_MODE === "DEV"
          ? import.meta.env.VITE_APP_API_DEV_URL
          : import.meta.env.VITE_APP_API_PROD_URL;
      const url = `${apiUrl}/comments`;
      const header = {
        withCredentials: true,
      };
      const body = {
        diaryId: `${postId}`,
        comment: comment,
      };
      const response = await axios.post(url, body, header);
      setComment("");
      alert("댓글 작성이 완료되었습니다.");
    } catch (error) {
      console.log("API 호출 중 오류가 발생했습니다:", error);
      alert("회원만 작성이 가능합니다.");
    }
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
                src="/assets/prev.webp"
                alt="이전"
              />
            </div>
            {postImageArr.length > 0 && (
              <img
                id="mainImg"
                className="box-content w-full h-full object-cover rounded-2xl select-none"
                src={postImageArr[currentIndex]}
                alt="Main"
              />
            )}

            {postImageArr.length > 1 && (
              // 이미지 썸네일 렌더링
              <div
                id="imgCategory"
                className="hidden flex-row justify-center absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-200 bg-opacity-50 rounded-2xl select-none mb-3 px-3 py-1"
              >
                {postImageArr.map((image, index) => (
                  <div
                    className={`w-${
                      4 / postImageArr.length
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
            )}
            <div
              onClick={handleClickNext}
              className="btn bg-transparent h-full w-1/6 hover:bg-gray-200 hover:bg-opacity-20 absolute top-1/2 px-3 right-0 transform -translate-y-1/2 flex flex-row justify-end select-none"
            >
              <img
                id="nextBtn"
                className="hidden absolute top-1/2 w-1/2"
                style={{ transform: "translateY(-50%)" }}
                src="/assets/next.webp"
                alt="다음"
              />
            </div>
            <div
              id="imgCategory"
              className="hidden flex-row justify-center absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-200 bg-opacity-50 rounded-2xl select-none mb-3 px-3 py-1"
            >
              {postImageArr.map((image, index) => (
                <div
                  className={`w-${
                    4 / postImageArr.length
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
              {post.title}
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
            className="whitespace-pre-wrap overflow-x-auto overflow-scroll w-full h-full px-5 m-5"
          >
            {post.content}
          </div>

          <div className="flex flex-row justify-between w-full pt-5 pb-3 px-3 border-t border-gray-400 py-6">
            <div className="flex flex-col">
              <div>글쓴이 : {travelInfo.username}</div>
              <button
                onClick={openCommentModal}
                style={{ alignSelf: "flex-start" }}
              >
                댓글보기
              </button>
            </div>
            <div className="flex flex-col">
              <div>
                {changetoKoreaDate(post.createdAt)}
                {post.createdAt !== post.updatedAt &&
                  ` (${changetoKoreaDate(post.createdAt)})`}
              </div>
              <div className="flex flex-row justify-end">
                <Link to={`/TravelEditPage/${post.id}`}>수정</Link>
                <button onClick={handleClickDeletPost} className="ml-5">
                  삭제
                </button>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleCommentSubmit}
            id="commentBox"
            className="grid grid-cols-[1fr,10fr,1.5fr] gap-2 justify-items-center items-center bg-gray-100 w-full p-3 mt-3 rounded-2xl bottom-0"
          >
            <div className="box-content bg-white h-8 w-8 rounded-full align-middle shadow-2xl">
              <img src="/assets/user.webp" alt="유저이미지" />
            </div>
            <input
              type="text"
              placeholder="댓글을 작성해주세요."
              value={comment}
              onChange={handleCommentChange}
              className="bg-transparent justify-self-center w-full h-8 px-4 bg-white rounded-2xl hide-input-focus outline-none"
            />
            <input
              type="submit"
              value="입력"
              className="box-content text-white rounded w-16 py-1 mr-2 cursor-pointer"
              style={{ backgroundColor: "#B09FCE" }}
            />
          </form>
        </div>
      </div>
      <ModalPortal>
        <Modal />
      </ModalPortal>
    </div>
  );
}

export default TravelPostDetail;
