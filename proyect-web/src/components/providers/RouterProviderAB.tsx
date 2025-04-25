import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RouterError from '../../pages/RouterError';
import { HomePage } from '../../pages/home/HomePage';

const RouterProviderAB = () => {

	//Root system
	const router = createBrowserRouter([
		{
			id: 'errorPage',
			element: <RouterError />,
			errorElement: <RouterError />
		},
		{
			path: '/',
			element: <HomePage />,
			errorElement: <RouterError />
		}
	]);

	return (
		<RouterProvider router={router} />
	)
}

export default RouterProviderAB;
