import { Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function DurationInput(props) {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    function numericInputValidation(event) {
        if (!/^\d*\.?\d*$/.test(event.key) && event.key !== "Backspace" && event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Tab") {
            event.preventDefault();
        }
    }

    return <Grid container spacing={2}>
                <Grid xs={4} item={true}>
                    <TextField 
                        {...props}
                        fullWidth
                        variant="standard"
                        label="h"
                        defaultValue={0}
                        type='number'
                        onKeyDown={(event) => numericInputValidation(event)}
                    />
                </Grid>
                <Grid xs={4} item={true}>
                    <TextField 
                        {...props}
                        fullWidth
                        defaultValue={0}
                        label="m"
                        variant="standard"
                        type='number'
                        onKeyDown={(event) => numericInputValidation(event)}
                    />
                </Grid>
                <Grid xs={4} item={true}>
                    <TextField 
                        {...props}
                        fullWidth
                        defaultValue={0}
                        label="s"
                        variant="standard"
                        type='number'
                        onKeyDown={(event) => numericInputValidation(event)}
                    />
                </Grid>
            </Grid>
}