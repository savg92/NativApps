import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const PosterImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 8px;
`;

const MovieTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 4px;
`;

const MovieYear = styled.p`
  font-size: 14px;
  margin: 0;
  margin-bottom: 8px;
`;

const MovieType = styled.p`
  font-size: 14px;
  margin: 0;
`;

interface MovieCardProps {
  movie: {
    Title?: string;
    Year?: string;
    Type?: string;
    Poster?: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <CardContainer>
      <PosterImage src={movie.Poster} alt={movie.Title} />
      <MovieTitle>{movie.Title}</MovieTitle>
      <MovieYear>{movie.Year}</MovieYear>
      <MovieType>{movie.Type}</MovieType>
    </CardContainer>
  );
};

export default MovieCard;