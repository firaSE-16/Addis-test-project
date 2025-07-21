import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { theme } from "../styles/theme";
import { fetchAlbumByIdRequest } from "../store/slices/albumSlice";
import {
  addSongToAlbumRequest,
  deleteSongRequest,
  updateSongRequest,
} from "../store/slices/songSlice";
import Song from "../components/song";
import editingIcon from "../assets/editing.png";
import deleteIcon from "../assets/delete.png";
import songIcon from "../assets/song.png";
import musicUploader from "../assets/musicuploader.png";
import playIcon from "../assets/play.png";
import pauseIcon from "../assets/pause.png";


const PageWrapper = styled.div`
  max-width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundDark};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 0;
  font-family: ${theme.fonts.body};
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const AlbumHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem 0;
  position: relative;
`;

const Cover = styled.div`
  width: 232px;
  height: 232px;
  min-width: 232px;
  min-height: 232px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 30px rgba(0,0,0,0.5);
  background: ${({ theme }) => theme.dark.card};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AlbumInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const AlbumType = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const AlbumTitle = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  margin: 0.5rem 0;
  line-height: 1;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.textLight};
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const AlbumMeta = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0.5rem 0;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AlbumActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const PlayButton = styled.button`
  background: ${theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 500px;
  padding: 0.75rem 3rem;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;

  &:hover {
    transform: scale(1.05);
    background: ${theme.colors.secondary};
  }
`;

const ActionButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textLight};
  border: none;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const SongListHeader = styled.div`
  display: grid;
  grid-template-columns: [index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(120px,1fr);
  padding: 0 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.dark.border};
  color: ${({ theme }) => theme.dark.textSecondary};
  font-size: 0.875rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
`;

const SongList = styled.div`
  margin-top: 1rem;
`;

const SongRow = styled.div`
  display: grid;
  grid-template-columns: [index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(120px,1fr);
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: ${({ theme }) => theme.dark.textSecondary};
  font-size: 1rem;
  font-weight: 400;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.dark.border};
  }
`;

const SongIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.dark.textSecondary};
  position: relative;
`;

const PlayPauseButton = styled.button`
  background:rgba(255, 255, 255, 0.62);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  transition: all 0.2s ease;
  opacity: 1;
  ${SongRow}:hover & {
    opacity: 1;
    background: rgba(255,255,255,0.25);
  }
  &:hover {
    background: rgba(255,255,255,0.32);
  }
`;

const PlayPauseIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const SongTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const SongCover = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

const SongName = styled.div`
  font-weight: 400;
`;

const SongDuration = styled.div`
  color: ${({ theme }) => theme.dark.textSecondary};
`;

const SongActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: rgba(255,255,255,0.1);
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  opacity: 1;
  background: rgba(255,255,255,0.1);
  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const IconImg = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: ${({ theme }) => theme.mode === 'dark' ? 'invert(1)' : 'invert(0)'};
`;

const AddSongForm = styled.form`
  display: grid;
  grid-template-columns: 6fr 4fr 3fr minmax(120px,1fr);
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.dark.card};
  border-radius: 4px;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.dark.border};
  font-size: 1rem;
  background: ${({ theme }) => theme.dark.input};
  color: ${({ theme }) => theme.colors.textLight};
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

const AddButton = styled.button`
  background: ${theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${theme.colors.secondary};
  }
`;

const AudioUploader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px dashed ${theme.colors.primary};
  background: ${({ theme }) => theme.dark.input};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.secondary};
    background: rgba(155, 81, 224, 0.1);
  }
`;

const AudioUploaderLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.primary};
  font-size: 0.875rem;
`;

const AudioUploaderIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: ${({ theme }) => theme.mode === 'dark' ? 'invert(1)' : 'invert(0)'};
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(0,0,0,0.7);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0,0,0,0.9);
    transform: scale(1.05);
  }
