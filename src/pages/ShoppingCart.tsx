import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getCartItems, clearCartItems } from '../utils/localStorage';
import { CartItem } from '../types';

const Td = styled.td`
	padding: 0.5rem;
	// border: 1px solid #ccc;
	display: table-cell;
	text-align: center;
`;

const Th = styled.th`
	padding: 0.5rem;
	// border: 1px solid #ccc;
	display: table-cell;
	text-align: center;
`;

const FinalContainer = styled.div`
	width: 30%;
	display: flex;
	justify-content: space-between;
`;

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
								<Th>Title</Th>
								<Th>Quantity</Th>
								<Th>Remove</Th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((item) => (
								<tr key={item.imdbID}>
									<Td>{item.Title}</Td>
									{/* <Td>{item.Price}</Td> */}
									<Td>{item.quantity}</Td>
									<Td>
										<button onClick={() => handleRemoveItem(item.imdbID)}>
											Remove
										</button>
									</Td>
								</tr>
							))}
						</tbody>
					</table>
					{/* <p>Total price: ${totalPrice.toFixed(2)}</p> */}
					<FinalContainer>
						<button onClick={handleClearCart}>Clear cart</button>
						<Link to='/checkout'>
							<button>Proceed to checkout</button>
						</Link>
					</FinalContainer>
				</>
			)}
		</div>
	);
};

export default ShoppingCart;
