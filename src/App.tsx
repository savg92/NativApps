// import { useState } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
// import { searchMovies, getMovies } from './services/services';
// import { getCartItems, setCartItems } from './utils/localStorage';
// import { Movie } from '../types'
import Home from './pages/Home';
// import MovieList from './pages/MovieList';
import ShoppingCartPage from './pages/ShoppingCart';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage.tsx';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

function App() {
  // const [searchQuery, setSearchQuery] = useState<string>('');
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [error, setError] = useState('');
  // const [cartItems, setCartItemsState] = useState<Movie[]>(getCartItems());

  // // const handleSearch = async (query: string) => {
  // //   setSearchQuery(query);
  // //   const results = await searchMovies(query);
  // //   setMovies(results);
  // // };

  // const handleSearch = async () => {
	// 	try {
	// 		// const result = await searchMovies(searchQuery);
	// 		const result = await getMovies(searchQuery);
	// 		setMovies(result.Search);
	// 		setError('');
	// 	} catch (error) {
	// 		setMovies([]);
	// 		setError('Error al obtener listado. Intente nuevamente');
	// 	}
	// };

  // const handleAddToCart = (movie: Movie) => {
  //   const existingItem = cartItems.find((item) => item.imdbID === movie.imdbID);
  //   if (existingItem) {
  //     existingItem.quantity += 1;
  //     setCartItemsState([...cartItems]);
  //   } else {
  //     setCartItemsState([...cartItems, { ...movie, quantity: 1 }]);
  //   }
  //   setCartItems([...cartItems, { ...movie, quantity: 1 }]);
  // };

  // const handleRemoveFromCart = (movie: Movie) => {
  //   const existingItem = cartItems.find((item) => item.imdbID === movie.imdbID);
  //   if (existingItem) {
  //     if (existingItem.quantity === 1) {
  //       setCartItemsState(cartItems.filter((item) => item.imdbID !== movie.imdbID));
  //     } else {
  //       existingItem.quantity -= 1;
  //       setCartItemsState([...cartItems]);
  //     }
  //     setCartItems(cartItems.filter((item) => item.imdbID !== movie.imdbID));
  //   }
  // };

  // const handleClearCart = () => {
  //   setCartItemsState([]);
  //   setCartItems([]);
  // };

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: <ShoppingCartPage
      // cartItems={cartItems}
      // onRemoveFromCart={handleRemoveFromCart}
      // onClearCart={handleClearCart}
    />,
  }
]);

  return (
    <AppContainer>
      <RouterProvider router={router} />
    </AppContainer>
  );
}

export default App;