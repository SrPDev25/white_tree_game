import { alpha, Box, Grid, IconButton, Typography } from "@mui/material";
import { PageTitleGame } from "../../../components/atoms/PageTitleGame";
import { useSelector } from "react-redux";
import { IAppStore } from "../../../redux/store.type";
import { ContentCopy } from "@mui/icons-material";
import { useMemo } from "react";



/**
 * Master view of the game recruitment page
 * @returns 
 */
export const PageMasterRecruitment = () => {

    const gamePartyInfo = useSelector((state: IAppStore) => state.party.party);

    const gamePartyPlayers = useSelector((state: IAppStore) => state.party.party?.players);

    const simplePartyInfo = useSelector((state: IAppStore) => state.party.party?.simpleId);

    const playerCountColor = useMemo(() => {
        if (!gamePartyPlayers || !gamePartyInfo?.gameConfig) {
            return 'red';
        } else if (gamePartyPlayers?.length === gamePartyInfo?.gameConfig.maxPlayers) {
            return 'green';
        } else {
            return 'orange';
        }
    }, [gamePartyInfo?.gameConfig, gamePartyPlayers]);

    return (
        <Box
            width={'100%'}
            height={'100%'}>
            {/* Head */}
            <PageTitleGame />
            {/* Game info */}
            <Box
                sx={{
                    height: '70%',
                }}>
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
                                <ContentCopy sx={{ fontSize: '50px', color: 'white' }}/>
                            </IconButton>
                        </Box>
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
            </Box>
            {/* Start game button */}
        </Box>
    );
};