import React, { useState } from "react";
import axios from "axios";

const AdminPageComponent = () => {
  const [image, setImage] = useState(null);
  const [name_en, setNameEn] = useState("");
  const [name_ko, setNameKo] = useState("");
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

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData 객체를 사용하여 이미지와 텍스트 데이터를 전송
    const formData = new FormData();
    formData.append("image", image, image.filename);
    formData.append("name_en", name_en);
    formData.append("name_ko", name_ko);
    formData.append("introduction", introduction);

    try {
      // API 호출
      const response = await axios.post(
        "http://localhost:3000/admin/locations",
        formData
      );
      console.log(formData);

      // 성공적으로 등록되었을 때 처리
      if (response.status === 200) {
        console.log("등록되었습니다!");
      } else {
        console.log("등록에 실패했습니다.");
      }
    } catch (error) {
      console.log(response);
      console.log("API 호출 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image">이미지 업로드:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div>
        <label htmlFor="nameEn">영문 이름:</label>
        <input
          type="text"
          id="nameEn"
          value={name_en}
          onChange={handleNameEnChange}
        />
      </div>
      <div>
        <label htmlFor="nameKo">한글 이름:</label>
        <input
          type="text"
          id="nameKo"
          value={name_ko}
          onChange={handleNameKoChange}
        />
      </div>
      <div>
        <label htmlFor="introduction">소개:</label>
        <textarea
          id="introduction"
          value={introduction}
          onChange={handleIntroductionChange}
        />
      </div>
      <button type="submit">등록</button>
    </form>
  );
};

export default AdminPageComponent;
