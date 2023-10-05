import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getMovieById} from '../services/services';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types';

const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MovieList = () => {
  const { query } = useParams<{ query: string }>();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (query !== undefined) {
				const data = await getMovieById(query);
				setMovies(data);
			}
    };
    fetchMovies();
  }, [query]);

  return (
    <MovieListContainer>
      {movies.map((movie:Movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </MovieListContainer>
  );
};

export default MovieList;