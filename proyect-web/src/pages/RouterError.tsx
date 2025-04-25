import { useRouteError } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { IRouterError } from "./errors.type";
import { SentimentDissatisfiedRounded, WarningAmberRounded } from "@mui/icons-material";

/**
 * Router error page
 */
const RouterError = () => {
	const error = useRouteError() as IRouterError;


	return (
		<Box id="error-page"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
			}}>
			<Box sx={{ maxWidth: '500px'}}> 
				<Typography variant="h4">
					<WarningAmberRounded color="error" fontSize="large"/> {`Error ${error.status}`} <SentimentDissatisfiedRounded color="error" fontSize="large"/>
				</Typography>
				<Typography variant="h6">
					{error.message}
				</Typography>
			</Box>
		</Box>
	);
}

export default RouterError;