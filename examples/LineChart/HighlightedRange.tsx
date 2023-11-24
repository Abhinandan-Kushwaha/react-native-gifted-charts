import React from 'react';
import {LineChart} from '../../src/LineChart';

const HighlightedRange = () => {
    const data = [
        {value: 6},
        {value: 6},
        {value: 8},
        {value: 5},
        {value: 5},
        {value: 8},
        {value: 0},
        {value: 8},
        {value: 10},
        {value: 10},
        {value: 12},
        {value: 15},
        {value: 20},
        {value: 22},
        {value: 20},
      ];
    
      return (
        <LineChart
          data={data}
          spacing={22}
          thickness={5}
          color="red"
          hideRules
          hideDataPoints
          xAxisThickness={0}
          yAxisThickness={0}
          highlightedRange={{
            from: 5,
            to: 12,
            color: 'green',
          }}
        />
      );
};

export default HighlightedRange;
