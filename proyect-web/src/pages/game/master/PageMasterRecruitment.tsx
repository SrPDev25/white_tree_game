import { alpha, Box, Button, Dialog, DialogContent, DialogProps, Grid, IconButton, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { IAppStore } from "../../../redux/store.type";
import { ContentCopy } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { IPostPlayStartProps } from "../../../services/play/play-type";
import { PlayerRolEnum } from "../../../services/api/api.enum";
import { IPlayer } from "../../../redux/api/party/party.type";
import { postStartGame } from "../../../services/play/play-service";


export const DialogStartGame = (props: DialogProps) => {

    const gamePartyPlayers = useSelector((state: IAppStore) => state.party.party?.players);
    const gamePartyGameConfig = useSelector((state: IAppStore) => state.party.party?.gameConfig);

    const [values, setValues] = useState<IPostPlayStartProps>({ word: '', infiltrator: '' });
    const [loading, setLoading] = useState<boolean>(false);

    const isAvailable = useMemo(() => {
        if (!gamePartyPlayers || !gamePartyGameConfig) {
            return false;
        }

        return values.word.trim().length !== 0 && values.infiltrator.length > 6
            && gamePartyPlayers?.length >= gamePartyGameConfig.minPlayers && gamePartyPlayers.length <= gamePartyGameConfig.maxPlayers;
    }, [values.word, values.infiltrator, gamePartyPlayers, gamePartyGameConfig]);

    const handleChangeWord = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, word: event.target.value });
    }

    const handleChangeInfiltrator = (event: SelectChangeEvent<IPlayer>) => {
        setValues({ ...values, infiltrator: event.target.value });
    }

    const handleStartGame = () => {
        if(!isAvailable) {
            return;
        }
        setLoading(true);
        postStartGame(values);
    }

    return (
        <Dialog
            {...props}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12/* , sm: 4, md: 3, lg: 2, xl: 1.5 */ }}>
                        <Typography variant="h4">
                            {'Palabra clave'}
                        </Typography>
                        <TextField
                            name="name"
                            value={values.word}
                            onChange={handleChangeWord}
                            inputProps={{ style: { fontSize: 30, fontWeight: 'bold', textAlign: 'center' } }} // font size of input text
                            sx={{
                                width: '440px',
                                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.2),
                                borderRadius: 2,
                            }} />
                    </Grid>
                    <Grid size={{ xs: 6/* , sm: 4, md: 3, lg: 2, xl: 1.5 */ }}>
                        <Typography variant="h6">
                            {'Jugador infiltrado'}
                        </Typography>
                        <Select
                            name="infiltrator"
                            value={values.infiltrator}
                            onChange={handleChangeInfiltrator}
                            sx={{ width: '100%' }}>
                            {gamePartyPlayers
                                ?.filter((player) => player.rol === PlayerRolEnum.PLAYER)
                                ?.map((player) => (
                                    <MenuItem value={player._id} key={player._id}>
                                        {player.name}
                                    </MenuItem>))}
                        </Select>
                    </Grid>
                    <Grid size={{ xs: 6/* , sm: 4, md: 3, lg: 2, xl: 1.5 */ }}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'end',
                        }}>
                        <Button
                            variant="contained"
                            sx={{
                                //Button
                                border: '4px solid white',
                                backgroundColor: 'white',
                                color: 'black',
                                //Text
                                fontSize: 20
                            }}
                            size="large"
                            //Function
                            onClick={handleStartGame}
                            disabled={!isAvailable || loading}>
                            {loading ? 'Cargando...' : 'Iniciar partida'}
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

/**
 * Master view of the game recruitment page
 * @returns 
 */
