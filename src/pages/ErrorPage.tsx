// import React from 'react'
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
		<div id='error-page'>
			<h1>Oops!</h1>
			<p>Error al obtener listado. Intente nuevamente</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
      <button onClick={() => window.history.back()}>Aceptar</button>
		</div>
	);
}

export default ErrorPage