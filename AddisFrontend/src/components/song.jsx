import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-dom";
import songIcon from "../assets/song.png";
import playIcon from "../assets/play.png";
import pauseIcon from "../assets/pause.png";

const Card = styled.div`
  background: ${theme.colors.dark};
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.13);
  padding: 1.5rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s, background 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 6px 24px rgba(0,0,0,0.22);
    background: ${theme.colors.primary};
  }
`;
const Cover = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: ${theme.colors.background};
`;
const Title = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.textLight};
  margin-bottom: 0.3rem;
  text-align: center;
`;
const Meta = styled.div`
  color: ${theme.colors.secondary};
  font-size: 1rem;
  text-align: center;
`;
const Subtitle = styled.div`
  color: ${theme.colors.textLight};
  font-size: 0.98rem;
  text-align: center;
  margin-top: 0.2rem;
`;
const PlayButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  margin-top: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  
  &:hover, &:focus {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    background: rgba(240, 240, 240, 1);
    transform: scale(0.95);
  }
`;

const Song = ({ song }) => {
  const navigate = useNavigate();
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const coverImage = song.album?.coverImageUrl || song.album?.coverImage || songIcon;
  const title = song.title;
  const duration = song.duration;
  const albumTitle = song.album?.title;
  const audioUrl = song.audioUrl; // This must come from your backend

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (!audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card>
      <Cover src={coverImage} alt={title} />
      <Title>{title}</Title>
      <Meta>Duration: {duration}</Meta>
      {albumTitle && <Subtitle>Album: {albumTitle}</Subtitle>}
      <PlayButton onClick={handlePlayPause} title={isPlaying ? "Pause" : "Play"}>
        <img src={isPlaying ? pauseIcon : playIcon} alt={isPlaying ? "Pause" : "Play"} width={32} />
      </PlayButton>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
        style={{ display: "none" }}
      />
    </Card>
  );
};

export default Song;