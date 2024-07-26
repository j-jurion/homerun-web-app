import { useState, useEffect } from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getConfig, postActivity, putActivity } from '../../assets/http.js'

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DurationInput from '../DurationInput.jsx';

function timeInputToSeconds(hours, minutes, seconds) {
    return parseInt(hours)*60*60 + parseInt(minutes)*60 + parseInt(seconds)
}

export default function EventForm({event, handleDiscard, submitEvent}) {
    const [isFetchingConfig, setIsFetchingConfig] = useState(false);
    const [config, setConfig] = useState(null);
    const [error, setError] = useState();

    const [activityType, setActivityType] = useState("running");

    const date = new Date();
    const defaultDate = date.toLocaleDateString('en-CA');

    
    useEffect(() => {
        async function fetchConfig() {
            setIsFetchingConfig(true);
            try {
                const config = await getConfig();
                setConfig(config);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch config.' });
            }

            setIsFetchingConfig(false);
        }

        fetchConfig();
    }, []);

    function handleActivityType(event) {
        setActivityType(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const acquisitionChannel = fd.getAll('acquisition');
        const data = dataToValidRequestJSON(acquisitionChannel)

        submitEvent(data);

        //TODO: Clear form
    }

    function dataToValidRequestJSON(data) {
        console.log(data)
        var json = {
            "type": data[0],
            "date": data[1],
            "name": data[2],
            "description": data[3],
            "distance": data[4],
            "goal": { "time": timeInputToSeconds(data[5], data[6], data[7]) },
            "race_type": data[8],
            "environment": data[9],
        };
        return json;
    }

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    function numericInputValidation(event) {
        if (!/^\d*\.?\d*$/.test(event.key) && event.key !== "Backspace" && event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Tab") {
            event.preventDefault();
        }
    }
    

    return (
    <>
        <h1>{event? "Edit" : "Add"} Event</h1>
        {!config && <p>Loading ...</p>}
        {config && 
            <form onSubmit={handleSubmit}>
                <fieldset>
                <Grid container spacing={2}>
                    <Grid xs={6} item={true}>
                        <FormControl fullWidth>
                            <Select
                                name="acquisition"
                                id="demo-simple-select"
                                value={activityType}
                                label="type"
                                onChange={handleActivityType}
                                variant='standard'
                                fullWidth
                                defaultValue={event?.activityType}
                            >
                                {config.activity_type.map((type) => (
                                    <MenuItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <FormControl fullWidth>
                            <Input type='date' fullWidth name="acquisition" defaultValue={event?.date || defaultDate}/>
                        </FormControl>
                    </Grid>
                    <Grid xs={4} item={true}>
                        <TextField 
                            fullWidth
                            required
                            label="Event Name"
                            variant="standard"
                            name="acquisition"
                            defaultValue={event?.name}
                        />
                    </Grid>
                    <Grid xs={6} item={true}>
                        <TextField 
                            label="Description" 
                            variant="standard" 
                            fullWidth 
                            name="acquisition"
                            defaultValue={event?.description}
                        />
                    </Grid>
                    <Grid xs={2} item={true}>
                        <TextField 
                            fullWidth
                            label={activityType === "swimming" ? "Distance (m)" : "Distance (km)"}
                            variant="standard"
                            onKeyDown={(event) => numericInputValidation(event)}
                            // type='number'
                            step='any'
                            name="acquisition"
                            defaultValue={event ? event.distance : "" }
                        />
                    </Grid>

                    <Grid xs={4} item={true}>
                        <Item>Goal</Item>
                    </Grid>
                    <Grid xs={4} item={true}>
                        <DurationInput required name="acquisition" defaultValue={event ? event.goal.time : ""}/>
                    </Grid>
                    <Grid xs={4} item={true}>
                    </Grid>

                    <Grid xs={3} item={true}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard">
                                Race Type
                            </InputLabel>
                                <Select
                                    defaultValue={config.race_type[0]}
                                    label="type"
                                    variant='standard'
                                    fullWidth
                                    name="acquisition"
                                >
                                    {config.race_type.map((type) => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                </Select>
                                
                        </FormControl>
                    </Grid>
                    <Grid xs={3} item={true}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard">
                                Environment
                            </InputLabel>
                            {activityType == "running" && 
                                <Select
                                    defaultValue={event? event.environment : config.terrain[0]}
                                    label="type"
                                    variant='standard'
                                    fullWidth
                                    name="acquisition"
                                >
                                    {config.terrain.map((type) => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                </Select>
                            }
                            {activityType == "swimming" && 
                                <Select
                                    defaultValue={event? event.environment : config.pool[0]}
                                    label="type"
                                    variant='standard'
                                    fullWidth
                                    name="acquisition"
                                >
                                    {config.pool.map((type) => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                </Select>
                            }
                        </FormControl>
                    </Grid>
                </Grid>
                </fieldset>

                {event ? 
                    <Button style={{margin: "2rem"}} onClick={handleDiscard}>
                        Discard
                    </Button>
                    : ""
                }
                
                <Button  style={{margin: "2rem"}} type="submit" variant="contained">
                    Save
                </Button>

            </form>
        }
    </>
    );
}