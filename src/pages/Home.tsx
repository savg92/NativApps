import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMovies } from '../services/services';
import { Movie, CartItem } from '../types';
import { getCartItems, setCartItems } from '../utils/localStorage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
	gap: 0.5rem;
	margin: 0.5rem 0rem;
`;

const BuyRentContainer = styled.div`
	// width: 30%;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	margin: 0.5rem 0rem;
`;

const Home = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(false);
	const [cartItems, setCartItemsState] = useState<any>(getCartItems());

	useEffect(() => {
		setCartItems(cartItems);
	}, [cartItems]);

	const handleSearch = async () => {
		try {
			const result = await getMovies(searchQuery);
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

	const handleRemoveFromCart = (movie: Movie) => {
		const existingItem = cartItems.find(
			(item) => item.movieData.imdbID === movie.imdbID
		);
		if (existingItem) {
			existingItem.quantity > 1
				? (existingItem.quantity -= 1)
				: cartItems.filter((item: CartItem) => item.imdbID !== movie.imdbID);
			setCartItemsState([...cartItems]);
		} else {
			setCartItemsState([...cartItems, { ...movie, quantity: 1 }]);
		}
	};

	const handleAddToCart = (movieData: Movie, option: string) => {
		const existingItem = cartItems.find(
			(item) => item.movieData.imdbID === movieData.imdbID
		);
		if (existingItem) {
			if (existingItem.option !== option) {
				existingItem.option = option;
				setCartItemsState([...cartItems]);
			}
		} else {
			if (option === 'Rent') {
				const date = new Date();
				date.setDate(date.getDate() + 2);
				const returnDate = date.toLocaleDateString('es-Ar');
				setCartItemsState([
					...cartItems,
					{ movieData, quantity: 1, option, returnDate },
				]);
			} else {
				setCartItemsState([...cartItems, { movieData, quantity: 1, option }]);
			}
		}
	};

	const handleReturnDateChange = (movie: Movie, returnDate: Date) => {
		const existingItem = cartItems.find(
			(item) => item.movieData.imdbID === movie.imdbID && item.option === 'Rent'
		);
		const formattedDate = new Date(returnDate);
		formattedDate.setDate(formattedDate.getDate());
		if (existingItem) {
			existingItem.returnDate = formattedDate.toLocaleDateString('es-Ar');
			setCartItemsState([...cartItems]);
		}
	};

	const handleAddQuantityToCart = (movie: Movie) => {
		const existingItem = cartItems.find(
			(item) => item.movieData.imdbID === movie.imdbID
		);
		if (existingItem) {
			existingItem.quantity += 1;
			setCartItemsState([...cartItems]);
		} else {
			setCartItemsState([...cartItems, { ...movie, quantity: 1 }]);
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
					movies.map((movie: CartItem) => (
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

									<div>
										<BuyRentContainer>
											<button onClick={() => handleAddToCart(movie, 'Buy')}>
												Buy
											</button>
											<button onClick={() => handleAddToCart(movie, 'Rent')}>
												Rent
											</button>
										</BuyRentContainer>
										{cartItems.find(
											(item: CartItem) =>
												item.movieData.imdbID === movie.imdbID &&
												item.option === 'Rent'
										) ? (
											<div>
												<div>
													<DatePicker
														onChange={(date: Date) =>
															handleReturnDateChange(movie, date)
														}
														minDate={new Date()}
														dateFormat='dd/MM/yyyy'
														required
													/>
												</div>
												<ButtonsContainer>
													<button onClick={() => handleRemoveFromCart(movie)}>
														{' '}
														-{' '}
													</button>
													<p>
														{
															cartItems.find(
																(item: CartItem) =>
																	item.movieData.imdbID === movie.imdbID &&
																	item.option === 'Rent'
															)?.quantity
														}
													</p>
													<button
														onClick={() => handleAddQuantityToCart(movie)}
													>
														{' '}
														+{' '}
													</button>
												</ButtonsContainer>
											</div>
										) : (
											<span></span>
										)}
										{cartItems.find(
											(item: CartItem) =>
												item.movieData.imdbID === movie.imdbID &&
												item.option === 'Buy'
										) ? (
											<ButtonsContainer>
												<button onClick={() => handleRemoveFromCart(movie)}>
													{' '}
													-{' '}
												</button>
												<p>
													{
														cartItems.find(
															(item: CartItem) =>
																item.movieData.imdbID === movie.imdbID &&
																item.option === 'Buy'
														)?.quantity
													}
												</p>
												<button onClick={() => handleAddQuantityToCart(movie)}>
													{' '}
													+{' '}
												</button>
											</ButtonsContainer>
										) : (
											<span></span>
										)}
									</div>
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
