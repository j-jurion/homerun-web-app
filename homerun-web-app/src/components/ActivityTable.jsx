import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


  
export default function ActivityTable({activities, columns}) {

    return (
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={activities? activities : []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 50, 100]}
            disableRowSelectionOnClick

          />
        </Box>
      );
}