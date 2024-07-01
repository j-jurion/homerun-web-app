import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';


export default function DistanceGraph ({ stats, showYearly }) {
    const valueFormatter = (value) => `${value} km`;
   
    const chartSetting = {
        yAxis: [
          {
            label: 'Distance (km)'
          },
        ],
        width: 500,
        height: 300
      };



    return <>
        <Typography variant="h5" noWrap>Distance Chart</Typography>
        {
          showYearly?
            <BarChart
                dataset={stats.yearly}
                xAxis={[{ scaleType: 'band', dataKey: 'year' }]}
                series={[
                    { dataKey: 'total_time', valueFormatter, color: "#208a3c" },
                ]}
                {...chartSetting}
            />
          :
            <BarChart
                dataset={stats.monthly}
                xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[
                    { dataKey: 'total_distance', valueFormatter, color: "#208a3c"},
                ]}
                {...chartSetting}
            />
        }
    </>
}