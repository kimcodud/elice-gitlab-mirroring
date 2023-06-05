import React, { useState, useEffect } from "react";
import addButton from './images/addIcon.png';
import deletButton from './images/deletIcon.png';

const tempImage = []
function TravelWrite() {
  const AddORDeleteImage = () => {
    const [tempImage, setTempImage] = useState([]);
  
    useEffect(() => {
      const initialImages = Array(4).fill(""); // 게시글 수정시 기존 이미지를 불러올 부분
      for (let i = 0; i < tempImage.length; i++) {
        initialImages[i] = tempImage[i];
      }
      setTempImage(initialImages);
    }, []);
  
    const handleImageDelete = (index) => {
      const updatedImages = tempImage.filter((_, i) => i !== index);
      setTempImage(updatedImages);
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
        const updatedImages = [...tempImage];
        updatedImages[index] = imageUrl;
        setTempImage(updatedImages);
      };
      reader.readAsDataURL(file);
    };
  
    const handleImageClick = (index) => {
      if (tempImage[index]) {
        handleImageDelete(index);
      } else {
        handleBoxClick(index);
      }
    };
  
    return (
      <div style={{width:'30%', height: '100%', margin:'2%'}}>
        <style>
          {`
            .image-box {
              width:100%;
              height: 100%;
              position: relative;
              cursor: pointer;
            }
  
            .image-box:before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 5%;
            }
  
            .image-box.no-image:before {
              border: 2px dashed gray;
            }
  
            .image {
              width: 100%;
              height: 100%;
            }
  
            .delete-button,
            .register-button {
              position: absolute;
              bottom: 0;
              right: 0;
              transform: translate(-30%, -30%);
              width: 15%;
              height: 15%;
            }
  
            .file-input {
              display: none;
            }
          `}
        </style>
  
        <div className="grid grid-cols-2 w-full h-full">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`image-box ${tempImage[index] ? "" : "no-image"}`}
              onClick={() => handleImageClick(index)}
            >
              {tempImage[index] && (
                <div>
                  <img src={tempImage[index]} alt={`Image ${index + 1}`} className="image" />
                  <img
                    src={deletButton}
                    onClick={() => handleImageDelete(index)}
                    className="delete-button"
                  />
                </div>
              )}
              {!tempImage[index] && (
                <div>
                  <input
                    id={`file-input-${index}`}
                    type="file"
                    className="file-input"
                    onChange={(event) => handleImageUpload(event, index)}
                    onClick={(event) => event.stopPropagation()}
                  />
                  <img
                    className="register-button"
                    src={addButton}
                    alt="Add Image"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div style={{width:'100%', height: '80vh'}}
    className="flex flex-row justify-center">
      <AddORDeleteImage />
      <div style={{width:'30%', height: '100%', margin:'2%', border: 'solid 2px black'}}>
        <div >
          textbox
        </div>
      </div>
      
    </div>
  )
}

export default TravelWrite;
