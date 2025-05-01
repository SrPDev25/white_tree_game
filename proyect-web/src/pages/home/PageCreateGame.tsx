import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { PageTitle1 } from "../../components/atoms/PageTitle1";
import { useEffect, useState } from "react";
import { ICreatePartyProps } from "../../services/game/game-type";
import { postCreateParty } from "../../services/game/game-service";
import { setTokensHeader } from "../../services/api";
import { useDispatch } from "react-redux";
import { updateAuthData } from "../../redux/api/auth/authSlice";
import { useNavigate } from "react-router";


const initialValues: ICreatePartyProps = {
    gameConfig: {
        minPlayers: 5,
        maxPlayers: 10
    },
    name: ''
}

/**
 * Create game page
 * @TODO form validation
 * @returns 
 */
export const PageCreateGame = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const [formValues, setFormValues] = useState<ICreatePartyProps>(initialValues);
    const [isError, setIsError] = useState<boolean>(false);

    /**
     * Change general form values
     * @param e 
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    /**
     * Change game config number values
     * @param e 
     * @returns 
     */
    const handleChangeNumberGameConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name)
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
            return;
        } else if (value >= 0) {
            setFormValues({
                ...formValues,
                gameConfig: {
                    ...formValues.gameConfig,
                    [e.target.name]: e.target.value
                },
            });
        }
    }

    /**
     * Submit form to create game
     * @returns 
     */
    const handleSubmit = async ()=>{
        if (formValues.name === '') {
            setIsError(true);
            return;
        } else if(formValues.gameConfig.minPlayers > formValues.gameConfig.maxPlayers){
            setIsError(true);
            return;
        } else if(formValues.gameConfig.minPlayers < 5 || formValues.gameConfig.maxPlayers > 10){
            setIsError(true);
            return;
        } else {
            postCreateParty(formValues)
                .then((res) => {
                    const token = res.data.user.token;
                    setTokensHeader(token);
                    dispatch(updateAuthData(res.data.user));
                    navigation('/game');
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        setFormValues(initialValues);
    }, []);

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
                    {/* Create form */}
                    {/* Nick */}
                    <Grid>
                        <Grid container spacing={1} direction={"column"} alignItems={'center'}>
                            <Grid>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        color: 'white',
                                        fontSize: 40,
                                        textAlign: 'center',
                                        marginBottom: 2,
                                    }}>
                                    {'Indica su alias'}
                                </Typography>
                            </Grid>
                            <Grid>
                                <TextField
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleChange}
                                    inputProps={{ style: { fontSize: 30, textAlign: 'center' } }} // font size of input text
                                    sx={{ backgroundColor: 'white' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Min players */}
                    <Grid
                        sx={{
                            display: 'flex',

                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Typography
                            variant="h3"
                            sx={{
                                display: 'flex',
                                width: '30%',
                                color: 'white',
                                fontSize: 25,
                                textAlign: 'center',
                                marginBottom: 2,
                            }}>
                            {'Minimo de jugadores'}
                        </Typography>
                        <TextField
                            name="minPlayers"
                            type="number"
                            value={formValues.gameConfig.minPlayers}
                            onChange={handleChangeNumberGameConfig}
                            inputProps={{ style: { fontSize: 20, textAlign: 'center' } }}
                            sx={{ backgroundColor: 'white', width: '30%' }} />
                    </Grid>
                    {/* Max players */}
                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Typography
                            variant="h3"
                            sx={{
                                display: 'flex',
                                width: '30%',
                                color: 'white',
                                fontSize: 25,
                                textAlign: 'center',
                                marginBottom: 2,
                            }}>
                            {'Maximo de jugadores'}
                        </Typography>
                        <TextField
                            name="maxPlayers"
                            type="number"
                            value={formValues.gameConfig.maxPlayers}
                            onChange={handleChangeNumberGameConfig}
                            inputProps={{ style: { fontSize: 20, textAlign: 'center' } }}
                            sx={{ backgroundColor: 'white', width: '30%' }} />
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
                                color: isError ? 'red' : 'white',
                                ":hover": {
                                    border: '10px solid white'
                                }    
                            }}
                            size="large"
                            //Function
                            onClick={handleSubmit}
                            >
                            {'Crear partida'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
};

