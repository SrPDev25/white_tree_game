import { Box, Button, Grid } from "@mui/material";
import { PageTitle1 } from "../../components/atoms/PageTitle1";




export const HomePage = () => {



    return (
        <Box
            width={'100%'}
            height={'100%'}>
            <Box
                width={'100%'}>
                <PageTitle1 />
            </Box>
            <Box
                width={'100%'}
                height={'100%'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}>
                <Grid container spacing={1} direction={"column"}>
                    {/* Search game */}
                    <Grid>
                        <Button
                            sx={{
                                //Button
                                border: '4px solid white',
                                height: 120,
                                width: 450,
                                //Text
                                fontSize: 33,
                                color: 'white',

                                ":hover": {
                                    border: '10px solid white'
                                }
                            }}
                            size="large">
                            {'Buscar partida'}
                        </Button>
                    </Grid>
                    {/* Create game */}
                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                        <Button
                            sx={{
                                //Button
                                border: '4px solid white',
                                height: 120,
                                width: 350,
                                //Text
                                fontSize: 30,
                                color: 'white',

                                ":hover": {
                                    border: '10px solid white'
                                }
                            }}
                            size="large">
                            {'Crear partida'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
};

