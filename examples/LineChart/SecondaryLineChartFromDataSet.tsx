import React from 'react';
import {View} from 'react-native';
import {LineChart} from '../../src/LineChart';
import { DataSet } from 'gifted-charts-core';

const SecondaryLineChart = () => {
    const d1 = [
      {value: 110},
      {value: 90},
      {value: 100},
      {value: 120},
      {value: 100, label: '2005', showXAxisIndex: true},
      {value: -80},
      {value: 90},
      {value: 110},
      {value: 120},
      {value: 100, label: '2010', showXAxisIndex: true},
      {value: 90},
      {value: 100},
      {value: 88},
      {value: 80},
      {value: 120, label: '2015', showXAxisIndex: true},
      {value: 76},
      {value: 104},
      {value: 112},
    ];
    const d2 = [
      0.055, 0.02, 0.1, 0.01, -0.05, 0.06, 0.08, 0.1, 0.08, 0.07, 0.06, 0.025,
      0.04, 0.06, 0.045, 0.09, 0.06, 0.04,
    ];

    const dataSet: Array<DataSet> = [
      {
        data: d1,
        color: 'orange',
        dataPointsColor: 'red',
        textColor: 'green',
      },
      {data: d2.map(v=>({value:v})), color: 'skyblue', dataPointsColor: 'blue', isSecondary:true},
    ];
  
    return (
      <View style={{borderWidth:1}}>
        <LineChart
          dataSet={dataSet}
          maxValue={140}
          noOfSections={7}
          spacing={15}
          hideDataPoints
          // hideRules
          color="orange"
          yAxisColor={'orange'}
          showYAxisIndices
          yAxisIndicesColor={'orange'}
          yAxisIndicesWidth={10}
          // secondaryData={d2.map(v => ({value: v}))}
          secondaryLineConfig={{color: 'blue'}}
          secondaryYAxis={{
            maxValue: .2,
            noOfSections: 4,
            showFractionalValues: true,
            roundToDigits: 3,
            yAxisColor: 'blue',
            yAxisIndicesColor: 'blue',
          }}
          xAxisLabelTextStyle={{width: 80, marginLeft: -36}}
          xAxisIndicesHeight={10}
          xAxisIndicesWidth={2}
          pointerConfig={{
            pointerLabelComponent: ((items1,items2,index)=>{
              console.log('items1...',items1)
              console.log('items2...',items2)
              console.log('index...',index)
              return(
                <View />
              )
            })
          }}
        />
      </View>
    );
  };
  
  export default SecondaryLineChart;
  