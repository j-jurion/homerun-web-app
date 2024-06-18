import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { timeToString, speedToKmph, paceToMin } from '../../assets/converter'

export default function BestEfforts ({ stats }) {
    const columns = [
        {
            field: 'distance',
            headerName: 'Distance',
            width: 150,
        },
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
    ];

    const getRows = () => {
        let rows = []
        Object.keys(stats.best_efforts).forEach((key) =>{
            let result = {}
            if (stats.best_efforts[key].length > 0) {
                stats.best_efforts[key][0].results.forEach((res) => {
                    if (res.tracking_type === "personal") {
                        result = res;
                    }
                })
            }
            rows.push({
                id: key,
                distance: key,
                name: stats.best_efforts[key].length > 0 ? stats.best_efforts[key][0].name : "-",
                date: stats.best_efforts[key].length > 0 ? stats.best_efforts[key][0].date : "-",
                time: result.time ? timeToString(result.time) : "-",
                pace: result.pace ? paceToMin(result.pace) : "-",
                speed: result.speed ? speedToKmph(result.speed) : "-",
            })
        })
        return rows

    } 

    return <>
        <p>Best efforts table</p>
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={stats? getRows() : []}
                columns={columns}
                disableRowSelectionOnClick
            />
        </Box>
    </>
}