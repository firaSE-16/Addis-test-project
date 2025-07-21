import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAlbumRequest } from "../store/slices/albumSlice";
import styled from "@emotion/styled";
import { theme } from "../styles/theme";
import photoUploader from "../assets/photouploader.png";

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background: #181818;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const FormHeader = styled.h2`
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  color: #b3b3b3;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ColorInput = styled(Input)`
  height: 50px;
  padding: 0.3rem;
  cursor: pointer;
`;

const Uploader = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 0.03);
  border: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: ${theme.colors.primary};
    background: rgba(255, 255, 255, 0.05);
    
    .upload-text {
      color: #fff;
    }
  }
`;

const UploaderImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  opacity: 0.7;
  margin-bottom: 1rem;
  transition: opacity 0.3s ease;
  
  ${Uploader}:hover & {
    opacity: 1;
  }
`;

const UploadText = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  transition: color 0.3s ease;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const Button = styled.button`
  padding: 1rem;
  background: ${theme.colors.primary};
  color: #000;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover:not(:disabled) {
    background: ${theme.colors.secondary};
    transform: scale(1.02);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${theme.colors.primary};
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: transparent;
  color: #b3b3b3;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #fff;
  }
`;

const ErrorMsg = styled.div`
  color: ${theme.colors.danger};
  background: rgba(255, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
`;

const AddAlbum = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, albums } = useSelector((state) => state.albums);
  const [form, setForm] = useState({
    title: "",
    artist: "",
    year: "",
    genre: "",
    color: "#1db954",
    coverImage: null,
  });
  const [lastCreatedId, setLastCreatedId] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (albums.length > 0 && lastCreatedId) {
      navigate(`/album/${lastCreatedId}`);
    }
  }, [albums, lastCreatedId, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coverImage") {
      setForm((prev) => ({ ...prev, coverImage: files[0] }));
      setCoverPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUploaderClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAlbumRequest(form));
    setTimeout(() => {
      if (albums.length > 0) {
        setLastCreatedId(albums[0]._id);
      }
    }, 1000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <FormWrapper>
      <BackButton type="button" onClick={handleBack}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </BackButton>
      
      <FormHeader>Create New Album</FormHeader>
      
      <StyledForm onSubmit={handleSubmit}>
        <Uploader onClick={handleUploaderClick}>
          {coverPreview ? (
            <PreviewImg src={coverPreview} alt="Cover Preview" />
          ) : (
            <>
              <UploaderImg src={photoUploader} alt="Upload Album Cover" />
              <UploadText className="upload-text">Drag and drop or click to upload cover</UploadText>
            </>
          )}
          <Input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleChange}
          />
        </Uploader>
        
        <FormRow>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Album title"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="artist">Artist</Label>
            <Input
              type="text"
              id="artist"
              name="artist"
              value={form.artist}
              onChange={handleChange}
              required
              placeholder="Artist name"
            />
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <Label htmlFor="year">Year</Label>
            <Input
              type="number"
              id="year"
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Release year"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="genre">Genre</Label>
            <Input
              type="text"
              id="genre"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              placeholder="Genre"
            />
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <Label htmlFor="color">Theme Color</Label>
          <ColorInput
            type="color"
            id="color"
            name="color"
            value={form.color}
            onChange={handleChange}
          />
        </FormGroup>
        
        <Button type="submit" disabled={loading}>
          {loading ? "Creating Album..." : "Create Album"}
        </Button>
        
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </StyledForm>
    </FormWrapper>
  );
};

export default AddAlbum;