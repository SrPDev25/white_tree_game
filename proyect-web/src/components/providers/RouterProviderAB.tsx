import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RouterError from '../../pages/RouterError';
import { PageHome } from '../../pages/home/PageHome';

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
			element: <PageHome />,
			errorElement: <RouterError />
		}
	]);

	return (
		<RouterProvider router={router} />
	)
}

export default RouterProviderAB;
