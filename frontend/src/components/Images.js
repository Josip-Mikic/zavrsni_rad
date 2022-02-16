import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import {
  image64toCanvasRef,
  extractImageFileExtensionFromBase64,
  base64StringtoFile,
} from "../utilities/imageManipulationTools";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// Convert a Base64-encoded string to a File object

function Images(props) {
  const [imgSrc, setImgSrc] = useState();
  const [imgDesc, setImgDesc] = useState();
  const [imgW, setImgW] = useState();
  const [imgH, setImgH] = useState();
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 4 / 6 });
  const x = useSelector((state) => state.userSignin);
  const { userInfo } = x;
  const fileInputRef = useRef();
  let imgPreviewCanvas = useRef();
  const handleImageLoaded = () => {};
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImgSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const uploadHandler = async (image) => {
    const bodyFormData = new FormData();
    bodyFormData.append("image", image);
    try {
      const { data } = await axios.post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          autorisation: `Bearer ${userInfo.token}`,
        },
      });
      props.imagesSetter([...props.images, { name: data, atrribute: imgDesc }]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnCropComplete = (crop, pixelCrop) => {
    const canvasRef = imgPreviewCanvas.current;

    image64toCanvasRef(canvasRef, imgSrc, pixelCrop, [imgH, imgW]);
  };
  const handleUploadButton = (e) => {
    e.preventDefault();
    if (imgSrc) {
      const canvasRef = imgPreviewCanvas.current;
      const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
      const imageData64 = canvasRef.toDataURL("image/" + fileExtension);

      const filename = "image" + Date.now() + "." + fileExtension;
      const myCroppedFile = base64StringtoFile(imageData64, filename);
      uploadHandler(myCroppedFile);
      clearToDefault();
    }
  };
  const clearToDefault = (e) => {
    if (e) e.preventDefault();
    const canvas = imgPreviewCanvas.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setImgSrc(null);
    fileInputRef.current.value = null;
  };
  useEffect(() => {
    //Loading source image resolution
    if (imgSrc) {
      var img = document.createElement("img");
      img.setAttribute("src", imgSrc);
      setTimeout(function () {
        setImgW(img.width);
        setImgH(img.height);
      }, 0);
    }
  }, [imgSrc]);
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("crop")}</h1>

      <input
        ref={fileInputRef}
        type="file"
        multiple={false}
        onChange={handleFileSelect}
      />
      {imgSrc && (
        <div>
          <div className="div-1">
            <div className="div-2"></div>
          </div>
          <ReactCrop
            src={imgSrc}
            crop={crop}
            onImageLoaded={handleImageLoaded}
            onComplete={handleOnCropComplete}
            onChange={(c) => setCrop(c)}
            className="main-img"
          />

          <div>
            <canvas className="width-15" ref={imgPreviewCanvas}></canvas>
            <div></div>
            <label htmlFor="description">{t("color_of_image")}</label>
            {props.colors.map((item) => (
              <div key={item.name}>
                <div>
                  <input
                    type="radio"
                    id={item.name}
                    value={item.name}
                    checked={imgDesc === item.name}
                    name="colors"
                    onChange={(e) => setImgDesc(e.target.value)}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </div>
              </div>
            ))}

            <button onClick={handleUploadButton}>{t("set_image")}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Images;
