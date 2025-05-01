import { alpha, Box, Button, Grid, TextField } from "@mui/material";
import { PageTitle1 } from "../../components/atoms/PageTitle1";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getFindPartyBySimpleId } from "../../services/party/party-service";
import { useDispatch } from "react-redux";
import { updatePartyToJoinData } from "../../redux/api/party/partySlice";




export const PageFindGame = () => {

    const navigator = useNavigate();
    const dispatch = useDispatch();

    const [partySimpleId, setPartySimpleId] = useState<string>('');


    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPartySimpleId(e.target.value);
    };

    /**
     * Find game by simpleId
     */
    const handleClickFindGameButton = () => {
        if (partySimpleId.length == 7) {
            getFindPartyBySimpleId(partySimpleId)
                .then((res) => {
                    console.log(res.data);
                    dispatch(updatePartyToJoinData(res.data.partyId));
                    navigator(`/game/going`);
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
                            value={partySimpleId}
                            onChange={handleChangeInput}
                            type="number"
                            inputProps={{ style: { fontSize: 40, fontWeight: 'bold', color: 'white', textAlign: 'center' } }} // font size of input text
                            sx={{
                                width: '240px',
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
                            {'Encontrar partida'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
};

