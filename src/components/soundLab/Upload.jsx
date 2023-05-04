import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Upload.scss";
// import './buttons.js'
import axios from "axios";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Upload = ({ files, setFiles, removeFile }) => {
  const [key, setKey] = useState("");
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    file.isUploading = true;
    setFiles([...files, file]);

    // upload file
    const formData = new FormData();
    formData.append("song", file, file.name);
    axios
      .post("http://43.204.145.99:8081/s3/upload", formData)
      .then((res) => {
        file.isUploading = false;
        setFiles([...files, file]);
        setKey(res.data.data.Key);
        console.log(res.data.data.Key);
      })
      .catch((err) => {
        // inform the user
        console.error(err);
        removeFile(file.name);
      });
  };
  // const genreClassificationLink = `http://43.204.145.99:8081/ml/genre?key=${key}`;

  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <input type="file" accept="audio/mpeg3" onChange={uploadHandler} />
          <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Upload
          </button>
        </div>
        <p className="main">Supported files</p>
        <p className="info">M4A, MP3, WAV, FLAC</p>
      </div>

      <Carousel
        className="file-card1"
        showThumbs={false}
        showStatus={false}
        useKeyboardArrows={true}
        showArrows={true}
        showIndicators={true}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const defStyle = {
            marginLeft: 20,
            color: "white",
            cursor: "pointer",
          };
          const style = isSelected
            ? { ...defStyle, color: " " }
            : { ...defStyle };
          return (
            <span
              style={style}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`${label} ${index + 1}`}
            >
              {"●"}
            </span>
          );
        }}
      >
        <div className="carousel">
          <a
            href={`http://43.204.145.99:8081/ml/genre?key=${key}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              style={{ cursor: "pointer", fontWeight: "bold", background: "" }}
            >
              Audio/ Genre Classification
            </button>
          </a>
        </div>
        <div className="carousel">
          <a
            href={`http://43.204.145.99:8081/ml/instrument?key=${key}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                background: "#FBEAFF",
              }}
            >
              Instrument Classification
            </button>
          </a>
        </div>
      </Carousel>
    </>
  );
};

export default Upload;
