import React from 'react';
import { Link } from 'react-router-dom';
import { getCartItems, clearCartItems } from '../utils/localStorage';
import { CartItem } from '../types';

const ShoppingCart: React.FC = () => {
	const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

	React.useEffect(() => {
		setCartItems(getCartItems());
	}, []);

	const handleClearCart = () => {
		clearCartItems();
		setCartItems([]);
	};

	const handleRemoveItem = (id: string | undefined) => {
		const updatedCartItems = cartItems.filter((item) => item.imdbID !== id);
		setCartItems(updatedCartItems);
		clearCartItems();
		setCartItems(updatedCartItems);
	};

	// const totalPrice = cartItems.reduce(
	// 	(acc, item) => acc + parseFloat(item.Price),
	// 	0
	// );

	return (
		<div>
			<h1>Shopping Cart</h1>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<table>
						<thead>
							<tr>
								<th>Title</th>
								<th>Price</th>
								<th>Remove</th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((item) => (
								<tr key={item.imdbID}>
									<td>{item.Title}</td>
									<td>{item.Price}</td>
									<td>{item.quantity}</td>
									<td>
										<button onClick={() => handleRemoveItem(item.imdbID)}>
											Remove
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{/* <p>Total price: ${totalPrice.toFixed(2)}</p> */}
					<button onClick={handleClearCart}>Clear cart</button>
					<Link to='/checkout'>
						<button>Proceed to checkout</button>
					</Link>
				</>
			)}
		</div>
	);
};

export default ShoppingCart;
