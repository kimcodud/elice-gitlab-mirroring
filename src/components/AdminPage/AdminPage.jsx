import React, { useState } from "react";
import axios from "axios";

const AdminPageComponent = () => {
  const [image, setImage] = useState(null);
  const [name_en, setNameEn] = useState("");
  const [name_ko, setNameKo] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [introduction, setIntroduction] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleNameEnChange = (e) => {
    setNameEn(e.target.value);
  };

  const handleNameKoChange = (e) => {
    setNameKo(e.target.value);
  };
  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };
  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // FormData 객체를 사용하여 이미지와 텍스트 데이터를 전송

    try {
      const formData = new FormData();
      formData.append("image", image);
      const url = "http://localhost:3000/admin/locations";
      // const url = "/api/admin/locations";
      const header = {
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const body = {
        name_en: name_en,
        name_ko: name_ko,
        introduction: introduction,
        latitude: latitude,
        longitude: longitude,
      };
      // formData.append("body", body);
      for (const key in body) {
        formData.append(key, body[key]);
      }
      const response = await axios.post(url, formData, header);

      // 성공적으로 등록되었을 때 처리
      if (response.status === 200) {
        alert("여행지 등록 성공!");
        location.reload();
      } else {
        console.log("등록에 실패했습니다.");
      }
    } catch (error) {
      console.log("API 호출 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <form
      className="max-w-md mx-auto mt-10 p-4 bg-slate-50 shadow-xl rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
          여행지 이미지 등록
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="nameEn" className="block text-gray-700 font-bold mb-2">
          영문 이름
        </label>
        <input
          type="text"
          id="nameEn"
          value={name_en}
          onChange={handleNameEnChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="nameKo" className="block text-gray-700 font-bold mb-2">
          한글 이름
        </label>
        <input
          type="text"
          id="nameKo"
          value={name_ko}
          onChange={handleNameKoChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="mb-4">
        <span className="flex">
          <label
            htmlFor="nameKo"
            className="block text-gray-700 font-bold mb-2 mr-48"
          >
            위도
          </label>
          <label
            htmlFor="nameKo"
            className="block text-gray-700 font-bold mb-2"
          >
            경도
          </label>
        </span>
        <span style={{ display: "flex" }}>
          <input
            type="text"
            id="nameKo"
            value={latitude}
            onChange={handleLatitudeChange}
            className="border rounded px-3 py-2 w-48 mr-5  focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="text"
            id="nameKo"
            value={longitude}
            onChange={handleLongitudeChange}
            className="border rounded px-3 w-full py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </span>
      </div>
      <div className="mb-4">
        <label
          htmlFor="introduction"
          className="block text-gray-700 font-bold mb-2"
        >
          소개:
        </label>
        <textarea
          id="introduction"
          value={introduction}
          onChange={handleIntroductionChange}
          className="border rounded px-3 py-2 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        등록
      </button>
    </form>
  );
};

export default AdminPageComponent;
