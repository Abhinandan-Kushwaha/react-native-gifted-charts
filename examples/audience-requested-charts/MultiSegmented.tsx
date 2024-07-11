import React from 'react';
import {LineChart} from '../../src/LineChart';

export const MultiSegmented = () => {
  const data = [
    {value: 5},
    {value: 8},
    {value: 7}, // break in line from previous to this point
    {value: 4},
    {value: 6},
    {value: 0, hideDataPoint: true}, // invisible, here's a break in the line
    {value: 0, hideDataPoint: true}, // break continued
    {value: 6},
    {value: 9},
  ];
  return (
    <LineChart
      spacing={35}
      dataSet={[{data}]}
      lineSegments={[
        {startIndex: 0, endIndex: 1, color: 'green'},             // 1st segmant from 0th to 1st index
        {startIndex: 1, endIndex: 2, color: 'transparent'},       // break (transparent = invisible)
        {startIndex: 2, endIndex: 4, color: 'red'},               // 2nd segment from 2nd to 4th index
        {startIndex: 4, endIndex: 7, color: 'transparent'},       // 2nd break from 4th to 7th index
        // remaining of the data points, from 7th to 8th index make the last segment
      ]}
    />
  );
};
