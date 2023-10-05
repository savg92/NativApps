// Define the types for a movie object
interface Movie {
  Title?: string;
  Year?: string;
  imdbID?: string;
  Type?: string;
  Poster?: string;
  Price?: number | string | undefined
}

// Define the types for a movie search result object
interface MovieSearchResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

// Define the types for a shopping cart item object extending the movie object
interface CartItem extends Movie {
  quantity: number;
  rentalDate?: Date;
}

// Define the types for the shopping cart context
interface ShoppingCartContextType {
  cartItems: CartItem[];
  addToCart: (movie: Movie, quantity: number, rentalDate?: Date) => void;
  removeFromCart: (imdbID: string) => void;
  clearCart: () => void;
}

// Define the types for the context provider props
interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

// Define the types for the search bar component props
interface SearchBarProps {
  onSearch: (query: string) => void;
}

// Define the types for the movie list component props
interface MovieListProps {
  movies: Movie[];
  onAddToCart: (movie: Movie) => void;
}

// Define the types for the movie card component props
interface MovieCardProps {
  movie: Movie;
  onAddToCart: (movie: Movie) => void;
}

// Define the types for the movie details component props
interface MovieDetailsProps {
  movie: Movie;
}

// Define the types for the shopping cart component props
interface ShoppingCartProps {
  cartItems: CartItem[];
  onRemoveFromCart: (imdbID: string) => void;
  onClearCart: () => void;
}

// Define the types for the shopping cart item component props
interface CartItemProps {
  item: CartItem;
  onRemoveFromCart: (imdbID: string) => void;
}

// Define the types for the checkout form component props
interface CheckoutFormProps {
  cartItems: CartItem[];
  onClearCart: () => void;
}

enum MediaType {
	Movie = 'movie',
	Series = 'series',
	Episode = 'episode',
}

export type {
	Movie,
	MovieSearchResult,
	CartItem,
	ShoppingCartContextType,
	ShoppingCartProviderProps,
	SearchBarProps,
	MovieListProps,
	MovieCardProps,
	MovieDetailsProps,
	ShoppingCartProps,
	CartItemProps,
	CheckoutFormProps,
	MediaType,
};