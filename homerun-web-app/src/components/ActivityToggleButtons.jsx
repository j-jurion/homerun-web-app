import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PoolIcon from '@mui/icons-material/Pool';

export default function ActivityToggleButtons({activityTypes, handleChangeActivityType}) {
    return <ToggleButtonGroup
            value={activityTypes}
            onChange={handleChangeActivityType}
            >
            <ToggleButton value="running"><DirectionsRunIcon color="action"/></ToggleButton>
            <ToggleButton value="cycling"><DirectionsBikeIcon color="action"/></ToggleButton>
            <ToggleButton value="swimming"><PoolIcon color="action"/></ToggleButton>
        </ToggleButtonGroup>;
}