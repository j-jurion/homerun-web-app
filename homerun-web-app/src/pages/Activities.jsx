import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { FormControlLabel, Switch, FormGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { getActivities } from '../assets/http.js'
import { timeToString, speedToKmph, paceToMin } from '../assets/converter'
import { USER_ID } from '../assets/constants'
import ActivityTable from '../components/ActivityTable.jsx';
import ActivityToggleButtons from '../components/ActivityToggleButtons.jsx';
import DeleteModal from '../components/modals/DeleteModal.jsx';


async function getActivitiesForEachType(userId, activityTypes) {
    let activities = [];
    activityTypes = activityTypes.length === 0 ? ["running", "cycling", "swimming"] : activityTypes;
    for (let i = 0; i < activityTypes.length; i++) {
        activities.push(... await getActivities(userId, activityTypes[i]));
    }
    return activities;
}

export default function Activities() {
    const navigate = useNavigate();

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
                navigate(`/edit-activity/${params.id}`)
            };
            const onClickRemove = (e) => {
                async function removeActivity() {
                    setSelectedActivity(params.id);
                    handleOpenDeleteModal();
                }
                removeActivity();
             };
    
            return <>
                <Tooltip title="Edit">
                    <IconButton onClick={onClickEdit}>
                        <EditIcon color="action"/>
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove">
                    <IconButton onClick={() => onClickRemove(params)}>
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


    const [isFetchingActivities, setIsFetchingActivities] = useState(true);
    const [activities, setActivities] = useState(null);
    const [error, setError] = useState();

    const [trackingType, setTrackingType] = useState("personal");
    const [cleanActivities, setCleanActivities] = useState(activities);

    const [activityTypes, setActivityTypes] = useState([]);

    const [selectedActivity, setSelectedActivity] = useState(null);
    
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handeActivitiesAfterDeletion = (activityId) => {
        setActivities(activities.filter((a) => a.id != activityId));
    }

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
        
        <DeleteModal open={openDeleteModal} handleClose={handleCloseDeleteModal} activityId={selectedActivity} handeActivitiesAfterDeletion={handeActivitiesAfterDeletion}></DeleteModal>

        <ActivityToggleButtons value={activityTypes} onChange={handleChangeActivityType}/>
        <FormGroup>
            <FormControlLabel control={<Switch color="action" checked={trackingType==="official"} onChange={handleChangeOfficialResult} />} label="Official Results" />
        </FormGroup>

        {activities 
            ? <ActivityTable activities={cleanActivities} columns={columns}/>
            : isFetchingActivities ? <p>Loading activities...</p>: <p>No activities available.</p> 
        }
    </>
}