import Typography from '@mui/material/Typography';
import EventTable from './EventTable';
import { compareToToday } from '../../assets/dateComparator';
import { Button } from '@mui/material';

export default function Training ({ training }) {
    const today = new Date();

    return <>
        <Button sx={{ color: 'white', display: 'block' }} variant="contained">
            + ADD TRAINING SCHEDULE
        </Button>
    </>
}