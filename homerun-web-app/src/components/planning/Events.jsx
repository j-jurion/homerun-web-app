import Typography from '@mui/material/Typography';
import EventTable from './EventTable';
import { compareToToday } from '../../assets/dateComparator';
import { Button } from '@mui/material';
import { ADD_EVENT } from '../../assets/routes';
import { useNavigate } from 'react-router-dom';

export default function Events ({ events }) {
    const navigate = useNavigate();

    const today = new Date();

    const eventsToday = events.filter((event) => compareToToday(event.date) === 0);
    const eventsUpcoming = events.filter((event) => compareToToday(event.date) === 1);
    const eventsPassed = events.filter((event) => compareToToday(event.date) === -1);

    return <>
        <Button sx={{ color: 'white', display: 'block' }} variant="contained" onClick={() => navigate(`../${ADD_EVENT}`)}>
            + ADD EVENT
        </Button>
        {
            eventsToday.length !== 0 ? 
            <>
                <Typography variant="h5" noWrap>Today!</Typography>
                <EventTable events={eventsToday}/>
            </> 
            :
            <></>
        }
        <Typography variant="h5" noWrap>Upcoming events</Typography>
        {eventsUpcoming.length !== 0 ? <EventTable events={eventsUpcoming}/> : <p>No upcoming events</p>}
        <Typography variant="h5" noWrap>Passed events</Typography>
        {eventsPassed.length !== 0 ? <EventTable events={eventsPassed}/> : <p>No passed events</p>}
        
    </>
}