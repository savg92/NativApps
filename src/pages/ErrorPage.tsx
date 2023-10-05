import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();

	if (typeof error === 'string') {
		console.error(error);
	} else if (error instanceof Error) {
		console.error(error.message);
	}

	return (
		<div id='error-page'>
			<h1>Oops!</h1>
			<p>Error al obtener listado. Intente nuevamente</p>
			<p>
				<i>{error ? error.toString() : ''}</i>
			</p>
			<button onClick={() => window.history.back()}>Aceptar</button>
		</div>
	);
};

export default ErrorPage;