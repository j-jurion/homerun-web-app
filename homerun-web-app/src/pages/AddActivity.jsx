import { useState, useEffect } from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getConfig } from '../http.js'

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DurationInput from '../components/DurationInput.jsx';

export default function AddActivity() {
    const [isFetchingConfig, setIsFetchingConfig] = useState(false);
    const [config, setConfig] = useState(null);
    const [error, setError] = useState();

    const [activityType, setActivityType] = useState("running");
    const [activityEvent, setActivityEvent] = useState("training")

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

    function handleIsRace(event) {
        setActivityEvent(event.target.value);
    }

    function handleActivityType(event) {
        setActivityType(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const acquisitionChannel = fd.getAll('acquisition');
        console.log(acquisitionChannel)

        // const data = Object.fromEntries(fd.entries());
        const data = dataToValidRequestJSON(acquisitionChannel)

        console.log(data);
    }

    function timeInputToSeconds(hours, minutes, seconds) {
        return hours*60*60 + minutes*60 + seconds
    }

    function dataToValidRequestJSON(data) {
        var json = {
                "date": data[2],
                "description": data[4],
                "environment": data[15],
                "name": data[3],
                "type": data[0],
                "results": [
                  {
                    "distance": data[5],
                    "time": timeInputToSeconds(data[6], data[7], data[8]),
                    "tracking_type": "personal"
                  },
                ],
                "with_friends": data.length >= 17 ? true : false
        };

        if (data[1] === "training") {
            json.training_type = data[14];
        } else if (data[1] === "race") {
            json.race_type = data[14];
        }

        if (data[9]) {
            json.official = {
                "distance": data[9],
                "time": timeInputToSeconds(data[10], data[11], data[12]),
                "tracking_type": "official",
                "url": data[13]
              };
        }

        return json;

    }

    const Item = styled(Paper)(({ theme }) => ({
        //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        //...theme.typography.body2,
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
        <h1>Add Activity</h1>
        {!config && <p>Loading ...</p>}
        {config && 
            <form onSubmit={handleSubmit}>
                <fieldset>
                <Grid container spacing={2}>
                    <Grid xs={3} item={true}>
                        <FormControl fullWidth>
                            <Select
                                name="acquisition"
                                id="demo-simple-select"
                                value={activityType}
                                label="type"
                                onChange={handleActivityType}
                                variant='standard'
                                fullWidth
                            >
                                {config.activity_type.map((type) => (
                                    <MenuItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={3} item={true}>
                        <FormControl fullWidth>
                            <Select
                                name="acquisition"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={activityEvent}
                                onChange={handleIsRace}
                                variant='standard'
                                fullWidth
                            >
                                <MenuItem value="training">Training</MenuItem>
                                <MenuItem value="race">Race</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={3} item={true}>
                        <FormControl fullWidth>
                            <Input type='date' fullWidth defaultValue={defaultDate} name="acquisition"/>
                        </FormControl>
                    </Grid>
                    <Grid xs={4} item={true}>
                        <TextField 
                            fullWidth
                            required
                            label="Activity Name"
                            variant="standard"
                            name="acquisition"
                        />
                    </Grid>
                    <Grid xs={8} item={true}>
                        <TextField label="Description" variant="standard" fullWidth name="acquisition"/>
                    </Grid>

                    <Grid xs={3} item={true}>
                        <Item>Personal tracking</Item>
                    </Grid>
                    <Grid xs={3} item={true}>
                        <TextField 
                            fullWidth
                            required
                            label={activityType === "swimming" ? "Distance (m)" : "Distance (km)"}
                            variant="standard"
                            // type='number'
                            step='any'
                            onKeyDown={(event) => numericInputValidation(event)}
                            name="acquisition"
                        />
                    </Grid>
                    <Grid xs={3} item={true}>
                        <DurationInput required name="acquisition"/>
                    </Grid>
                    <Grid xs={3} item={true}>
                    </Grid>

                    <Grid xs={3} item={true}>
                        <Item>Official tracking</Item>
                    </Grid>
                    <Grid xs={3} item={true}>
                        <TextField 
                            fullWidth
                            label={activityType === "swimming" ? "Distance (m)" : "Distance (km)"}
                            variant="standard"
                            onKeyDown={(event) => numericInputValidation(event)}
                            // type='number'
                            step='any'
                            name="acquisition"
                        />
                    </Grid>
                    <Grid xs={3} item={true}>
                        <DurationInput name="acquisition"/>
                    </Grid>
                    <Grid xs={3} item={true}>
                        <TextField 
                            fullWidth
                            label="URL"
                            variant="standard"
                            name="acquisition"
                        />
                    </Grid>
                    
                    <Grid xs={3} item={true}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard">
                                Training/Race Type
                            </InputLabel>
                                {activityEvent == "training" && 
                                    activityType == "running" &&
                                    <Select
                                        defaultValue={config.training_type_running[0]}
                                        label="type"
                                        variant='standard'
                                        fullWidth
                                        name="acquisition"
                                    >
                                        {config.training_type_running.map((type) => (
                                            <MenuItem key={type} value={type}>{type}</MenuItem>
                                        ))}
                                    </Select>
                                }
                                {activityEvent == "training" && 
                                    activityType == "swimming" &&
                                    <Select
                                        defaultValue={config.training_type_swimming[0]}
                                        label="type"
                                        variant='standard'
                                        fullWidth
                                        name="acquisition"
                                    >
                                        {config.training_type_swimming.map((type) => (
                                            <MenuItem key={type} value={type}>{type}</MenuItem>
                                        ))}
                                    </Select>
                                }
                                {activityEvent == "race" && 
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
                                }
                        </FormControl>
                    </Grid>
                    <Grid xs={3} item={true}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard">
                                Environment
                            </InputLabel>
                            {activityType == "running" && 
                                <Select
                                    defaultValue={config.terrain[0]}
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
                                    defaultValue={config.pool[0]}
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
                    <Grid xs={3} item={true}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox name="acquisition"/>} label="With friends"/>
                        </FormGroup>
                    </Grid>
                </Grid>
                </fieldset>

                <Button style={{margin: "2rem"}}>
                    Reset
                </Button>
                <Button  style={{margin: "2rem"}} type="submit" variant="contained">
                    Submit
                </Button>

            </form>
        }
    </>
    );
}