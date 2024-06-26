import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import { timeToString } from '../../assets/converter'


export default function TimeGraph ({ stats, showYearly }) {
    const valueFormatter = (value) => `${timeToString(value)}`;
   
    const chartSetting = {
        yAxis: [
          {
            label: '',valueFormatter
          },
        ],
        width: 500,
        height: 300,
      };



    return <>
        <Typography variant="h5" noWrap>Time Chart</Typography>
        {
          showYearly ?
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
                    { dataKey: 'total_time', valueFormatter, color: "#208a3c" },
                ]}
                {...chartSetting}
            />
        }
        
    </>
}