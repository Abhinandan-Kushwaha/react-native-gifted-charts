import React, {useState} from 'react';
import {View} from 'react-native';
import {LineChart} from '../../src/LineChart';

const FocusedIndex = () => {
  const [fIndex, setFIndex] = useState(2);
  const points: any[] = [66, 50, 48, 60, 75, 70, 72].map((value, idx, arr) => ({
    value,
  }));

  points[6].customDataPoint = () => (
    <View
      style={{
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#07BAD1',
      }}
    />
  );

  return (
    <LineChart
      data={points}
      width={325}
      dataPointsRadius={6}
      dataPointsWidth={16}
      dataPointsColor="#077AF1"
      yAxisThickness={0}
      initialSpacing={0}
      adjustToWidth
      thickness={3}
      hideRules
      stepValue={20}
      maxValue={90}
      interpolateMissingValues
      color="#07BAD1"
      curved
      curveType={1}
      areaChart
      startFillColor="#07BAD1"
      startOpacity={0.8}
      endFillColor="#07BAD1"
      endOpacity={0.3}
      isAnimated
      disableScroll
      focusEnabled
      focusedDataPointIndex={fIndex}
      onFocus={(item, index) => setFIndex(index + 1)}
    />
  );
};

export default FocusedIndex;
