import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TravelPostEdit = () => {
  const navigate = useNavigate();
  const [selectImages, setSelectImages] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

  //디테일 페이지에서 가져온 사진 배열
  const postImageArr = post.image ? JSON.parse(post.image) : [];

  const { postId } = useParams();

  useEffect(() => {
    setSelectImages([...selectImages]);
  }, []);

  const handleImageDelete = (index) => {
    setSelectImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleBoxClick = (index) => {
    const fileInput = document.getElementById(`file-input-${index}`);
    fileInput.click();
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      setSelectImages((prevImages) =>
        [...prevImages, imageUrl].filter(Boolean)
      );
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = (index) => {
    if (selectImages[index]) {
      handleImageDelete(index);
    } else {
      handleBoxClick(index);
    }
  };

  const handleTittleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectImages.length === 0) {
        alert("이미지를 등록해주세요.");
        return;
      }

      const formData = new FormData();
      for (let i = 0; i < selectImages.length; i++) {
        const imageFile = await fetch(selectImages[i])
          .then((response) => response.blob())
          .then(
            (blob) =>
              new File([blob], `image${i + 1}.png`, { type: "image/png" })
          );
        formData.append("image", imageFile);
      }

      // formData.append("title", title); // title 추가
      // formData.append("content", content); // content 추가
      const apiUrl =
        import.meta.env.VITE_APP_SERVER_MODE === "DEV"
          ? import.meta.env.VITE_APP_API_DEV_URL
          : import.meta.env.VITE_APP_API_PROD_URL;
      const url = `${apiUrl}/mypage/diaries/${postId}`;
      const header = {
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const body = {
        title: title,
        content: content,
      };

      for (const key in body) {
        formData.append(key, body[key]);
      }

      const response = await axios.put(url, formData, header);

      alert("여행기 수정이 완료되었습니다.");
      navigate(`/TravelPostDetailPage/${postId}`);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="flex justify-center items-center p-16"
        style={{ height: "calc(100vh - 7rem)" }}
      >
        <div className="grid grid-cols-2 gap-4 w-4/5 h-full">
          <div style={{ width: "100%", height: "100%", margin: "2%" }}>
            <a
              href="/mypage"
              className="flex flex-row items-center w-full h-1/12 mb-3"
              style={{ cursor: "pointer" }}
            >
              <img
                src="/assets/goBackIcon.webp"
                className="w-6 h-6 mr-6"
                alt="go back to mypage"
              />
              <span className="text-2xl">마이페이지</span>
            </a>
            <div
              className="grid grid-cols-2 grid-rows-2 w-5/6 h-5/6 my-6 justify-items-end items-end"
              style={{ height: "calc(100% - 5.5rem)" }}
            >
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`imageBox w-full flex justify-center items-center mb-3 h-0 relative cursor-pointer overflow-hidden rounded-2xl
                ${selectImages[index] ? "" : "emptyImage"}`}
                  style={{
                    width: "calc(95% - 1rem)",
                    paddingBottom: "100%",
                    backgroundColor: "#DCDCDC",
                  }}
                  onClick={() => handleImageClick(index)}
                >
                  {selectImages[index] && (
                    <div>
                      <img
                        src={selectImages[index]}
                        alt={`Image ${index + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                      <img
                        src="/assets/deletIcon.webp"
                        onClick={() => handleImageDelete(index)}
                        className="absolute bottom-0 right-0 object-cover w-1/6"
                        style={{ transform: "translate(-30%, -30%)" }}
                      />
                    </div>
                  )}
                  {!selectImages[index] && (
                    <div>
                      <input
                        id={`file-input-${index}`}
                        type="file"
                        className="hidden"
                        onChange={(event) => handleImageUpload(event, index)}
                        onClick={(event) => event.stopPropagation()}
                      />
                      <img
                        className="absolute bottom-0 right-0 object-cover w-1/6"
                        style={{ transform: "translate(-30%, -30%)" }}
                        src="/assets/addIcon.webp"
                        alt="Add Image"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            className="flex flex-col justify-between items-end w-full h-full"
            style={{ margin: "2%" }}
          >
            <div className="flex flex-col mt-6 w-full h-full">
              <div className="grid grid-cols-[10rem,1fr] justify-center items-center w-full h-1/6 ">
                {/* <div className="py-2 px-4 text-lg font-normal justify-self-center "></div>
                <div className="py-2 px-4 text-right">토글</div> */}
              </div>
              <div className="grid grid-cols-[10rem,1fr] justify-center items-center w-full border-b border-gray-300 h-1/6">
                {/* <div className="py-4 px-4 text-lg font-normal justify-self-center select-none">
                  지역
                </div>
                <div className="py-2 px-4 select-none">
                  {userTravelInfo.destination &&
                    JSON.parse(userTravelInfo.destination).nameKo}
                </div> */}
              </div>
              <div className="grid grid-cols-[10rem,1fr] justify-center items-center w-full border-b border-gray-300 h-1/6">
                <div className="p-4 text-lg font-normal justify-self-center select-none">
                  제목
                </div>
                <div className="h-full p-4">
                  <input
                    type="text"
                    onChange={handleTittleChange}
                    value={title}
                    placeholder="제목을 입력해주세요."
                    style={{ border: "1px solid #B09FCE" }}
                    className="w-full h-full text-lg px-4 py-2  hide-input-focus outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-[10rem,1fr] justify-center items-center w-full h-full">
                <div className="py-2 px-4 text-lg font-normal justify-self-center select-none">
                  본문
                </div>
                <div className="h-full p-4">
                  <textarea
                    onChange={handleContentChange}
                    value={content} //임시
                    placeholder="본문 내용을 입력해주세요."
                    style={{ border: "1px solid #B09FCE" }}
                    className="w-full h-full text-lg px-4 py-2  hide-input-focus outline-none"
                  />
                </div>
              </div>
            </div>
            <input
              type="submit"
              value="여행기 수정"
              style={{ background: "#B09FCE" }}
              className="my-5 mx-3 px-24 py-3 text-white text-xl font-bold rounded shadow-md cursor-pointer"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default TravelPostEdit;
