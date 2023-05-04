import axios from "axios";
import React from "react";
import FileItem from "./FileItem"

const FileList = ({ files, removeFile }) => {
  const deleteFileHandler = (_name) => {
    axios
      .delete(`http://43.204.145.99:8081/s3/delete?fileName=${_name}`)
      .then((res) => removeFile(_name))
      .catch((err) => console.error(err));
  };
  return (
    <ul className="file-list">
      {files &&
        files.map((f) => (
          <FileItem key={f.name} file={f} deleteFile={deleteFileHandler} />
        ))}
    </ul>
  );
};

export default FileList;
