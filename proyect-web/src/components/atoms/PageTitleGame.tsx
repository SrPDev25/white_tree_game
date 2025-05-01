import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { IAppStore } from "../../redux/store.type";
import { useEffect, useMemo } from "react";


/**
 * Page title component
 * @returns 
 */
export const PageTitleGame = ()=>{

    const user = useSelector((state: IAppStore) => state.auth.auth);

    /**
     * Text with the user name and rol
     */
    const userName: string = useMemo(() => {
        if (user && user.playerInfo.name && user.playerInfo.rol) {
            return `${user.playerInfo.name} (${user.playerInfo.rol})`;
        }
        return 'Comprobando autorización...';
    }, [user]);

    useEffect(() => {
        
    }, []);

    return (
        <Box
        sx={{
            display: 'flex',
            width: '100%',
            height: '15%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 3
        }}>
        {/* Title */}
        <Box
            sx={{
                width: '30%',
                display: 'flex',
                justifyContent: 'left',
                paddingLeft: 2
            }}>
            <Typography
                variant="h2"
                color="white"
                textAlign={'center'}>
                {'ARBOL BLANCO'}
            </Typography>
        </Box>
        {/* Player */}
        <Box
            sx={{
                width: '40%',
                display: 'flex',
                justifyContent: 'center'
            }}>
            <Typography
                variant="h3"
                color="white"
                textAlign={'center'}>
                {userName}
            </Typography>
        </Box>
        {/* Exit game */}
        <Box
            title="Salir del juego"
            sx={{
                width: '30%',
                display: 'flex',
                justifyContent: 'right',
                paddingRight: 6,
                paddingTop: 2
            }}>
            <Button>
                <img 
                    src="src/assets/Close_icon.ico" 
                    alt="Descripción del botón" 
                    width={'120px'}/>
            </Button>
        </Box>
    </Box>
    )
};