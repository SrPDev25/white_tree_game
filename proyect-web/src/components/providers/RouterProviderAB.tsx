import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RouterError from '../../pages/RouterError';
import { PageHome } from '../../pages/home/PageHome';
import { PageCreateGame } from '../../pages/home/PageCreateGame';

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
		},
		{
			path: '/create',
			element: <PageCreateGame />,
			errorElement: <RouterError />
		}
	]);

	return (
		<RouterProvider router={router} />
	)
}

export default RouterProviderAB;
