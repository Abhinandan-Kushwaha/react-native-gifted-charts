import React from 'react';
import {View} from 'react-native';
import {BarChart} from '../../../src/BarChart';

const BarForest = () => {
  const lineData = [
    {value: 8, pointerShiftX: 10, pointerShiftY: -10},
    {value: 10},
    {value: 6},
    {value: 18},
    {value: 11},
    {value: 0},
    {value: 19},
    {value: 18},
    {value: 10},
  ];

  return (
    <View>
      <View style={{transform: [{rotateZ: '30deg'}, {skewX: '35deg'}]}}>
        <BarChart
          width={560}
          side={'right'}
          data={lineData}
          isThreeD
          sideWidth={40}
          hideAxesAndRules
          // frontColor={'rgb(200,50,50)'}
          // topColor={'rgba(250,50,50,0.8)'}
          // sideColor={'rgb(220,50,50)'}
          frontColor={'rgba(100,90,100,1)'}
          topColor={'rgba(100,150,100,0.8)'}
          sideColor={'rgba(100,120,100,1)'}
        />
      </View>
      <View
        style={{
          transform: [{rotateZ: '30deg'}, {skewX: '35deg'}, {translateY: -100}],
        }}>
        <BarChart
          hideAxesAndRules
          width={560}
          height={140}
          data={lineData}
          isThreeD
          sideWidth={40}
          side={'right'}
          // frontColor={'rgba(100,100,200,1)'}
          // topColor={'rgba(100,100,250,0.8)'}
          // sideColor={'rgba(100,100,220,1)'}
          frontColor={'rgba(100,160,100,1)'}
          topColor={'rgba(100,210,100,0.8)'}
          sideColor={'rgba(100,180,100,1)'}
        />
      </View>
      <View
        style={{
          transform: [{rotateZ: '30deg'}, {skewX: '35deg'}, {translateY: -180}],
        }}>
        <BarChart
          height={120}
          hideAxesAndRules
          width={560}
          data={lineData}
          isThreeD
          sideWidth={40}
          side={'right'}
          frontColor={'rgba(100,220,100,1)'}
          topColor={'rgba(100,255,100,0.8)'}
          sideColor={'rgba(100,240,100,1)'}
        />
      </View>
    </View>
  );
};

export default BarForest;
