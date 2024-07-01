import { useState, useEffect } from 'react';

import ActivityToggleButtons from '../components/ActivityToggleButtons.jsx';

import PropTypes from 'prop-types';
import { USER_ID } from '../assets/constants'
import BestEfforts from '../components/Statistics/BestEfforts.jsx';
import Monthly from '../components/Statistics/Monthly.jsx';
import TimeGraph from '../components/Statistics/TimeGraph.jsx';
import DistanceGraph from '../components/Statistics/DistanceGraph.jsx';
import Yearly from '../components/Statistics/Yearly.jsx';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { getStats } from '../assets/http.js';

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
  
export default function Statistics() {
    const [isFetchingStats, setIsFetchingStats] = useState(true);
    const [stats, setStats] = useState();
    const [error, setError] = useState();

    const [value, setValue] = useState(0);

    const [activityType, setActivityType] = useState('running');
    
    const handleChangeActivityType = (event, newActivityType) => {
        setActivityType(newActivityType);
    };

    useEffect(() => {
        async function fetchStats() {
            setIsFetchingStats(true);
            try {
                const stats = await getStats(USER_ID, activityType);
                setStats(stats);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch stats.' });
                console.log(error);
            }

            setIsFetchingStats(false);
        }

        fetchStats();
    }, [activityType]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <>
        <h1>Statistics</h1>
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
                <Tab label="Best Efforts" />
                <Tab label="Monthly" />
                <Tab label="Yearly" />
            </Tabs>
            <TabPanel value={value} index={0}>
                {stats 
                    ? <>
                        <BestEfforts stats={stats}/>
                    </>
                    : isFetchingStats ? <p>Loading stats...</p>: <p>No stats available.</p> 
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {stats 
                    ? <>
                        <Monthly stats={stats}/>
                        <TimeGraph stats={stats} showYearly={false}/>
                        <DistanceGraph stats={stats} showYearly={false}/>
                    </>
                    : isFetchingStats ? <p>Loading stats...</p>: <p>No stats available.</p> 
                }
            </TabPanel>
            <TabPanel value={value} index={2}>
                {stats 
                    ? <>
                        <Yearly stats={stats}/>
                        <TimeGraph stats={stats} showYearly={true}/>
                        <DistanceGraph stats={stats} showYearly={true}/>
                    </>
                    : isFetchingStats ? <p>Loading stats...</p>: <p>No stats available.</p> 
                }
            </TabPanel>
        </Box>
    </>
}