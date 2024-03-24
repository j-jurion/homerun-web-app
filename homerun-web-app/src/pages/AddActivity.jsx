import { useState, useEffect } from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getConfig } from '../http.js'

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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
        console.log("TEST")
        event.preventDefault();
        console.log(data);
      }

      const Item = styled(Paper)(({ theme }) => ({
        //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        //...theme.typography.body2,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
    <>
        <h1>Add Activity</h1>
        {!config && <p>Loading ...</p>}
        {config && 
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid xs={3} item={true}>
                        <FormControl fullWidth>
                            <Select
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
                            <Input type='date' fullWidth defaultValue={defaultDate}/>
                        </FormControl>
                    </Grid>
                    <Grid xs={4} item={true}>
                        <TextField 
                            fullWidth
                            required
                            label="Activity Name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid xs={8} item={true}>
                        <TextField label="Description" variant="standard" fullWidth/>
                    </Grid>

                    <Grid xs={3} item={true}>
                        <Item>Personal tracking</Item>
                    </Grid>
                    <Grid xs={3} item={true}>
                        <TextField 
                            fullWidth
                            required
                            label="Distance"
                            variant="standard"
                        />
                    </Grid>
                    <Grid xs={3} item={true}>
                        <TextField 
                            fullWidth
                            required
                            label="Time"
                            variant="standard"
                        />
                    </Grid>
                    <Grid xs={3} item={true}>
                    </Grid>

                    <Grid xs={3} item={true}>
                        <Item>Official tracking</Item>
                    </Grid>
                    <Grid xs={3} item={true}>
                        <TextField 
                            fullWidth
                            label="Distance"
                            variant="standard"
                        />
                    </Grid>
                    <Grid xs={3} item={true}>
                        <TextField 
                            fullWidth
                            label="Time"
                            variant="standard"
                        />
                    </Grid>
                    <Grid xs={3} item={true}>
                        <TextField 
                            fullWidth
                            label="URL"
                            variant="standard"
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
                            <FormControlLabel control={<Checkbox />} label="With Company" />
                        </FormGroup>
                    </Grid>
                </Grid>


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