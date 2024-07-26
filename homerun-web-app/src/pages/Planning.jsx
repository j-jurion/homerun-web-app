import { useState, useEffect } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

import PropTypes from 'prop-types';
import { getEvents, getTraining } from '../assets/http.js'
import { USER_ID } from '../assets/constants.js'
import ActivityToggleButtons from '../components/ActivityToggleButtons.jsx';
import Events from '../components/planning/Events.jsx';
import Training from '../components/planning/Training.jsx';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

export default function Planning() {
    const [isFetchingEvents, setIsFetchingEvents] = useState(true);
    const [isFetchingTraining, setIsFetchingTraining] = useState(true);
    const [events, setEvents] = useState();
    const [training, setTraining] = useState();
    const [value, setValue] = useState(0);
    const [error, setError] = useState();

    const [activityType, setActivityType] = useState('running');
    
    const handleChangeActivityType = (event, newActivityType) => {
        setActivityType(newActivityType);
    };

    useEffect(() => {
        async function fetchEvents() {
            setIsFetchingEvents(true);
            try {
                const events = await getEvents(USER_ID, activityType);
                setEvents(events);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch events.' });
                console.log(error);
            }

            setIsFetchingEvents(false);
        }

        fetchEvents();
    }, [activityType]);

    useEffect(() => {
        async function fetchTraining() {
            setIsFetchingTraining(true);
            try {
                const training = await getTraining(USER_ID, activityType);
                setTraining(training);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch training schedules.' });
                console.log(error);
            }

            setIsFetchingTraining(false);
        }

        fetchTraining();
    }, [activityType]);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <>
        <h1>Planning</h1>

        <ActivityToggleButtons  value={activityType} onChange={handleChangeActivityType} exclusive/>

        <Box
            sx={{ flexGrow: 1, display: 'flex' }}
            >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Events" />
                <Tab label="Training Schedule" />
                <Tab label="Calendar" />
            </Tabs>
            <TabPanel value={value} index={0}>
                {events 
                    ? <>
                        <Events events={events}/>
                    </>
                    : isFetchingEvents ? <p>Loading events...</p>: <p>No events available.</p> 
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {training 
                    ? <>
                        <Training training={training}/>
                    </>
                    : isFetchingTraining ? <p>Loading training...</p>: <p>No training available.</p> 
                }
            </TabPanel>
            <TabPanel value={value} index={2}>
                        <h6>Calendar</h6>
            </TabPanel>
        </Box>
    </>
}