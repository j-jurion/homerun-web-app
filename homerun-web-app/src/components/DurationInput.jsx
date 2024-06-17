import { Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function DurationInput({name, defaultValue}) {
    const secondsInput = defaultValue ? secondsInputToTime(defaultValue) : secondsInputToTime(0);
    const [hours, setHours] = useState(secondsInput.hours);
    const [minutes, setMinutes] = useState(secondsInput.minutes);
    const [seconds, setSeconds] = useState(secondsInput.seconds);

    function numericInputValidation(event) {
        if (!/^\d*\.?\d*$/.test(event.key) && event.key !== "Backspace" && event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Tab") {
            event.preventDefault();
        }
    }

    function secondsInputToTime(secondsInput) {
        const hours = Math.floor(parseInt(secondsInput)/60/60);
        const minutes = Math.floor(parseInt(secondsInput-hours*60*60)/60);
        const seconds = parseInt(secondsInput-hours*60*60-minutes*60);

        return {
            hours,
            minutes,
            seconds
        }
    }

    return <Grid container spacing={2}>
                <Grid xs={4} item={true}>
                    <TextField 
                        name={name}
                        fullWidth
                        variant="standard"
                        label="h"
                        defaultValue={hours}
                        type='number'
                        onKeyDown={(event) => numericInputValidation(event)}
                    />
                </Grid>
                <Grid xs={4} item={true}>
                    <TextField 
                        name={name}
                        fullWidth
                        defaultValue={minutes}
                        label="m"
                        variant="standard"
                        type='number'
                        onKeyDown={(event) => numericInputValidation(event)}
                    />
                </Grid>
                <Grid xs={4} item={true}>
                    <TextField 
                        name={name}
                        fullWidth
                        defaultValue={seconds}
                        label="s"
                        variant="standard"
                        type='number'
                        onKeyDown={(event) => numericInputValidation(event)}
                    />
                </Grid>
            </Grid>
}