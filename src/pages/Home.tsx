import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMovies, searchMovies } from '../services/services';
import { Movie, CartItem } from '../../types';
import { getCartItems, setCartItems } from '..//utils/localStorage';

const SearchBar = styled.input`
	padding: 0.5rem;
	font-size: 1rem;
	border: 1px solid #ccc;
	border-radius: 0.25rem;
	margin-bottom: 1rem;
`;

const MovieList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const MovieItem = styled.li`
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
`;

const MoviePoster = styled.img`
	width: 100px;
	height: 150px;
	object-fit: cover;
	margin-right: 1rem;
`;

const MovieTitle = styled.a`
	font-size: 1.5rem;
	margin: 0;
`;

const MovieYear = styled.span`
	font-size: 1rem;
	margin-right: 1rem;
`;

const MovieType = styled.span`
	font-size: 1rem;
	font-weight: bold;
`;

const ErrorMessage = styled.p`
	color: red;
`;

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const Home = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(false);
	const [cartItems, setCartItemsState] = useState<CartItem[]>(getCartItems());
	const navigate = useNavigate();

	const handleSearch = async () => {
		try {
			// const result = await searchMovies(searchQuery);
			const result = await getMovies(searchQuery);
			// setMovies(result.Search);
			// setError('');
			/* if result.Search exist setMovies(result.Search) else setMovies([]) and setError(true)
      If "Response": "False" then setError(true)
      */
			if (result.Response === 'False') {
				setError(true);
				setMovies([]);
			} else {
				setError(false);
				setMovies(result.Search);
			}
		} catch (error) {
			setMovies([]);
			setError(true);
		}
	};

	// const handleMovieClick = (imdbID: string) => {
	//   navigate(`/movies/${imdbID}`);
	// };

	// const handleAddToCart = (movie: Movie) => {
	//   const existingItem = cartItems.find((item) => item.imdbID === movie.imdbID);
	//   if (existingItem) {
	//     existingItem.quantity += 1;
	//     setCartItemsState([...cartItems]);
	//   } else {
	//     setCartItemsState([...cartItems, { ...movie, quantity: 1 , price: 1}]);
	//   }
	//   setCartItems([...cartItems, { ...movie, quantity: 1, price: 1 }]);
	// };

	const handleAddToCart = (movie: Movie) => {
		const existingItem = cartItems.find((item) => item.imdbID === movie.imdbID);
		if (existingItem) {
			existingItem.quantity += 1;
			setCartItemsState([...cartItems]);
		} else {
			setCartItemsState([...cartItems, { ...movie, quantity: 1 }]);
		}
		setCartItems([...cartItems]);
	};

	const handleRestoreCart = (movie: Movie) => {
		const existingItem = cartItems.find((item) => item.imdbID === movie.imdbID);
		if (existingItem) {
			existingItem.quantity -= 1;
			setCartItemsState([...cartItems]);
		} else {
			setCartItemsState([...cartItems, { ...movie, quantity: 1 }]);
		}
		setCartItems([...cartItems]);
	};

	const handleRemoveFromCart = (movie: Movie) => {
		const existingItem = cartItems.find((item) => item.imdbID === movie.imdbID);
		if (existingItem) {
			if (existingItem.quantity === 1) {
				setCartItemsState(
					cartItems.filter((item) => item.imdbID !== movie.imdbID)
				);
			} else {
				existingItem.quantity -= 1;
				setCartItemsState([...cartItems]);
			}
			setCartItems(cartItems.filter((item) => item.imdbID !== movie.imdbID));
		}
	};

	return (
		<div>
			<label htmlFor='search'>Buscar: </label>
			<SearchBar
				type='text'
				placeholder='Buscar películas'
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
			/>
			<button onClick={handleSearch}>Buscar</button>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<MovieList>

				{movies.length === 0 && error === false ? (
					<div>
						<p>Busque una película</p>
					</div>
				) : movies.length === 0 && error === true ? (
					<div>
						<p>Error al obtener listado. Intente nuevamente</p>
						<button
							onClick={() => {
								setError(false);
								setSearchQuery('');
							}}
						>
							Aceptar
						</button>
					</div>
				) : (
					movies.map((movie) => (
						<MovieItem key={movie.imdbID}>
							<MoviePoster
								src={movie.Poster}
								alt={movie.Title}
							/>
							<div>
								<MovieTitle>{movie.Title}</MovieTitle>
								<div>
									<MovieYear>{movie.Year}</MovieYear>
									<MovieType>{movie.Type}</MovieType>
									<ButtonsContainer>
                    <button onClick={() => handleRemoveFromCart(movie)}>Remove</button>
										<button onClick={() => handleRestoreCart(movie)}>
											{' '}
											-{' '}
										</button>
										<p>{movie.quantity}</p>
										<button onClick={() => handleAddToCart(movie)}> + </button>
									</ButtonsContainer>
								</div>
							</div>
						</MovieItem>
					))
				)}
			</MovieList>
		</div>
	);
};

export default Home;
