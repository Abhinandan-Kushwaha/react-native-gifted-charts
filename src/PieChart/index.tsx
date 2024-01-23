import React from 'react';
import {View} from 'react-native';
import {PieChartMain} from './main';
import {PieChartPropsType, pieColors, usePieChart} from 'gifted-charts-core';

export const PieChart = (props: PieChartPropsType) => {
  const {
    radius,
    extraRadiusForFocused,
    selectedIndex,
    setSelectedIndex,
    startAngle,
    total,
    donut,
    isThreeD,
    semiCircle,
    inwardExtraLengthForFocused,
    canvasWidth,
    canvasHeight,
    innerRadius,
    innerCircleColor,
    innerCircleBorderWidth,
    innerCircleBorderColor,
    shiftInnerCenterX,
    shiftInnerCenterY,
    tiltAngle,
    isDataShifted,
  } = usePieChart(props);

  const renderInnerCircle = (innerRadius, innerCircleBorderWidth) => {
    if (props.centerLabelComponent || (donut && !isDataShifted)) {
      return (
        <View
          style={[
            {
              height: innerRadius * 2,
              width: innerRadius * 2,
              borderRadius: innerRadius,
              position: 'absolute',
              // zIndex: 100,
              alignSelf: 'center',
              backgroundColor: innerCircleColor,
              left: canvasWidth / 2 - innerRadius + shiftInnerCenterX,
              top: canvasHeight / 2 - innerRadius + shiftInnerCenterY,
              borderWidth: innerCircleBorderWidth,
              borderColor: innerCircleBorderColor,
              justifyContent: 'center',
              alignItems: 'center',
            },
            isThreeD && {
              borderTopWidth: innerCircleBorderWidth * 5,
              borderLeftWidth: shiftInnerCenterX
                ? innerCircleBorderWidth * 2
                : innerCircleBorderWidth,
              transform: [{rotateX: tiltAngle}],
            },
            semiCircle &&
              isThreeD && {
                borderTopWidth: isThreeD
                  ? innerCircleBorderWidth * 5
                  : innerCircleBorderWidth,
                borderLeftWidth: 0.5,
                borderLeftColor: innerCircleColor,
                borderBottomWidth: 0,
                borderRightWidth: 0.5,
                borderRightColor: innerCircleColor,
              },
          ]}>
          <View style={{marginTop: semiCircle ? -0.5 * innerRadius : 0}}>
            {props.centerLabelComponent ? props.centerLabelComponent() : null}
          </View>
        </View>
      );
    }
    return null;
  };

  if (!total) return null;

  return (
    <View
      style={{
        height: (radius + extraRadiusForFocused) * (props.semiCircle ? 1 : 2),
        width: (radius + extraRadiusForFocused) * 2,
        marginLeft: extraRadiusForFocused * 2,
        marginTop: extraRadiusForFocused * 2,
      }}>
      <View style={{position: 'absolute'}}>
        <PieChartMain
          {...props}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </View>
      {renderInnerCircle(innerRadius, innerCircleBorderWidth)}
      {props.data.length > 1 &&
        props.data[selectedIndex] && // don't forget to add this one so there are no errors when the data is empty / updating
        (props.focusOnPress || props.sectionAutoFocus) &&
        selectedIndex !== -1 && (
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              top: -extraRadiusForFocused,
              left: -extraRadiusForFocused,
            }}>
            <PieChartMain
              {...props}
              data={[
                {
                  value: props.data[selectedIndex].value,
                  text: props.data[selectedIndex].text,
                  color:
                    props.data[selectedIndex].color ||
                    pieColors[selectedIndex % 9],
                  strokeColor:
                    props.data[selectedIndex].strokeColor || undefined,
                  strokeWidth:
                    props.data[selectedIndex].strokeWidth || undefined,
                  gradientCenterColor:
                    props.data[selectedIndex].gradientCenterColor || undefined,
                },
                {
                  value: total - props.data[selectedIndex].value,
                  onPress: () => alert('black'),
                  peripheral: true,
                  strokeWidth: 0,
                },
              ]}
              radius={radius + extraRadiusForFocused}
              initialAngle={startAngle}
              innerRadius={props.innerRadius || radius / 2.5}
              isBiggerPie
              setSelectedIndex={setSelectedIndex}
            />
          </View>
        )}
      {renderInnerCircle(innerRadius - inwardExtraLengthForFocused, 0)}
    </View>
  );
};
