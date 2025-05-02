import { Button, Dialog, DialogContent, DialogProps, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { postEndGame } from "../../../../../services/play/play-service";


export const DialogEndGame = (props: DialogProps) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handleEndGame = () => {
        setLoading(true);
        postEndGame();
    }

    const handleCloseDialog = () => {
        props.onClose?.({}, 'backdropClick');
    }

    return (
        <Dialog
            {...props}>
            <DialogContent>
                <Typography variant="h5">
                    {'¿Estas seguro que quieres terminar la partida?'}
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                        <Button
                            variant="contained"
                            sx={{
                                //Button
                                border: '4px solid #2f0964',
                                height: 80,
                                width: 250,
                                marginTop: 2,
                                color: '#2f0964',
                                backgroundColor: 'white',
                                //Text
                                fontSize: 20,
                                ":hover": {
                                    border: '10px solid #2f0964',
                                }
                            }}
                            size="large"
                            //Function
                            onClick={handleEndGame}>
                            {'Acabar partida'}
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Button
                            variant="contained"
                            sx={{
                                //Button
                                border: '4px solid #2f0964',
                                height: 80,
                                width: 250,
                                marginTop: 2,
                                color: '#2f0964',
                                backgroundColor: 'white',
                                //Text
                                fontSize: 20,
                                ":hover": {
                                    border: '10px solid #2f0964',
                                }
                            }}
                            size="large"
                            //Function
                            onClick={handleCloseDialog}>
                            {loading ? 'Cargando...' : 'Cancelar'}
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent >
        </Dialog >
    );
}