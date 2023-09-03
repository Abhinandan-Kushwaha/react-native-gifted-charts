import React from 'react';
import {View} from 'react-native';
import {BarChart} from '../../src/BarChart';
import { ruleTypes } from '../../src/utils/constants';

const BarChartWithGivenNumberOfVerticalLines = () => {
  const data = [
    {value: 15, label: 'Jan'},
    {value: 40, label: 'Feb'},
    {value: 10, label: 'Mar'},
    {value: 30, label: 'Apr'},
  ];
  return (
    <View>
      <BarChart
        data={data}
        width={300}
        showVerticalLines
        noOfVerticalLines={7}
        verticalLinesSpacing={40}
        rulesType={ruleTypes.SOLID}
      />
    </View>
  );
};

export default BarChartWithGivenNumberOfVerticalLines;
