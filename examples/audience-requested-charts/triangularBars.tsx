import React from 'react';
import {BarChart,ruleTypes} from 'react-native-gifted-charts';
import {View, Text, StyleSheet} from 'react-native';

export const Triangular = () => {
  const TriangleCorner = props => {
    return (
      <View
        style={[
          triangleStyles.triangleCorner,
          props.style,
          {
            borderRightWidth: props.width / 2,
            borderTopWidth: props.width / 2,
            borderTopColor: props.color,
          },
        ]}
      />
    );
  };

  const TopTriangle = ({color, label}) => (
    <>
      <TriangleCorner
        width={70}
        color={color}
        style={{
          transform: [{rotate: '45deg'}, {translateX: 12}, {translateY: 13}],
        }}
      />
      <Text style={{position: 'absolute', top: 4, fontWeight: 'bold'}}>
        {'+' + label.toFixed(1)}
      </Text>
    </>
  );

  const iData = [
    {value: 12.2, frontColor: '#DAEFF8'},
    {value: 35.7, frontColor: '#C0ECFB'},
    {value: 68.2, frontColor: '#87E0FE'},
    {value: 111.5, frontColor: '#39CCFC'},
    {value: 167.0, frontColor: '#009ACD'},
  ];

  iData.forEach(
    (item,index) =>
      (item.topLabelComponent = () => (
        <TopTriangle color={item.frontColor} label={index ? item.value-iData[index-1].value : item.value} />
      )),
  );

  return (
    <BarChart
      barWidth={50}
      spacing={14}
      initialSpacing={10}
      maxValue={260}
      stepHeight={30}
      data={iData}
      rulesType={ruleTypes.SOLID}
      xAxisThickness={0}
      yAxisThickness={0}
      hideYAxisText
      showLine
      showVerticalLines
      lineConfig={{
        curved: true,
        thickness: 3,
        dataPointsColor: '#39CCFC',
        dataPointsRadius: 6,
        color: 'gray',
        shiftY: 56,
      }}
    />
  );
};

const triangleStyles = StyleSheet.create({
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightColor: 'transparent',
    transform: [{rotate: '90deg'}],
  },
});