`;


function getAudioUrl(song) {
  if (!song.audioUrl) return '';
  if (/^https?:\/\//.test(song.audioUrl)) return song.audioUrl;
  return `${process.env.API_BASE_URL}${song.audioUrl.startsWith('/') ? '' : '/'}${song.audioUrl}`;
}

const AlbumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAlbum, loading: albumLoading, error: albumError } = useSelector((state) => state.albums);
  const { loading: songLoading, error: songError } = useSelector((state) => state.songs);
  const prevSongLoading = useRef(songLoading);
  
  const [songs, setSongs] = useState([]);
  const [songForm, setSongForm] = useState({ title: "", duration: "", audioFile: null });
  const [showAddSong, setShowAddSong] = useState(false);
  const [editingSongId, setEditingSongId] = useState(null);
  const [editSongForm, setEditSongForm] = useState({ title: '', duration: '' });
  const [audioPreview, setAudioPreview] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioInputRef = useRef();
  const audioRef = useRef(null);
  const [pendingPlaySongId, setPendingPlaySongId] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbumByIdRequest(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentAlbum && currentAlbum.songs) {
      setSongs(currentAlbum.songs);
    } else {
      setSongs([]);
    }
  }, [currentAlbum]);

  const refreshAlbum = () => {
    if (id) {
      dispatch(fetchAlbumByIdRequest(id));
    }
  };

  useEffect(() => {
    if (prevSongLoading.current && !songLoading && !songError) {
      refreshAlbum();
    }
    prevSongLoading.current = songLoading;
  }, [songLoading, songError]);

  const handleAudioUploaderClick = () => {
    audioInputRef.current.click();
  };

  const handleSongChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "audioFile") {
      setSongForm((prev) => ({ ...prev, audioFile: files[0] }));
      setAudioPreview(files[0] ? files[0].name : null);
    } else {
      setSongForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSong = (e) => {
    e.preventDefault();
    if (!songForm.title || !songForm.duration || !songForm.audioFile) return;
    dispatch(addSongToAlbumRequest({ albumId: id, ...songForm }));
    setSongForm({ title: "", duration: "", audioFile: null });
    setShowAddSong(false);
  };

  const handleDeleteSong = (songId) => {
    dispatch(deleteSongRequest(songId));
  };

  const handleEditAlbum = () => {
    navigate(`/edit/album/${id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditSong = (song) => {
    setEditingSongId(song._id);
    setEditSongForm({ title: song.title, duration: song.duration });
  };

  const handleEditSongChange = (e) => {
    const { name, value } = e.target;
    setEditSongForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSongSave = (songId) => {
    dispatch(updateSongRequest({ id: songId, ...editSongForm }));
    setEditingSongId(null);
  };

  const handleEditSongCancel = () => {
    setEditingSongId(null);
  };

  const handlePlayPause = (song) => {
    if (currentlyPlaying === song._id && isPlaying) {
      audioRef.current && audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentlyPlaying !== song._id) {
        setCurrentlyPlaying(song._id);
        setIsPlaying(true);
        setPendingPlaySongId(song._id); 
      } else {
        setIsPlaying(true);
        if (audioRef.current) {
          if (audioRef.current.readyState >= 2) {
            audioRef.current.play().catch(() => {});
          } else {
            setPendingPlaySongId(song._id);
          }
        }
      }
    }
  };

  
  useEffect(() => {
    if (currentlyPlaying && audioRef.current) {
      const song = (currentAlbum.songs || songs).find(s => s._id === currentlyPlaying);
      if (song && song.audioUrl) {
        audioRef.current.src = getAudioUrl(song);
        audioRef.current.load();
      }
    }
  }, [currentlyPlaying, currentAlbum, songs]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const tryPlay = () => {
      if (pendingPlaySongId && currentlyPlaying === pendingPlaySongId && isPlaying) {
        audio.play().catch(() => {});
        setPendingPlaySongId(null);
      }
    };
    audio.addEventListener('canplay', tryPlay);
    return () => {
      audio.removeEventListener('canplay', tryPlay);
    };
  }, [pendingPlaySongId, currentlyPlaying, isPlaying]);

  useEffect(() => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const formatDuration = (duration) => {
    if (typeof duration === 'number') {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return duration;
  };

  if (albumLoading || !currentAlbum) return <PageWrapper>Loading album...</PageWrapper>;
  if (albumError) return <PageWrapper><div>{albumError}</div></PageWrapper>;

  const album = currentAlbum.album || currentAlbum;
  const albumSongs = currentAlbum.songs || songs;

  return (
    <PageWrapper>
      <ContentWrapper>
        <BackButton onClick={handleBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
          </svg>
        </BackButton>

        <AlbumHeader>
          <Cover>
            <img src={album.coverImageUrl || album.coverImage || songIcon} alt="Album Cover" />
          </Cover>
          
          <AlbumInfo>
            <AlbumType>Album</AlbumType>
            <AlbumTitle>{album.title}</AlbumTitle>
            <AlbumMeta>
              <span>{album.artist}</span>
              <span>•</span>
              <span>{album.year}</span>
              <span>•</span>
              <span>{albumSongs.length} songs</span>
            </AlbumMeta>
            
            <AlbumActions>
              <PlayButton>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
                  <path d="M8 5v14l11-7z" fill="currentColor"/>
                </svg>
                Play
              </PlayButton>
              <ActionButton onClick={() => setShowAddSong(!showAddSong)}>
                {showAddSong ? 'Cancel' : 'Add Song'}
              </ActionButton>
              <ActionButton onClick={handleEditAlbum}>
                Edit Album
              </ActionButton>
            </AlbumActions>
          </AlbumInfo>
        </AlbumHeader>

        <SongListHeader>
          <div>#</div>
          <div>Title</div>
          <div>Artist</div>
          <div>Duration</div>
          <div></div>
        </SongListHeader>

        <SongList>
          {albumSongs && albumSongs.length > 0 ? (
            albumSongs.map((song, index) => (
              <SongRow key={song._id}>
                <SongIndex>
                  {editingSongId === song._id ? (
                    <span>#</span>
                  ) : currentlyPlaying === song._id ? (
                    <PlayPauseButton active onClick={() => handlePlayPause(song)}>
                      <PlayPauseIcon 
                        src={isPlaying ? pauseIcon : playIcon} 
                        alt={isPlaying ? "Pause" : "Play"} 
                      />
                    </PlayPauseButton>
                  ) : (
                    <>
                      <span style={{ opacity: 0 }}>{index + 1}</span>
                      <PlayPauseButton onClick={() => handlePlayPause(song)}>
                        <PlayPauseIcon src={playIcon} alt="Play" />
                      </PlayPauseButton>
                    </>
                  )}
                </SongIndex>
                
                <SongTitle>
                  <SongCover src={songIcon} alt="Song" />
                  {editingSongId === song._id ? (
                    <Input
                      type="text"
                      name="title"
                      value={editSongForm.title}
                      onChange={handleEditSongChange}
                    />
                  ) : (
                    <SongName>{song.title}</SongName>
                  )}
                </SongTitle>
                
                <div>{album.artist}</div>
                
                {editingSongId === song._id ? (
                  <Input
                    type="text"
                    name="duration"
                    value={editSongForm.duration}
                    onChange={handleEditSongChange}
                  />
                ) : (
                  <SongDuration>{formatDuration(song.duration)}</SongDuration>
                )}
                
                <SongActions>
                  {editingSongId === song._id ? (
                    <>
                      <IconButton onClick={() => handleEditSongSave(song._id)} title="Save">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                        </svg>
                      </IconButton>
                      <IconButton onClick={handleEditSongCancel} title="Cancel">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
                        </svg>
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEditSong(song)} title="Edit">
                        <IconImg src={editingIcon} alt="Edit" />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteSong(song._id)} title="Delete">
                        <IconImg src={deleteIcon} alt="Delete" />
                      </IconButton>
                    </>
                  )}
                </SongActions>
              </SongRow>
            ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem', 
              color: theme.dark.textSecondary,
              fontSize: '1.2rem'
            }}>
              No songs in this album yet.
            </div>
          )}
        </SongList>
        {/* Shared audio element for playback */}
        <audio ref={audioRef} onEnded={handleAudioEnded} style={{ display: 'none' }} />
        {showAddSong && (
          <AddSongForm onSubmit={handleAddSong}>
            <Input
              type="text"
              name="title"
              value={songForm.title}
              onChange={handleSongChange}
              placeholder="Song title"
              required
            />
            
            <Input
              type="text"
              name="duration"
              value={songForm.duration}
              onChange={handleSongChange}
              placeholder="Duration (e.g. 3:45)"
              required
            />
            
            <AudioUploader onClick={handleAudioUploaderClick}>
              <AudioUploaderLabel>
                <AudioUploaderIcon src={musicUploader} alt="Upload" />
                {audioPreview ? audioPreview : 'Upload Audio'}
              </AudioUploaderLabel>
              <Input
                type="file"
                name="audioFile"
                accept="audio/*"
                style={{ display: 'none' }}
                ref={audioInputRef}
                onChange={handleSongChange}
                required
              />
            </AudioUploader>
            
            <AddButton type="submit">Add</AddButton>
          </AddSongForm>
        )}
      </ContentWrapper>
    </PageWrapper>
  );
};

export default AlbumDetail;