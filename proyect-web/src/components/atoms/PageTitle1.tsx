import { Typography } from "@mui/material";
import { useNavigate } from "react-router";


/**
 * Page title component
 * @returns 
 */
export const PageTitle1 = ()=>{

    const navigator = useNavigate();

    /**
     * Classic function to navigate to the home page at click the title
     */    
    const handleClick = () => {
        navigator('/');
    }

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