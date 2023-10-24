import React, {useState} from 'react';
import {View, ColorValue} from 'react-native';
import {PieChartMain} from './main';
import {FontStyle} from 'react-native-svg';
import {pieColors} from '../utils/constants';

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
  const [selectedIndex, setSelectedIndex] = useState(
    props.data.findIndex(item => item.focused === true),
  );
  let startAngle = props.initialAngle || (props.semiCircle ? -pi : 0);
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
    <View
      style={{
        height: (radius + extraRadiusForFocused) * 2,
        width: (radius + extraRadiusForFocused) * 2,
        marginLeft: extraRadiusForFocused * 2,
        marginTop: extraRadiusForFocused * 2,
      }}>
      {props.data.length > 1 &&
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
      <View style={{position: 'absolute'}}>
        <PieChartMain
          {...props}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </View>
    </View>
  );
};
