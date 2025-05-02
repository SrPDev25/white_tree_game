import { Box, Typography } from "@mui/material";


/**
 * Master view of the game recruitment page
 * @returns 
 */
export const PagePlayerRecruitment = () => {

    return (
        <Box
            width={'100%'}
            height={'100%'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Typography variant="h3" color="white">
                {'Esperando a que el master inicie la partida...'}
            </Typography>
        </Box>
    );
};