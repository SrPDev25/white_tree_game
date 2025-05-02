import { alpha, Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { IAppStore } from "../../../redux/store.type";
import { PlayerRolEnum } from "../../../services/api/api.enum";
import { useMemo, useState } from "react";
import { DialogEndGame } from "./components/organism/DialogEndGame";

/**
 * Master view of the game recruitment page
 * @returns 
 */
export const PageMasterWordPhase = () => {

    const gamePartyPlayers = useSelector((state: IAppStore) => state.party.party?.players);
    const party = useSelector((state: IAppStore) => state.party.party);

    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const infiltrado = useMemo(() => {
        return gamePartyPlayers?.find((player) => player.infiltrator);
    }, [gamePartyPlayers])

    const handleOpenDialog = () => setOpenDialog((prev) => !prev);

    return (
        <Box
            width={'100%'}
            height={'100%'}>
            <DialogEndGame
                open={openDialog}
                onClose={handleOpenDialog}/>
            {/* Game info */}
            <Grid container
                sx={{
                    height: '100%',
                }}>
                {/* PlayerList */}
                <Grid size={{ xs: 5/* , sm: 4, md: 3, lg: 2, xl: 1.5 */ }}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100%',
                            width: { xs: '90%', sm: '80%', md: '70%', lg: '60%', xl: '60%' },
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Typography variant="h4" color="white" width={'100%'} fontWeight={'bold'}>
                            {'Jugadores'}
                        </Typography>
                        <Box
                            sx={{
                                height: '70%',
                                width: '100%',
                                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.2),
                                border: '4px solid white',
                                padding: 2
                            }}>
                            {/* List */}
                            <Grid container spacing={1} direction={"column"}
                                sx={{
                                    marginTop: 2,
                                    marginLeft: 6
                                }}>
                                {gamePartyPlayers?.map((player, index) => (
                                    <Grid key={player._id || index}>
                                        <Typography variant="h5" color="white">
                                            {`- ${player.name}`}
                                            {player.rol === PlayerRolEnum.MASTER &&
                                                <span style={{ color: '#ff4441', marginLeft: '15px' }}>
                                                    {'(Master)'}
                                                </span>}
                                        </Typography>
                                    </Grid>))}
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                {/* Info */}
                <Grid size={{ xs: 5/* , sm: 4, md: 3, lg: 2, xl: 1.5 */ }}>
                    <Grid container sx={{ marginTop: '30px' }} spacing={4} direction={'column'}>
                        {/* Phase name */}
                        <Grid>
                            <Typography variant="h3" color="Yellow" fontWeight={'bold'}>
                                {'Fase de palabras'}
                            </Typography>
                        </Grid>
                        {/* Word */}
                        <Grid>
                            <Typography variant="h4" color="white" fontWeight={'bold'}>
                                {'Palabra clave:'}
                            </Typography>
                            <Typography variant="h5" color="white" fontWeight={'bold'}>
                                {party?.wordInGame ?? 'No hay palabra clave'}
                            </Typography>
                        </Grid>
                        {/* Infiltrator */}
                        <Grid>
                            <Typography variant="h4" color="white" fontWeight={'bold'}>
                                {'Infiltrado:'}
                            </Typography>
                            <Typography variant="h5" color="white" fontWeight={'bold'}>
                                {infiltrado?.name ?? 'No hay infiltrado'}
                            </Typography>
                        </Grid>
                        {/* Button */}
                        <Grid>
                            <Button
                                sx={{
                                    //Button
                                    border: '4px solid white',
                                    height: 100,
                                    width: 350,
                                    marginTop: 2,
                                    color: 'white',
                                    //Text
                                    fontSize: 30,
                                    ":hover": {
                                        border: '10px solid white'
                                    }
                                }}
                                size="large"
                                onClick={handleOpenDialog}>
                                {'Acabar partida'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Start game button */}
        </Box>
    );
};