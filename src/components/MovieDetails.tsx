import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Poster = styled.img`
  width: 200px;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const InfoItem = styled.span`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: center;
`;

interface Props {
  movie: {
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
    Plot: string;
    Director: string;
    Actors: string;
    Genre: string;
    Runtime: string;
    Rated: string;
    imdbRating: string;
  };
}

const MovieDetails: React.FC<Props> = ({ movie }) => {
  return (
    <Container>
      <Poster src={movie.Poster} alt={movie.Title} />
      <Title>{movie.Title}</Title>
      <Info>
        <InfoItem>{movie.Year}</InfoItem>
        <InfoItem>{movie.Type}</InfoItem>
        <InfoItem>{movie.Runtime}</InfoItem>
        <InfoItem>{movie.Rated}</InfoItem>
        <InfoItem>{movie.Genre}</InfoItem>
        <InfoItem>Directed by {movie.Director}</InfoItem>
        <InfoItem>Starring {movie.Actors}</InfoItem>
        <InfoItem>IMDb Rating: {movie.imdbRating}</InfoItem>
      </Info>
      <Description>{movie.Plot}</Description>
    </Container>
  );
};

export default MovieDetails;