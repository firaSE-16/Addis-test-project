import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Song from '../components/song';

describe('Song Component', () => {
  const song = {
    _id: '1',
    title: 'Test Song',
    artist: 'Test Artist',
    url: 'test.mp3',
    album: '1'
  };

  it('renders song title and artist', () => {
    render(
      <MemoryRouter>
        <Song song={song} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Duration:')).toBeInTheDocument();
  });
}); 