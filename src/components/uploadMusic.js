import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/user.context';
import './uploadMusic.css';

const FileUpload = () => {
  const { user } = useContext(UserContext);
  let uuid = user.id;
  const [musicFiles, setMusicFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setMusicFiles(event.target.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setMusicFiles(event.dataTransfer.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    for (let i = 0; i < musicFiles.length; i++) {
      formData.append('musicFiles', musicFiles[i]);
    }
    formData.append('uuid', uuid);
    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    setIsLoading(false);
    window.location.reload(true);
  };

  return (
    <form
      className="music-upload-form"
      onSubmit={handleSubmit}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label htmlFor="music-upload-input" className="music-upload-label">
        Choose music files
      </label>
      <input
        id="music-upload-input"
        type="file"
        multiple
        onChange={handleFileChange}
        className="music-upload-input"
      />
      <div className="music-upload-dropzone">
        Or drag and drop music files here
      </div>
      {musicFiles.length > 0 && (
        <div className="music-upload-preview">
          <p>Uploaded {musicFiles.length} files:</p>
          <ul>
            {Array.from(musicFiles).map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <button type="submit" className="music-upload-button">
        Upload
      </button>
      {isLoading && <div className="loader"></div>}
    </form>
  );
};

export default FileUpload;
