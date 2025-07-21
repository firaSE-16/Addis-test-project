import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Album from '../components/album';

describe('Album Component', () => {
  const album = {
    _id: '1',
    title: 'Test Album',
    artist: 'Test Artist',
    cover: 'test.jpg',
    songs: []
  };

  it('renders album title and artist', () => {
    render(
      <MemoryRouter>
        <Album album={album} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('Artist: Test Artist')).toBeInTheDocument();
  });
}); 