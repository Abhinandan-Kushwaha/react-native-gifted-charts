import React, { useEffect, useState } from 'react';
import { View, ColorValue } from 'react-native';
import { PieChartMain } from './main';
import { FontStyle } from 'react-native-svg';
import { pieColors } from '../utils/constants';

type propTypes = {
  radius?: number;
  isThreeD?: boolean;
  donut?: boolean;
  innerRadius?: number;
  shadow?: boolean;
  innerCircleColor?: ColorValue;
  innerCircleBorderWidth?: number;
  innerCircleBorderColor?: ColorValue;
  shiftInnerCenterX?: number;
  shiftInnerCenterY?: number;
  shadowColor?: string;
  shadowWidth?: number;
  strokeWidth?: number;
  strokeColor?: string;
  backgroundColor?: string;
  data: Array<itemType>;
  semiCircle?: boolean;

  showText?: boolean;
  textColor?: string;
  textSize?: number;
  fontStyle?: FontStyle;
  fontWeight?: string;
  font?: string;
  showTextBackground?: boolean;
  textBackgroundColor?: string;
  textBackgroundRadius?: number;
  showValuesAsLabels?: boolean;

  centerLabelComponent?: Function;
  tiltAngle?: string;
  initialAngle?: number;
  labelsPosition?: 'onBorder' | 'outward' | 'inward' | 'mid';
  showGradient?: boolean;
  gradientCenterColor?: string;
  onPress?: Function;
  focusOnPress?: boolean;
  toggleFocusOnPress?: boolean;
  selectedIndex?: number;
  setSelectedIndex?: Function;
  sectionAutoFocus?: boolean;
  onLabelPress?: Function;
  extraRadiusForFocused?: number;
};
type itemType = {
  value: number;
  shiftX?: number;
  shiftY?: number;
  color?: string;
  gradientCenterColor?: string;
  text?: string;
  textColor?: string;
  textSize?: number;
  fontStyle?: FontStyle;
  fontWeight?: string;
  font?: string;
  textBackgroundColor?: string;
  textBackgroundRadius?: number;
  shiftTextX?: number;
  shiftTextY?: number;
  labelPosition?: 'onBorder' | 'outward' | 'inward' | 'mid';
  onPress?: Function;
  onLabelPress?: Function;
  strokeWidth?: number;
  strokeColor?: string;
  focused?: boolean;
};

export const PieChart = (props: propTypes) => {
  const radius = props.radius || 120;
  const extraRadiusForFocused =
    props.extraRadiusForFocused ??
      (props.focusOnPress || props.sectionAutoFocus)
      ? radius / 10
      : 0;
  const pi = props.semiCircle ? Math.PI / 2 : Math.PI;
  const [selectedIndex, setSelectedIndex] = useState(-1); // at the start, nothing is selected
  // because we're going to use a useEffect, we need startAngle and total to be state variables
  const [startAngle, setStartAngle] = useState(props.initialAngle || (props.semiCircle ? -pi : 0));
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Update the total, this could be use to replace the forEach : const newTotal = props.data.reduce((acc, item) => acc + item.value, 0);
    let newTotal = 0;
    props.data.forEach(item => {
      newTotal += item.value;
    });
    setTotal(newTotal);

    // Update selectedIndex based on focused item
    const newSelectedIndex = props.data.findIndex(item => item.focused === true);
    setSelectedIndex(newSelectedIndex);

    // Calculate the new start angle
    let newStartAngle = props.initialAngle || (props.semiCircle ? -pi : 0);
    if (newSelectedIndex !== -1) { // it was !== 0 here before, which would not work, it's either !==-1 or >=0
      // This could be used to replace the for loop that was used before
      const sumBeforeSelectedIndex = props.data
        .slice(0, newSelectedIndex)
        .reduce((acc, item) => acc + item.value, 0);
      setStartAngle(newStartAngle + (2 * pi * sumBeforeSelectedIndex) / newTotal);
    } else {
      setStartAngle(newStartAngle);
    }
  }, [props.data, props.initialAngle, props.semiCircle]);

  return (
    <View
      style={{
        height: (radius + extraRadiusForFocused) * 2,
        width: (radius + extraRadiusForFocused) * 2,
        marginLeft: extraRadiusForFocused * 2,
        marginTop: extraRadiusForFocused * 2,
      }}>
      {props.data.length > 1 && props.data[selectedIndex] && // don't forget to add this one so they're no errors when the data is empty / updating
        (props.focusOnPress || props.sectionAutoFocus) &&
        selectedIndex !== -1 && (
          <View
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
                  peripheral: true,
                  strokeWidth: 0,
                },
              ]}
              radius={radius + extraRadiusForFocused}
              initialAngle={startAngle}
              showText={false}
              innerRadius={props.innerRadius || radius / 2.5}
              isBiggerPie
              setSelectedIndex={setSelectedIndex}
            />
          </View>
        )}
      <View style={{ position: 'absolute' }}>
        <PieChartMain
          {...props}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </View>
    </View>
  );
};
