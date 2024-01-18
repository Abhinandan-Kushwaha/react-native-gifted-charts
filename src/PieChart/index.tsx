import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {PieChartMain} from './main';
import {pieColors} from '../utils/constants';
import { PieChartPropsType } from './types';

export const PieChart = (props: PieChartPropsType) => {
  const radius = props.radius || 120;
  const extraRadiusForFocused =
    props.extraRadiusForFocused ??
    (props.focusOnPress || props.sectionAutoFocus ? radius / 10 : 0);
  const pi = props.semiCircle ? Math.PI / 2 : Math.PI;
  const [selectedIndex, setSelectedIndex] = useState(-1); // at the start, nothing is selected
  // because we're going to use a useEffect, we need startAngle and total to be state variables
  const [startAngle, setStartAngle] = useState(
    props.initialAngle || (props.semiCircle ? -pi : 0),
  );
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Update the total, this could be use to replace the forEach : const newTotal = props.data.reduce((acc, item) => acc + item.value, 0);
    let newTotal = 0;
    props.data.forEach(item => {
      newTotal += item.value;
    });
    setTotal(newTotal);

    // Update selectedIndex based on focused item
    const newSelectedIndex = props.data.findIndex(
      item => item.focused === true,
    );
    setSelectedIndex(newSelectedIndex);

    // Calculate the new start angle
    let newStartAngle = props.initialAngle || (props.semiCircle ? -pi : 0);
    if (newSelectedIndex !== -1) {
      // it was !== 0 here before, which would not work, it's either !==-1 or >=0
      // This could be used to replace the for loop that was used before
      const sumBeforeSelectedIndex = props.data
        .slice(0, newSelectedIndex)
        .reduce((acc, item) => acc + item.value, 0);
      setStartAngle(
        newStartAngle + (2 * pi * sumBeforeSelectedIndex) / (newTotal || 1),
      );
    } else {
      setStartAngle(newStartAngle);
    }
  }, [props.data, props.initialAngle, props.semiCircle]);

  useEffect(() => {
    if (selectedIndex !== -1) {
      const newStartAngle = props.initialAngle || (props.semiCircle ? -pi : 0);
      let start = 0;
      for (let i = 0; i < selectedIndex; i++) {
        start += props.data[i].value;
      }
      if (total) {
        setStartAngle(newStartAngle + (2 * pi * start) / (total || 1));
      }
    }
  }, [selectedIndex]);

  const {
    data,
    donut,
    isThreeD,
    semiCircle,
    inwardExtraLengthForFocused = 0,
  } = props;
  const canvasWidth = radius * 2;
  const canvasHeight = isThreeD ? radius * 2.3 : radius * 2;

  const strokeWidth = props.strokeWidth || 0;
  const innerRadius = props.innerRadius || radius / 2.5;
  const innerCircleColor =
    props.innerCircleColor || props.backgroundColor || 'white';
  const innerCircleBorderWidth =
    props.innerCircleBorderWidth ||
    (props.innerCircleBorderColor ? strokeWidth || 2 : 0);
  const innerCircleBorderColor = props.innerCircleBorderColor || 'lightgray';
  const shiftInnerCenterX = props.shiftInnerCenterX || 0;
  const shiftInnerCenterY = props.shiftInnerCenterY || 0;

  let tiltAngle = props.tiltAngle || '55deg';

  let isDataShifted = false;

  data.forEach((item: any) => {
    if (item.shiftX || item.shiftY) {
      isDataShifted = true;
    }
  });

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
