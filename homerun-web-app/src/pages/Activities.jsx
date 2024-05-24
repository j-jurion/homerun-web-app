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

const USER_ID = 1;

function timeToString(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

function speedToKmph(kilometersPerSeconds) {
    return kilometersPerSeconds.toFixed(1);
}

function paceToMin(seconds) {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
}

async function getActivitiesForEachType(userId, activityTypes) {
    let activities = [];
    activityTypes = activityTypes.length === 0 ? ["running", "cycling", "swimming"] : activityTypes;
    for (let i = 0; i < activityTypes.length; i++) {
        activities.push(... await getActivities(userId, activityTypes[i]));
    }
    console.log(activities)
    return activities;
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

    const [trackingType, setTrackingType] = useState("personal");
    const [cleanActivities, setCleanActivities] = useState(activities);

    const [activityTypes, setActivityTypes] = useState([]);

    const handleChangeActivityType = (event, newActivityType) => {
        setActivityTypes(newActivityType);
    };

    const handleChangeOfficialResult = (event, newOfficialResult) => {
        setTrackingType(newOfficialResult ? "official" : "personal");
    };

    useEffect(() => {
        async function fetchActivities() {
            setIsFetchingActivities(true);
            try {
                const activities = await getActivitiesForEachType(USER_ID, activityTypes);
                setActivities(activities);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch activities.' });
                console.log(error);
            }

            setIsFetchingActivities(false);
        }

        fetchActivities();
    }, [activityTypes]);



    useEffect(() => {
        if (activities) {
            let tempActivities = []

            activities.forEach(activity => {
                let result = {};
                activity.results.forEach((res) => {
                    if (res.tracking_type === trackingType) {
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
    }, [activities, trackingType]);



    return <>
        <h1>Activities</h1>
        <ActivityToggleButtons activityTypes={activityTypes} handleChangeActivityType={handleChangeActivityType}/>
        <FormGroup>
            <FormControlLabel control={<Switch color="action" checked={trackingType==="official"} onChange={handleChangeOfficialResult} />} label="Official Results" />
        </FormGroup>

        {activities 
            ? <ActivityTable activities={cleanActivities} columns={columns}/>
            : isFetchingActivities ? <p>Loading activities...</p>: <p>No activities available.</p> 
        }
    </>
}