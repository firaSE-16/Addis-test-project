import React from "react";
import styled from "@emotion/styled";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-dom";

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

/**
 * Album component for displaying either an album or a song (with album info)
 * @param {Object} props
 * @param {Object} props.album - Album object
 * @param {Object} [props.song] - Song object (optional)
 */
const Album = ({ album, song }) => {
  const navigate = useNavigate();
  // If song is provided, use its album for navigation and display
  const displayAlbum = song ? song.album : album;
  const coverImage = song
    ? song.album?.coverImageUrl || "https://placehold.co/120x120?text=No+Cover"
    : album?.coverImageUrl || "https://placehold.co/120x120?text=No+Cover";
  const title = song ? song.title : album?.title;
  const meta = song
    ? `Duration: ${song.duration}`
    : `Artist: ${album?.artist}`;
  const albumTitle = song && song.album ? song.album.title : undefined;

  const handleClick = () => {
    if (displayAlbum && displayAlbum._id) {
      navigate(`/album/${displayAlbum._id}`);
    }
  };

  return (
    <Card onClick={handleClick}>
      <Cover src={coverImage} alt={title} />
      <Title>{title}</Title>
      <Meta>{meta}</Meta>
      {song && albumTitle && (
        <Subtitle>Album: {albumTitle}</Subtitle>
      )}
      {!song && album?.genre && (
        <Subtitle>Genre: {album.genre}</Subtitle>
      )}
    </Card>
  );
};

export default Album;
