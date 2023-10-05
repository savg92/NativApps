import React from 'react';
import { Link } from 'react-router-dom';
import { getCartItems, clearCartItems } from '../utils/localStorage';
import { Movie } from '../types';

interface Props {
	onCheckout: () => void;
}

const ShoppingCart: React.FC<Props> = ({ onCheckout }) => {
	const [cartItems, setCartItems] = React.useState<Movie[]>([]);

	React.useEffect(() => {
		setCartItems(getCartItems());
	}, []);

	const handleRemoveItem = (id: string) => {
		const updatedCartItems = cartItems.filter((item) => item.imdbID !== id);
		setCartItems(updatedCartItems);
		clearCartItems();
		setCartItems(updatedCartItems);
		updatedCartItems.forEach((item) => {
			localStorage.setItem(item.imdbID, JSON.stringify(item));
		});
	};

	const totalPrice = cartItems.reduce(
		(acc, item) => acc + parseFloat(item.Price),
		0
	);

	return (
		<div>
			<h2>Shopping Cart</h2>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<div>
					{cartItems.map((item) => (
						<div key={item.imdbID}>
							<h3>{item.Title}</h3>
							<p>Price: {item.Price}</p>
							<button onClick={() => handleRemoveItem(item.imdbID)}>
								Remove
							</button>
						</div>
					))}
					<p>Total: {totalPrice.toFixed(2)}</p>
					<button onClick={onCheckout}>Checkout</button>
					<Link to='/'>Continue Shopping</Link>
				</div>
			)}
		</div>
	);
};

export default ShoppingCart;
