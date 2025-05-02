import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getAuth } from "../../services/authorization/auth-service";


/**
 * Page title component
 * @returns 
 */
export const PageTitle1 = () => {

    const navigator = useNavigate();

    /**
     * Classic function to navigate to the home page at click the title
     */
    const handleClick = () => {
        navigator('/');
    }

    useEffect(() => {
        getAuth()
            .then((response) => {
                // Check if the user is logged in
                console.log('Auth response:', response.data);
                if (response.data) {
                    navigator('/game');
                } else {
                    localStorage.removeItem('token');
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    localStorage.removeItem('token');
                }
            });
    }, []);

    return (
        <Typography
            variant="h1"
            color="white"
            textAlign={'center'}

            sx={{
                ":hover": {
                    cursor: 'pointer'
                }
            }}
            onClick={handleClick}
        >
            {'Arbol blanco'}
        </Typography>
    )
};