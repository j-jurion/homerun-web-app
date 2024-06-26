import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { timeToString } from '../../assets/converter';

export default function Monthly ({ stats }) {
    const columns = [
        {
            field: 'month',
            headerName: 'Month',
            width: 150,
        },
        {
            field: 'total_distance',
            headerName: 'Distance',
            width: 150,
        },
        {
            field: 'total_time_formatted',
            headerName: 'Time',
            width: 110,
        },
        {
            field: 'nbOfActivities',
            headerName: '# Activities',
            type: 'number',
            width: 110,
        },
    ];

    const getRows = () => {
        let rows = []
        stats.monthly.forEach((month) => {
            month.id = month.month
            month.nbOfActivities = month.activities.length
            month.total_time_formatted = timeToString(month.total_time)
            rows.push(month)
        })
        return rows.sort((a, b) => a.month < b.month)

    } 

    return <>
        <Typography variant="h5" noWrap>Monthly</Typography>
        <Box sx={{ width: '100%' }}>
            <DataGrid
                rows={stats? getRows() : []}
                columns={columns}
                disableRowSelectionOnClick
                autoHeight
            />
        </Box>
    </>
}