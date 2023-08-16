import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/user.context';


const MusicPreview = () => {
  const { user } = useContext(UserContext);
  const [musicUrl, setMusicUrl] = useState(null);
  let uuid = user.id;
  const handlePreview = async () => {
    const response = await fetch(`/api/preview/${uuid}`);
    const blob = await response.blob();
    setMusicUrl(URL.createObjectURL(blob));
  };

  return (
    <div>
      <button onClick={handlePreview}>Preview</button>
      {musicUrl && <audio src={musicUrl} controls />}
    </div>
  );
};

export default MusicPreview;