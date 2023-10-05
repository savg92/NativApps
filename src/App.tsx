
import styled from 'styled-components';
import { Link, Outlet, useNavigate } from 'react-router-dom';


const AppContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  align-items: center;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

function App() {
  const navigate = useNavigate();

	const handleClick = () => {
		navigate('/');
	};

	return (
		<AppContainer>
			<Nav>
				<Logo onClick={handleClick}>Blockbuster</Logo>
				<LinksContainer>
					<Link to='/'>Home</Link>
					<Link to='/cart'>Cart</Link>
				</LinksContainer>
			</Nav>

			<Outlet />
		</AppContainer>
	);
}

export default App;
