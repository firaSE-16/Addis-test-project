import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { theme } from "../styles/theme";
import { fetchAlbumsRequest } from "../store/slices/albumSlice";
import { fetchSongsRequest } from "../store/slices/songSlice";
import { useNavigate } from "react-router-dom";
import albumPlaceholder from "../assets/album.png";
import songIcon from "../assets/song.png";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(${theme.colors.backgroundDark} 30%, #121212);
  color: ${theme.colors.textLight};
  padding: 1rem 2rem 6rem 2rem;
  position: relative;
  overflow-x: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-top: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.7rem 1.5rem;
  border-radius: 20px;
  border: none;
  font-size: 1rem;
  width: 300px;
  background: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.textLight};
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 0 2px ${theme.colors.primary};
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.3rem;
  border-radius: 30px;
`;

const Tab = styled.button`
  background: ${({ active }) => (active ? 'rgba(255, 255, 255, 0.1)' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : 'rgba(255, 255, 255, 0.7)')};
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  margin: 2rem 0 1rem 0;
  font-weight: 700;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const AlbumCard = styled.div`
  background: #181818;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    background: #282828;
    
    .play-button {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AlbumCover = styled.div`
  position: relative;
  margin-bottom: 1rem;
  
  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  }
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  color: #000;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  
  &:hover {
    transform: translateY(0) scale(1.05);
    background: ${theme.colors.secondary};
  }
`;

const AlbumTitle = styled.h3`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AlbumArtist = styled.p`
  font-size: 0.875rem;
  color: #b3b3b3;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SongsList = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
`;

const SongItem = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr 60px;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    
    .song-play {
      opacity: 1;
    }
    
    .song-number {
      opacity: 0;
    }
  }
`;

const SongNumber = styled.span`
  color: #b3b3b3;
  font-size: 1rem;
  text-align: center;
  transition: opacity 0.2s ease;
`;

const SongPlay = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SongCover = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
`;

const SongDetails = styled.div``;

const SongTitle = styled.p`
  color: #fff;
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

const SongArtist = styled.p`
  color: #b3b3b3;
  font-size: 0.875rem;
`;

const SongAlbum = styled.p`
  color: #b3b3b3;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SongDuration = styled.p`
  color: #b3b3b3;
  font-size: 0.875rem;
  text-align: right;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageBtn = styled.button`
  background: ${({ active }) => (active ? theme.colors.primary : 'rgba(255, 255, 255, 0.1)')};
  color: ${({ active }) => (active ? '#000' : '#fff')};
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ErrorMsg = styled.div`
  color: ${theme.colors.danger};
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.1rem;
`;

const Fab = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  color: #000;
  border: none;
  box-shadow: 0 8px 24px rgba(155, 81, 224, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    background: ${theme.colors.secondary};
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("album");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const albumsState = useSelector((state) => state.albums);
  const songsState = useSelector((state) => state.songs);

  useEffect(() => {
    if (filter === "album") {
      dispatch(fetchAlbumsRequest({ page, limit: 8, query: search, filter: "album" }));
    } else {
      dispatch(fetchSongsRequest({ page, limit: 8, query: search, filter: "song" }));
    }
  }, [dispatch, filter, search, page]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const data = filter === "album" ? albumsState.albums : songsState.songs;
  const loading = filter === "album" ? albumsState.loading : songsState.loading;
  const error = filter === "album" ? albumsState.error : songsState.error;
  const pagination = filter === "album" ? albumsState.pagination : songsState.pagination;

  const handleFabClick = () => {
    navigate('/form');
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <PageWrapper>
      <Header>
        <SearchInput
          type="text"
          placeholder={`Search ${filter === "album" ? "albums" : "songs"}...`}
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <FilterTabs>
          <Tab active={filter === "album"} onClick={() => setFilter("album")}>Albums</Tab>
          <Tab active={filter === "song"} onClick={() => setFilter("song")}>Songs</Tab>
        </FilterTabs>
      </Header>

      {loading ? (
        <div style={{ textAlign: "center", margin: "2rem 0", fontSize: "1.3rem", color: "#fff" }}>Loading...</div>
      ) : error ? (
        <ErrorMsg>{error}</ErrorMsg>
      ) : (
        <>
          {filter === "album" ? (
            <>
              <SectionTitle>Albums</SectionTitle>
              <GridContainer>
                {data && data.length > 0 ? (
                  data.map((album) => (
                    <AlbumCard key={album._id} onClick={() => navigate(`/album/${album._id}`)}>
                      <AlbumCover>
                        <img 
                          src={album.coverImageUrl || album.coverImage || albumPlaceholder} 
                          alt={album.title} 
                        />
                        <PlayButton className="play-button">
                          <i className="fas fa-play"></i>
                        </PlayButton>
                      </AlbumCover>
                      <AlbumTitle>{album.title}</AlbumTitle>
                      <AlbumArtist>{album.artist}</AlbumArtist>
                    </AlbumCard>
                  ))
                ) : (
                  <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#b3b3b3" }}>
                    No albums found.
                  </div>
                )}
              </GridContainer>
            </>
          ) : (
            <>
              <SectionTitle>Songs</SectionTitle>
              <SongsList>
                {data && data.length > 0 ? (
                  data.map((song, index) => (
                    <SongItem key={song._id} onClick={() => song.album?._id && navigate(`/album/${song.album._id}`)} style={{ cursor: song.album?._id ? 'pointer' : 'default' }}>
                      <SongNumber className="song-number">{index + 1}</SongNumber>
                      <SongPlay className="song-play">
                        <i className="fas fa-play"></i>
                      </SongPlay>
                      <SongInfo>
                        <SongCover 
                          src={song.album?.coverImageUrl || song.album?.coverImage || albumPlaceholder} 
                          alt={song.title} 
                        />
                        <SongDetails>
                          <SongTitle>{song.title}</SongTitle>
                          <SongArtist>{song.artist}</SongArtist>
                        </SongDetails>
                      </SongInfo>
                      <SongAlbum>{song.album?.title || 'Single'}</SongAlbum>
                      <SongDuration>{formatDuration(song.duration)}</SongDuration>
                    </SongItem>
                  ))
                ) : (
                  <div style={{ textAlign: "center", color: "#b3b3b3" }}>
                    No songs found.
                  </div>
                )}
              </SongsList>
            </>
          )}

          <Pagination>
            {Array.from({ length: (pagination && pagination.totalPages) ? pagination.totalPages : 1 }, (_, idx) => (
              <PageBtn
                key={idx + 1}
                active={pagination && pagination.currentPage === idx + 1}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </PageBtn>
            ))}
          </Pagination>
        </>
      )}

      <Fab onClick={handleFabClick}>
        +
      </Fab>
    </PageWrapper>
  );
};

export default Home;