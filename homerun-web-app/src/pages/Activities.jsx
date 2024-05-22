import { useState, useEffect } from 'react';

import { Button, ToggleButtonGroup, ToggleButton, FormControlLabel, Switch, FormGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { getActivities } from '../http.js'
import ActivityTable from '../components/ActivityTable.jsx';
import ActivityToggleButtons from '../components/ActivityToggleButtons.jsx';


function timeToString(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

function speedToKmph(kilometersPerSeconds) {
    return kilometersPerSeconds.toFixed(1);
}

function paceToMin(seconds) {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
}

const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 100,
    },
    {
      field: 'distance',
      headerName: 'Distance (km)',
      type: 'number',
      width: 100,
    },
    {
        field: 'time',
        headerName: 'Time',
        type: 'number',
        width: 110,
    },
    {
        field: 'pace',
        headerName: 'Pace (min/km)',
        type: 'number',
        width: 110,
    },
    {
        field: 'speed',
        headerName: 'Speed (km/h)',
        type: 'number',
        width: 110,
    },
    {
        field: 'training_type',
        headerName: 'Intensity',
        width: 110,
    },
    {
        field: 'environment',
        headerName: 'Environment',
        width: 110,
    },
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: (params) => {
        const onClickEdit = (e) => {
           return;
        };
        const onClickRemove = (e) => {
            return;
         };

        return <>
            <Tooltip title="Edit">
                <IconButton onClick={onClickEdit}>
                    <EditIcon color="action"/>
                </IconButton>
                </Tooltip>
                <Tooltip title="Remove">
                <IconButton onClick={onClickRemove}>
                    <DeleteIcon color="action"/>
                </IconButton>
            </Tooltip>
            {/* <Badge badgeContent={"race"} color="primary">
                <DeleteIcon color="action" />
            </Badge> */}
        </>;
        }
    },
  ];

export default function Activities() {
    const [isFetchingActivities, setIsFetchingActivities] = useState(true);
    const [activities, setActivities] = useState(null);
    const [error, setError] = useState();

    const [showOfficalResults, setShowOfficalResults] = useState(true);
    const [cleanActivities, setCleanActivities] = useState(activities);

    const [activityTypes, setActivityTypes] = useState([]);

    const handleChangeActivityType = (event, newActivityType) => {
        setActivityTypes(newActivityType);
    };

    const handleChangeOfficialResult = (event, newOfficialResult) => {
        setShowOfficalResults(newOfficialResult);
    };

    useEffect(() => {
        async function fetchActivities() {
            setIsFetchingActivities(true);
            try {
                const activities = await getActivities(1, "running");
                setActivities(activities);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch activities.' });
                console.log(error);
            }

            setIsFetchingActivities(false);
        }

        fetchActivities();
    }, []);



    useEffect(() => {
        if (activities) {
            let tempActivities = []

            activities.forEach(activity => {
                let result = {};
                activity.results.forEach((res) => {
                    if (res.tracking_type === "personal") {
                        result = res;
                    }
                })
                tempActivities.push({
                    id: activity.id, 
                    name: activity.name, 
                    date: activity.date, 
                    distance: result.distance,
                    time: result.time ? timeToString(result.time) : "-",
                    pace: result.pace ? paceToMin(result.pace) : "-",
                    speed: result.speed ? speedToKmph(result.speed) : "-",
                    training_type: activity.training_type ? activity.training_type : activity.race_type,
                    environment: activity.environment,
                });
            });;
            setCleanActivities(tempActivities);
        }
    }, [activities]);



    return <>
        <h1>Activities</h1>
        <ActivityToggleButtons activityTypes={activityTypes} handleChangeActivityType={handleChangeActivityType}/>
        <FormGroup>
            <FormControlLabel control={<Switch color="action" checked={showOfficalResults} onChange={handleChangeOfficialResult} />} label="Official Results" />
        </FormGroup>

        {activities 
            ? <ActivityTable activities={cleanActivities} columns={columns}/>
            : isFetchingActivities ? <p>Loading activities...</p>: <p>No activities available.</p> 
        }
    </>
}