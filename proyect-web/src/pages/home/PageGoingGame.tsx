import { alpha, Box, Button, Grid, TextField } from "@mui/material";
import { PageTitle1 } from "../../components/atoms/PageTitle1";
import { useState } from "react";
import { postGoingPlayerToParty } from "../../services/party/party-service";
import { useDispatch, useSelector } from "react-redux";
import { IAppStore } from "../../redux/store.type";
import { updateAuthData } from "../../redux/api/auth/authSlice";




export const PageGoingGame = () => {

    const dispatch = useDispatch();

    const partyToJoin = useSelector((state: IAppStore)=> state.party.partyToJoin)

    const [alias, setAlias] = useState<string>('');

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAlias(e.target.value);
    };

    /**
     * Find game by simpleId
     */
    const handleClickFindGameButton = () => {
        if (partyToJoin) {
            postGoingPlayerToParty({
                partyId: partyToJoin,
                name: alias
            })
                .then((res) => {
                    dispatch(updateAuthData(res.data));
                    //navigator(`/game/${res.data._id}`);
                })
                .catch((err) => {
                    console.log(err);
                    alert('No se ha encontrado la partida');
                });
        }
    }

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
                <Grid container spacing={3} direction={"column"}>
                    {/* Search game */}
                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <TextField
                            name="name"
                            value={alias}
                            onChange={handleChangeInput}
                            inputProps={{ style: { fontSize: 40, fontWeight: 'bold', color: 'white', textAlign: 'center' } }} // font size of input text
                            sx={{
                                width: '340px',
                                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.2),
                                borderRadius: 2,
                            }} />
                    </Grid>
                    {/* Create game */}
                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Button
                            onClick={handleClickFindGameButton}
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
                            {'Seleccionar nombre'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
};

