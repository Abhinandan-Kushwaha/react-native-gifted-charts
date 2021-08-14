import React from 'react';
import {PieChart} from '../../src/PieChart';

const SplitPie = () => {
  const pieData = [
    {value: 54, color: '#177AD5'},
    {value: 40, color: '#79D2DE'},
    {value: 20, color: '#ED6665', shiftX: 28, shiftY: -18},
  ];
  return <PieChart data={pieData} />;
};

export default SplitPie;
