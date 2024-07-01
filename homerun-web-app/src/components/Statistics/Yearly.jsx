import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { timeToString } from '../../assets/converter';

export default function Yearly ({ stats }) {
    const columns = [
        {
            field: 'year',
            headerName: 'Year',
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
        stats.yearly.forEach((year) => {
            year.id = year.year
            year.nbOfActivities = year.activities.length
            year.total_time_formatted = timeToString(year.total_time)
            rows.push(year)
        })
        return rows.sort((a, b) => a.year < b.year)

    } 

    return <>
        <Typography variant="h5" noWrap>Yearly</Typography>
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