import React, {useState} from 'react';
import {View, ColorValue} from 'react-native';
import {colors} from './colors';
import {PieChartMain} from './main';
import {FontStyle} from 'react-native-svg';

type propTypes = {
  radius?: number;
  isThreeD?: Boolean;
  donut?: Boolean;
  innerRadius?: number;
  shadow?: Boolean;
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
  semiCircle?: Boolean;

  showText?: Boolean;
  textColor?: string;
  textSize?: number;
  fontStyle?: FontStyle;
  fontWeight?: string;
  font?: string;
  showTextBackground?: Boolean;
  textBackgroundColor?: string;
  textBackgroundRadius?: number;
  showValuesAsLabels?: Boolean;

  centerLabelComponent?: Function;
  tiltAngle?: string;
  initialAngle?: number;
  labelsPosition?: 'onBorder' | 'outward' | 'inward' | 'mid';
  showGradient?: boolean;
  gradientCenterColor?: string;
  onPress?: Function;
  focusOnPress?: Boolean;
  toggleFocusOnPress?: Boolean;
  selectedIndex?: number;
  setSelectedIndex?: Function;
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
};

export const PieChart = (props: propTypes) => {
  const radius = props.radius || 120;
  const extraRadiusForFocused = props.extraRadiusForFocused || radius / 10;
  const pi = props.semiCircle ? Math.PI / 2 : Math.PI;
  const [selectedIndex, setSelectedIndex] = useState(-1);

  if (props.data.length <= 1 || !props.focusOnPress || selectedIndex === -1) {
    return (
      <PieChartMain
        {...props}
        key="pie"
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
      />
    );
  } else {
    let startAngle = props.initialAngle || (props.semiCircle ? -pi : 0);
    // let startColor;
    let total = 0;
    props.data.forEach(item => {
      total += item.value;
    });
    if (selectedIndex !== 0) {
      let start = 0;
      for (let i = 0; i < selectedIndex; i++) {
        start += props.data[i].value;
      }
      startAngle += (2 * pi * start) / total;
    }
    return (
      <View>
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
                  props.data[selectedIndex].color || colors[selectedIndex % 9],
              },
              {
                value: total - props.data[selectedIndex].value,
                color: 'transparent',
              },
            ]}
            key="pie"
            radius={radius + extraRadiusForFocused}
            initialAngle={startAngle}
          />
        </View>
        <View style={{position: 'absolute'}}>
          <PieChartMain
            {...props}
            key="pie"
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </View>
      </View>
    );
  }
};
