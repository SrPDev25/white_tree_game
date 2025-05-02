import { alpha, Button, Dialog, DialogContent, DialogProps, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { IPostPlayStartProps } from "../../../../../services/play/play-type";
import { IPlayer } from "../../../../../redux/api/party/party.type";
import { postStartGame } from "../../../../../services/play/play-service";
import { PlayerRolEnum } from "../../../../../services/api/api.enum";
import { IAppStore } from "../../../../../redux/store.type";





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