import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RouterError from '../../pages/RouterError';
import { PageHome } from '../../pages/home/PageHome';
import { PageCreateGame } from '../../pages/home/PageCreateGame';
import { PageMasterRecruitment } from '../../pages/game/master/PageMasterRecruitment';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAuth } from '../../services/authorization/auth-service';
import { updateAuthData } from '../../redux/api/auth/authSlice';
import { getGameInfo } from '../../services/party/game-service';
import { updatePartyData } from '../../redux/api/party/partySlice';

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
			.catch((error) => console.log('Error fetching game info:', error));
	};

	const checkAuth = async () => {
		getAuth()
				.then((response) => {
					dispatch(updateAuthData(response.data));
					checkGameInfo();
				})
				.catch((error) => console.log('Error fetching auth data:', error));
	};

	// Check user authorizations every 20 seconds
	useEffect(() => {
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
