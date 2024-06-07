import React from 'react';
import { Box } from '@chakra-ui/react';
import { AgChartsReact } from 'ag-charts-react';

const PieChart = ({ pieChartData, width }) => {
  return (
    <Box style={{ width: width }} h={'500px'}>
      <AgChartsReact
        options={{
          series: [{
            type: 'donut', // Change type to 'donut'
            angleKey: 'value',
            calloutLabelKey: 'label',
            innerRadiusRatio: 0.7,
            data: pieChartData,
          }],
        }}
      />
    </Box>
  );
}

export default PieChart;
