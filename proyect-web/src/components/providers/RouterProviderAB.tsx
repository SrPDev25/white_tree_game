import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RouterError from '../../pages/RouterError';
import { PageHome } from '../../pages/home/PageHome';
import { PageCreateGame } from '../../pages/home/PageCreateGame';
import { PageMasterRecruitment } from '../../pages/game/master/PageMasterRecruitment';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAuth } from '../../services/authorization/auth-service';
import { updateAuthData } from '../../redux/api/auth/authSlice';
import { getGameInfo } from '../../services/party/party-service';
import { updatePartyData } from '../../redux/api/party/partySlice';
import { PageFindGame } from '../../pages/home/PageFindGame';
import { PageGoingGame } from '../../pages/home/PageGoingGame';

/**
 * Router provider
 * @returns 
 */
const RouterProviderAB = () => {
	const dispatch = useDispatch();

	//-----------------Check user and game info every 5 seconds-----------------
	const checkGameInfo = async () => {
		getGameInfo()
			.then((response) => {
				if (response.data) {
					dispatch(updatePartyData(response.data));
				}
			})
			.catch();
	};

	const checkAuth = async () => {
		getAuth()
			.then((response) => {
				dispatch(updateAuthData(response.data));
				checkGameInfo();
			})
			.catch((error) => {
				if (error.response.status === 401) {
					localStorage.removeItem('token');
				}
			});
	};

	// Check user authorizations every 20 seconds
	useEffect(() => {
		console.log(localStorage.getItem('token'));
		checkAuth(); // Initial check
		const intervalId = setInterval(() => {
			checkAuth();
		}, 5000); // 5 segundos

		return () => clearInterval(intervalId);
	}, []);

	//-----------------Router-----------------

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
		},
		{
			path: '/find',
			element: <PageFindGame />,
			errorElement: <RouterError />
		},
		{
			path: '/game/going',
			element: <PageGoingGame />,
			errorElement: <RouterError />
		},
		{
			path: '/game',
			element: <PageMasterRecruitment />,
			errorElement: <RouterError />
		}
	]);

	return (
		<RouterProvider router={router} />
	)
}

export default RouterProviderAB;
