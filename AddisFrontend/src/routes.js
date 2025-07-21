import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Edit from './pages/Edit';
import AlbumDetail from './pages/album-detail';
import AddAlbum from './pages/add-album';
import Home from './pages/Home';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<AddAlbum />} />
      <Route path="/album/:id" element={<AlbumDetail />} />
      <Route path="/edit/album/:id" element={<Edit />} />
    </Routes>
  </Router>
);

export default AppRoutes;
