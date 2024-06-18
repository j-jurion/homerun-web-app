import { useState, useEffect } from 'react';

import ActivityToggleButtons from '../components/ActivityToggleButtons.jsx';
import { getStats } from '../http.js'
import { USER_ID } from '../assets/constants'
import BestEfforts from '../components/Statistics/BestEfforts.jsx';
import Monthly from '../components/Statistics/Monthly.jsx';
import TimeGraph from '../components/Statistics/TimeGraph.jsx';

export default function Statistics() {
    const [isFetchingStats, setIsFetchingStats] = useState(true);
    const [stats, setStats] = useState();
    const [error, setError] = useState();

    const [activityType, setActivityType] = useState('running');
    
    const handleChangeActivityType = (event, newActivityType) => {
        setActivityType(newActivityType);
    };

    console.log(stats)

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

    return <>
        <h1>Statistics</h1>
        <ActivityToggleButtons  value={activityType} onChange={handleChangeActivityType} exclusive/>
        {stats 
            ? <>
                <BestEfforts stats={stats}/>
                <Monthly stats={stats}/>
                <TimeGraph stats={stats}/>
            </>
            : isFetchingStats ? <p>Loading stats...</p>: <p>No stats available.</p> 
        }
    </>
}