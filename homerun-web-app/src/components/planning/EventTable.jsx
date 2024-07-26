import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { timeToString, speedToKmph, paceToMin } from '../../assets/converter'

export default function EventTable ({ events }) {
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
            headerName: 'Distance',
            width: 70,
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
        for (const [key, value] of Object.entries(events)) {
            rows.push({
                id: key,
                distance: events[key].distance,
                name: events[key].name,
                description: events[key].description,
                date: events[key].date,
                time: events[key].goal ? timeToString(events[key].goal.time) : "-",
                pace: events[key].goal ? paceToMin(events[key].goal.pace) : "-",
                speed: events[key].goal ? speedToKmph(events[key].goal.speed) : "-",
            })
        }

        return rows

    } 

    return <>
        <Box sx={{width: '100%' }}>
            <DataGrid
                rows={events? getRows() : []}
                columns={columns}
                disableRowSelectionOnClick
                autoHeight
                autoPageSize
                hideFooter
                onRowClick={() => {}}
            />
        </Box>
    </>
}