import React from 'react';
import Svg from 'react-native-svg';
import Cuboid from './Cuboid';

const BarChartThreeD = props => {
  return (
    <Svg>
      <Cuboid ix={130} iy={110} height={50} size={20} angle={Math.PI / 8} />
      <Cuboid ix={112} iy={130} height={30} size={20} angle={Math.PI / 8} />
    </Svg>
  );
};
export default BarChartThreeD;