export const PageMasterRecruitment = () => {

    const gamePartyInfo = useSelector((state: IAppStore) => state.party.party);
    const gamePartyPlayers = useSelector((state: IAppStore) => state.party.party?.players);
    const simplePartyInfo = useSelector((state: IAppStore) => state.party.party?.simpleId);

    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const playerCountColor = useMemo(() => {
        if (!gamePartyPlayers || !gamePartyInfo?.gameConfig) {
            return 'red';
        } else if (gamePartyPlayers?.length <= gamePartyInfo?.gameConfig.maxPlayers && gamePartyPlayers.length >= gamePartyInfo?.gameConfig.minPlayers) {
            return 'green';
        } else {
            return 'orange';
        }
    }, [gamePartyInfo?.gameConfig, gamePartyPlayers]);

    const isAvailable = useMemo(() => {
        if (!gamePartyInfo?.gameConfig || !gamePartyPlayers) {
            return false;
        }
        return gamePartyPlayers?.length <= gamePartyInfo?.gameConfig.maxPlayers && gamePartyPlayers.length >= gamePartyInfo?.gameConfig.minPlayers;
    }, [gamePartyPlayers, gamePartyInfo?.gameConfig])

    const handleOpenDialog = () => {
        setOpenDialog((prev) => !prev);
    }


    return (
        <Box
            width={'100%'}
            height={'100%'}>
            <DialogStartGame
                open={openDialog}
                onClose={handleOpenDialog} />
            {/* Game info */}
            <Grid container
                sx={{
                    height: '100%',
                }}>
                {/* Game code */}
                <Grid
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size={{ xs: 7/* , sm: 4, md: 3, lg: 2, xl: 1.5 */ }}>
                    <Typography variant="h3" color="white">
                        {'Código de la partida'}
                    </Typography>
                    <Box
                        sx={{
                            height: '160px',
                            width: '450px',
                            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.2),
                            borderRadius: 2,
                            borderColor: 'white',
                            display: 'flex',
                            paddingLeft: 2,
                            alignItems: 'center',
                        }}>
                        <Typography fontSize={'80px'} width={'80%'} color="white">
                            {simplePartyInfo}
                        </Typography>
                        <IconButton>
                            <ContentCopy sx={{ fontSize: '50px', color: 'white' }} />
                        </IconButton>
                    </Box>
                    <Button
                        sx={{
                            //Button
                            border: '4px solid white',
                            height: 100,
                            width: 350,
                            marginTop: 2,
                            //Text
                            fontSize: 30,
                            color: !isAvailable ? 'red' : 'white',
                            ":hover": {
                                border: '10px solid white'
                            }
                        }}
                        disabled={!isAvailable}
                        size="large"
                        //Function
                        onClick={handleOpenDialog}>
                        {'Iniciar partida'}
                    </Button>
                </Grid>
                {/* PlayerList */}
                <Grid size={{ xs: 5/* , sm: 4, md: 3, lg: 2, xl: 1.5 */ }}>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100%',
                            width: '100%',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Box
                            sx={{
                                height: '80%',
                                width: { xs: '90%', sm: '80%', md: '70%', lg: '60%', xl: '60%' },
                                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.2),
                                borderRadius: 2,
                                borderColor: 'white',
                                padding: 2
                            }}>
                            {/* Number */}
                            <Box>
                                <Typography variant="h4" color="white">
                                    {'Esperando jugadores: '}
                                    <span
                                        style={{ color: playerCountColor }}>
                                        {gamePartyInfo?.players.length + '/' + gamePartyInfo?.gameConfig.maxPlayers}
                                    </span>
                                </Typography>
                            </Box>
                            {/* List */}
                            <Grid container spacing={1} direction={"column"}
                                sx={{
                                    marginTop: 2,
                                    marginLeft: 6
                                }}>
                                {gamePartyPlayers?.map((player, index) => (
                                    <Grid key={player._id || index}>
                                        <Typography variant="h5" color="white">
                                            {player.name}
                                        </Typography>
                                    </Grid>))}
                            </Grid>
                        </Box>

                    </Box>
                </Grid>
            </Grid>

            {/* Start game button */}
        </Box>
    );
};