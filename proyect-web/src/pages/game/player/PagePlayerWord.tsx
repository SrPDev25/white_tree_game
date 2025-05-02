import { Visibility, VisibilityOff } from "@mui/icons-material";
import { alpha, Box, Grid, IconButton, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IAppStore } from "../../../redux/store.type";


/**
 * Master view of the game recruitment page
 * @returns 
 */
export const PagePlayerWord = () => {
    const party = useSelector((state: IAppStore) => state.party.party);
    const player = useSelector((state: IAppStore) => state.auth.auth);

    const [isShowWord, setIsShowWord] = useState<boolean>(false);

    const handleShowWord = () => {
        setIsShowWord((prev) => !prev);
    }

    const word = useMemo(() => {
        if (!party?.wordInGame) {
            return '******';
        } else if (!isShowWord) {
            return party.wordInGame.replace(/./g, '*');
        } else {
            return party.wordInGame;
        }
    }, [party?.wordInGame, isShowWord]);

    const isInfiltrado = useMemo(() => {
        return Boolean(player?.playerInfo.infiltrator)
    },[]);

    return (
        <Box
            width={'100%'}
            height={'70%'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Grid container spacing={4} direction={'column'}>
                <Grid>
                    <Typography variant="h3" fontWeight={'bold'} color={'Yellow'}>
                        {'Fase de la palabra'}
                    </Typography>
                </Grid>
                <Grid>
                    <Typography variant="h4" fontWeight={'bold'} color={'white'}>
                        {isInfiltrado && isShowWord
                            ? 'Eres el infiltrado'
                            : 'Palabra de la partida'}
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.2),
                            borderRadius: '10px',
                            //Display
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '600px',
                            height: '100px',
                        }}>
                        <Grid container width={'100%'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {/* Word */}
                            <Grid size={{ xs: 10 }}>
                                <Typography variant="h2"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '60px',
                                        color: 'white',
                                    }}>
                                    {word}
                                </Typography>
                            </Grid>
                            {/* Show word */}
                            <Grid size={{ xs: 2 }}>
                                <IconButton
                                    onClick={handleShowWord}>
                                    {isShowWord
                                        ? <Visibility sx={{ fontSize: '50px', color: 'white' }} />
                                        : <VisibilityOff sx={{ fontSize: '50px', color: 'white' }} />}
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};